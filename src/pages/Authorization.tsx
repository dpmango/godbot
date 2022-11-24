import Cookies from 'js-cookie';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@store';
import { useEffect } from 'react';

export const Authorization: React.FC<{}> = () => {
  const { search } = useLocation();
  const { userData } = useAppSelector((state) => state.userState);

  useEffect(() => {
    if (search === '?Trial=true') {
      Cookies.set('trial', 'active');
    }
  }, [search]);

  return (
    <div className="authorization">
      <Link to={!userData?.tariff ? '/auth' : '/'} className="authorization__logo">
        <img src="./images/logo-auth.svg" alt="" />
      </Link>

      <div className="authorization__inner">
        <Outlet />

        <img className="authorization__bg" src="/images/reg-bg.png" alt="" />
      </div>
    </div>
  );
};
