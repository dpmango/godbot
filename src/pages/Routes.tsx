import { useEffect, useState, useRef } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { useProfile } from '@hooks';

import { HomePage } from '@/pages/HomePage';
import { Authorization } from '@/pages/Authorization';
import { AuthorizationForm } from '@c/Authorization/AuthorizationForm';
import { AuthorizationValidate } from '@c/Authorization/AuthorizationValidate';
// import { Partnership } from '@/pages/_Partnership';
import { NotFound } from '@/pages/NotFound';

const ProtectedRoute = () => {
  const { fetchProfileWithLogout } = useProfile();
  const [intervalRun, setIntervalRun] = useState<number>(0);
  const [userTariff, setUserTariff] = useState<string>('');

  const accessToken = Cookies.get('auth');
  const location = useLocation();

  const { t } = useTranslation('tariff');

  // закрытые роутов
  if (!accessToken) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // проверка оплаченных тарифов и логаут сессии
  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    timerConfirm.current = setInterval(async () => {
      setIntervalRun((prev) => prev + 1);
      const user = await fetchProfileWithLogout();
      setUserTariff(user?.tariff || '');
    }, 10 * 1000);

    return () => {
      clearInterval(timerConfirm.current as NodeJS.Timeout);
    };
  }, []);

  useEffect(() => {
    // вызывается только если тариф поменялся при последующих запросах
    if (userTariff && intervalRun > 1) {
      toast.success(t('activated.success', { tariff: userTariff }), {
        autoClose: false,
      });
    }
  }, [userTariff]);

  return <Outlet />;
};

const Router = () => (
  <Routes>
    <Route path="/auth" element={<Authorization />}>
      <Route index element={<AuthorizationForm />} />
      <Route path="validation" element={<AuthorizationValidate />} />
    </Route>

    <Route path="/" element={<ProtectedRoute />}>
      <Route index element={<HomePage />} />
      {/* <Route path="partnership" element={<Partnership />} />*/}
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Router;
