import { useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { SpriteIcon } from '@ui';

export const Menu: React.FC<{}> = () => {
  const { t, i18n } = useTranslation('header');

  const educationEnabledTmp = useMemo(() => {
    return i18n.language === 'ru-RU';
  }, [i18n.language]);

  return (
    <>
      <NavLink className="header__links-link" to="/">
        <SpriteIcon name="home" width="16" height="16" />
        {t('menu.home')}
      </NavLink>
      <NavLink className="header__links-link" to="/partner">
        <SpriteIcon name="link" width="16" height="16" />
        {t('menu.partner')}
      </NavLink>
      <NavLink
        className={cns(
          'header__links-link',
          !educationEnabledTmp && 'header__links-link--disabled'
        )}
        to="/education">
        <SpriteIcon name="hat" width="16" height="16" />
        {t('menu.education')}
      </NavLink>
      <NavLink className="header__links-link header__links-link--disabled" to="/faq">
        <SpriteIcon name="info-square" width="16" height="16" />
        {t('menu.help')}
      </NavLink>
    </>
  );
};
