import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { SpriteIcon } from '@ui';

export const Menu: React.FC<{}> = () => {
  const { t } = useTranslation('header');

  return (
    <>
      <Link className="header__links-link header__links-link--active" to="/">
        <SpriteIcon name="home" width="16" height="16" />
        {t('menu.home')}
      </Link>
      <Link className="header__links-link header__links-link--disabled" to="/">
        <SpriteIcon name="link" width="16" height="16" />
        {t('menu.partner')}
      </Link>
      <Link className="header__links-link header__links-link--disabled" to="/">
        <SpriteIcon name="hat" width="16" height="16" />
        {t('menu.education')}
      </Link>
      <Link className="header__links-link header__links-link--disabled" to="/">
        <SpriteIcon name="info-square" width="16" height="16" />
        {t('menu.help')}
      </Link>
    </>
  );
};
