import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@core';
import { getCurrentUser } from '@store';

// import '@c/Authorization/login.sass';

export const Authorization: React.FC<{}> = () => {
  const { search } = useLocation();
  const { userData } = useAppSelector((state) => state.userState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (search === '?Trial=true') {
  //     Cookies.set('trial', 'active');
  //   }
  // }, [search]);

  useEffect(() => {
    const checkAuth = async () => {
      const { payload } = await dispatch(getCurrentUser());

      if (payload?.name) {
        navigate('/', { replace: true });
        Cookies.set('auth', Date.now().toString(), { expires: 7 });
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="login">
      <div className="container container--login">
        <div className="login__logo">
          <img src="/img/logo.svg" alt="" />
        </div>
        <Outlet />

        <div className="login__image">
          <img src="/img/hand.png" alt="" />
        </div>
      </div>
    </div>
  );
};
