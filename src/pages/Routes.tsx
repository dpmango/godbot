import { useEffect, useState, useRef } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { useProfile } from '@hooks';
import { Toast } from '@ui';

import { HomePage } from '@/pages/HomePage';
import { FaqPage } from '@/pages/FaqPage';
import { Authorization } from '@/pages/Authorization';
import { AuthorizationForm } from '@c/Authorization/AuthorizationForm';
import { AuthorizationValidate } from '@c/Authorization/AuthorizationValidate';
// import { Partnership } from '@/pages/_Partnership';
import { NotFound } from '@/pages/NotFound';

declare global {
  interface Window {
    gtag?: (key: string, trackingId: string, config: { page_path: string }) => void;
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
    }
  }, [userTariff]);

  // закрытые роутов
  if (!accessToken) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const Router = () => {
  let location = useLocation();

  useEffect(() => {
    window;
    if (!window.gtag || !process.env.REACT_APP_GTM_ID) return;

    window.gtag('config', process.env.REACT_APP_GTM_ID, { page_path: location.pathname });
  }, [location]);

  return (
    <Routes>
      <Route path="/auth" element={<Authorization />}>
        <Route index element={<AuthorizationForm />} />
        <Route path="validation" element={<AuthorizationValidate />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Route>
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<HomePage />} />
        <Route path="faq" element={<FaqPage />} />
        {/* <Route path="partnership" element={<Partnership />} />*/}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
