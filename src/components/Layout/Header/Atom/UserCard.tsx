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

          {userData?.expire_date && (
            <div className="header__user-time">
              {t('user.subscription')}:{' '}
              <strong
                style={{
                  color: tariffActive ? '' : 'red',
                }}>
                {formatDate(userData?.expire_date, 'DD.MM.YYYY')}
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
            {t(userData?.tariff ? 'actions.changeTariff' : 'actions.chooseTariff')}
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
            <a href={'https://twitter.com/godbot_pro'} target="_blank" title="Twitter">
              <img src="/img/social/twitter.svg" alt="Twitter" />
            </a>
            <a href={'https://discord.com/invite/Jnptpsmcmx'} target="_blank" title="Discord">
              <img src="/img/social/discord.svg" alt="Discord" />
            </a>
            <a href={'https://t.me/godbot_pro'} target="_blank" title="Telegram">
              <img src="/img/social/telegram.svg" alt="Telegram" />
            </a>
          </div>
          <div className="header__user-theme">
            <SpriteIcon name="sun" width="20" height="20" />
            <div className="header__user-theme-trigger" onClick={ctx?.handleChangeTheme}></div>
          </div>
        </div>
        <div className="header__user-minis">
          <Link to="?privacy">{t('policies.confidentiality')}</Link> •{' '}
          <Link to="?terms">{t('policies.terms')}</Link> •{' '}
          <Link to="?cookies">{t('policies.cookies')}</Link> •{' '}
          <Link to="?disclaimer">{t('policies.disclaimer')}</Link>
        </div>
      </div>
    </div>
  );
};
