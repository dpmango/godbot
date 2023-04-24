import { SpriteIcon } from '@ui';
import { Link, NavLink } from 'react-router-dom';

export const Menu = () => {
  const { t, i18n } = useTranslation('header');

  const educationEnabledTmp = useMemo(() => {
    return i18n.language === 'ru-RU';
  }, [i18n.language]);

  const availableLinks = useMemo(() => {
    const menuList = {
      partner: true,
      education: educationEnabledTmp,
      faq: true,
    };

    return menuList;
  }, [educationEnabledTmp]);

  return (
    <>
      <NavLink className="header__links-link" to="/">
        <SpriteIcon name="home" width="16" height="16" />
        {t('menu.home')}
      </NavLink>
      <NavLink className={cns('header__links-link')} to="/partner">
        <SpriteIcon name="link" width="16" height="16" />
        {t('menu.partner')}
      </NavLink>
      {availableLinks.education && (
        <NavLink className={cns('header__links-link')} to="/education">
          <SpriteIcon name="hat" width="16" height="16" />
          {t('menu.education')}
        </NavLink>
      )}
      <NavLink className={cns('header__links-link')} to="/faq">
        <SpriteIcon name="info-square" width="16" height="16" />
        {t('menu.help')}
      </NavLink>
    </>
  );
};
