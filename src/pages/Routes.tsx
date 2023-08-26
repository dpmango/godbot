import { AuthorizationForm } from '@c/Authorization/AuthorizationForm';
import { AuthorizationValidate } from '@c/Authorization/AuthorizationValidate';
import { Toast } from '@ui';
import Cookies from 'js-cookie';
import React, { Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

function lazyImport<
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}

const { Authorization } = lazyImport(() => import('./Authorization.page'), 'Authorization');
const { Education } = lazyImport(() => import('./Education.page'), 'Education');
const { FaqPage } = lazyImport(() => import('./Faq.page'), 'FaqPage');
const { HomePage } = lazyImport(() => import('./Home.page'), 'HomePage');
const { NotFound } = lazyImport(() => import('./NotFound.page'), 'NotFound');
const { Partner } = lazyImport(() => import('./Partner.page'), 'Partner');
const { UiPage } = lazyImport(() => import('./Ui.page'), 'UiPage');

declare global {
  interface Window {
    gtag?: (key: string, trackingId: string, config?: { page_path: string }) => void;
    ym?: (key: number, action: string, params: string) => void;
    fbq?: (key: string, event: string, options?: any) => void;
  }
  interface _teletypeWidget {
    init: any;
  }
}

const ProtectedRoute = () => {
  const { fetchProfileWithLogout } = useProfile();
  const [intervalRun, setIntervalRun] = useState<number>(0);
  const [userTariff, setUserTariff] = useState<string>('');

  const accessToken = Cookies.get('auth');
  const location = useLocation();

  const { t } = useTranslation('tariff');

  // проверка оплаченных тарифов и логаут сессии
  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    timerConfirm.current = setInterval(async () => {
      if (!accessToken) return;
      setIntervalRun((prev) => prev + 1);
      const user = await fetchProfileWithLogout();
      if (user?.tariff !== undefined) {
        setUserTariff(user?.tariff || '');
      }
    }, 10 * 1000);

    return () => {
      clearInterval(timerConfirm.current as NodeJS.Timeout);
    };
  }, []);

  useEffect(() => {
    // вызывается только если тариф поменялся при последующих запросах
    if (accessToken && userTariff && intervalRun > 1) {
      Toast('success', t('activated.success', { tariff: userTariff }), { autoClose: false });
      if (userTariff === 'PRO Trader') {
        reachGoal('complete_order_pro', 'ЛК - Оплата Trader Pro');
      } else if (userTariff === 'Trader') {
        reachGoal('lk_complete_order', 'ЛК - Оплата Trader');
      }
    }
  }, [userTariff]);

  // закрытые роутов
  if (!accessToken) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const Router = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window;
    if (!window.gtag || !import.meta.env.VITE_GTM_ID) return;

    window.gtag('config', import.meta.env.VITE_GTM_ID, { page_path: location.pathname });
  }, [location]);

  return (
    <Suspense>
      <Routes>
        <Route path="/auth" element={<Authorization />}>
          <Route index element={<AuthorizationForm />} />
          <Route path="validation" element={<AuthorizationValidate />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="partner" element={<Partner />} />
          {i18n.language === 'ru-RU' && <Route path="education" element={<Education />} />}
          <Route path="faq" element={<FaqPage />} />
          <Route path="ui" element={<UiPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
