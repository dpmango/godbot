import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { UserCard, Languages, Menu } from '@c/Layout/Header/Atom';
import { isDevelopmentSite } from '@utils';

export const Header: React.FC<{}> = () => {
  const [menu, setMenu] = useState(false);

  const { t } = useTranslation('header');

  return (
    <header className="header">
      <div className="container container--header">
        <Link to="/" className="header__logo">
          <svg width="25" height="32">
            <use xlinkHref="/img/logo-sprite.svg#pic"></use>
          </svg>
          <svg width="110" height="25">
            <use xlinkHref="/img/logo-sprite.svg#text"></use>
          </svg>
          {isDevelopmentSite && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '80%',
                background: 'tomato',
                color: 'white',
                fontSize: 11,
                borderRadius: 4,
                opacity: 0.7,
                padding: '0.2em 0.4em',
              }}>
              DEV
            </div>
          )}
        </Link>
        <div
          className={cns('header__menu-opener', menu && 'header__menu-opener--active')}
          onClick={() => setMenu(!menu)}>
          <div></div>
        </div>
        <div className={cns('header__menu', menu && 'header__menu--active')}>
          <div className="header__links header__links--desktop">
            <Menu />
          </div>
          <Languages />
          <UserCard />
        </div>
      </div>
    </header>
  );
};
