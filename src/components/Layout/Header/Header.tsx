import { Languages, Menu, UserCard } from '@c/Layout/Header/Atom';
import { DevBadge } from '@ui';

export const Header = () => {
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
          <DevBadge />
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
