import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

import { HomePage } from '@/pages/HomePage';
import { PaymentPage } from '@/pages/PaymentPage';
import { Authorization } from '@/pages/Authorization';
import { AuthorizationForm } from '@c/Authorization/AuthorizationForm';
import { AuthorizationValidate } from '@c/Authorization/AuthorizationValidate';
import { Partnership } from '@/pages/Partnership';

const ProtectedRoute = () => {
  const accessToken = Cookies.get('auth');
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

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
      <Route path="partnership" element={<Partnership />} />
      <Route path="payment" element={<PaymentPage />} />
    </Route>

    <Route path="*" element={<HomePage />} />
  </Routes>
);

export default Router;
