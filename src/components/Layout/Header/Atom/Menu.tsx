import { useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { SpriteIcon } from '@ui';
import { isDevelopmentSite } from '@utils';

export const Menu: React.FC<{}> = () => {
  const { t, i18n } = useTranslation('header');

  const educationEnabledTmp = useMemo(() => {
    return i18n.language === 'ru-RU';
  }, [i18n.language]);

  const availableLinks = useMemo(() => {
    let menuList = {
      partner: true,
      education: educationEnabledTmp,
      faq: true,
    };

    if (!isDevelopmentSite) {
      menuList = {
        ...menuList,
        ...{ faq: false },
      };
    }

    return menuList;
  }, [educationEnabledTmp]);

  return (
    <>
      <NavLink className="header__links-link" to="/">
        <SpriteIcon name="home" width="16" height="16" />
        {t('menu.home')}
      </NavLink>
      <NavLink
        className={cns(
          'header__links-link',
          !availableLinks.partner && 'header__links-link--disabled'
        )}
        to="/partner">
        <SpriteIcon name="link" width="16" height="16" />
        {t('menu.partner')}
      </NavLink>
      <NavLink
        className={cns(
          'header__links-link',
          !availableLinks.education && 'header__links-link--disabled'
        )}
        to="/education">
        <SpriteIcon name="hat" width="16" height="16" />
        {t('menu.education')}
      </NavLink>
      <NavLink
        className={cns('header__links-link', !availableLinks.faq && 'header__links-link--disabled')}
        to="/faq">
        <SpriteIcon name="info-square" width="16" height="16" />
        {t('menu.help')}
      </NavLink>
    </>
  );
};
