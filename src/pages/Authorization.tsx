import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@store';
import { Logo } from '@c/Layout/Atom';

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
        <Logo />
      </Link>

      <div className="authorization__inner">
        <div className="authorization__spacer">
          <Outlet />
        </div>

        <img className="authorization__bg" src="/images/reg-bg.png" alt="" />
      </div>
    </div>
  );
};
