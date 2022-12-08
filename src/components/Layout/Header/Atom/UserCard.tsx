import { useContext, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { useAppSelector } from '@core';
import { useClickOutside } from '@hooks';
import { formatDate } from '@utils';
import { SpriteIcon } from '@ui';
import { ThemeContext } from '@/App';

import { Menu } from '@c/Layout/Header';

export const UserCard: React.FC<{}> = () => {
  const [userOpened, setUserOpened] = useState(false);
  const { userData, isProUser, tariffActive } = useAppSelector((state) => state.userState);
  const { pathname } = useLocation();

  let ctx = useContext(ThemeContext);

  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setUserOpened(false));

  const { t } = useTranslation('header');

  return (
    <div className="header__user" ref={dropdownRef}>
      <div className="header__user-head">
        <div className="header__user-icon">
          <SpriteIcon name="coins" width="32" height="32" />
        </div>
        <div className="header__user-info">
          {userData?.tariff && <div className="header__user-name">{userData?.tariff}</div>}

          <div className="header__user-email">{userData?.name}</div>

          {userData?.tariff && (
            <div className="header__user-time">
              {t('user.subscription')}:{' '}
              <strong
                style={{
                  color: tariffActive ? '' : 'red',
                }}>
                {formatDate(userData?.subscription_date, 'DD.MM.YYYY')}
              </strong>
            </div>
          )}
        </div>
        <div
          className={cns('header__user-opener', userOpened && 'header__user-opener--active')}
          onClick={() => setUserOpened(!userOpened)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className={cns('header__user-dropdown', userOpened && 'header__user-dropdown--active')}>
        <div className="header__links header__links--mobile">
          <Menu />
        </div>
        <div className="header__user-links">
          <Link to={`${pathname}?tariffs`} className="header__user-link">
            {t('actions.changeTariff')}
          </Link>
          <a className="header__user-link header__user-link--disabled" href="#">
            {t('actions.connectBot')}
          </a>
          <a
            className={cns('header__user-link', !isProUser && 'header__user-link--disabled')}
            href={isProUser ? 'https://t.me/+fQvg8JT7oUVhZDZi' : ''}
            target="_blank">
            {t('actions.payedChat')} {!isProUser && <span className="pro-label">PRO</span>}
          </a>
        </div>
        <div className="header__user-soc-wrap">
          <div className="header__user-soc">
            <Link to={'https://twitter.com'} target="_blank" title="Twitter">
              <img src="/img/social/twitter.svg" alt="Twitter" />
            </Link>
            <Link to={'https://discord.com'} target="_blank" title="Discord">
              <img src="/img/social/discord.svg" alt="Discord" />
            </Link>
            <Link to={'https://tg.me'} target="_blank" title="Telegram">
              <img src="/img/social/telegram.svg" alt="Telegram" />
            </Link>
          </div>
          <div className="header__user-theme">
            <SpriteIcon name="sun" width="20" height="20" />
            <div className="header__user-theme-trigger" onClick={ctx?.handleChangeTheme}></div>
          </div>
        </div>
        <div className="header__user-minis">
          <a href="#">{t('policies.confidentiality')}</a> • <a href="#">{t('policies.terms')}</a> •
          <a href="#">{t('policies.cookies')}</a>
        </div>
      </div>
    </div>
  );
};
