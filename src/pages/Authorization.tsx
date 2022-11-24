import Cookies from 'js-cookie';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@store';

export const Authorization: React.FC<{}> = () => {
  const { search } = useLocation();
  const { userData } = useAppSelector((state) => state.userState);

  if (search === '?Trial=true') {
    console.log('set trial cookie');
    Cookies.set('trial', 'active');
  }

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
