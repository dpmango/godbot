import { Menu, Socials } from '@c/Layout/Header';
import { SpriteIcon, SvgIcon } from '@ui';
import AES from 'crypto-js/aes';

import { ThemeContext } from '@/App';

export const UserCard = () => {
  const [userOpened, setUserOpened] = useState(false);
  const { userData, isProUser, tariffActive } = useAppSelector((state) => state.userState);
  const { pathname } = useLocation();

  const ctx = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const { simulator } = useAppSelector((store) => store.forecastState);

  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setUserOpened(false));

  const { t } = useTranslation('header');

  const botLinkWithKey = useMemo(() => {
    const base = import.meta.env.VITE_BOT_HREF || 'https://t.me/godbotpro_bot?start=';

    const ID = userData?.id || '';
    const SECRET = import.meta.env.VITE_BOT_SECRET || '';

    const encrypted = AES.encrypt(ID.toString(), SECRET).toString();
    const startKey = encrypted
      .replace('=', '_EQ')
      .replace('/', '_SL')
      .replace('+', '_PS')
      .replace('-', '_MN');

    return `${base}${startKey}`;
  }, [userData?.id]);

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
            <SpriteIcon name="refresh" width="16" height="16" />
            {t(tariffActive ? 'actions.changeTariff' : 'actions.chooseTariff')}
          </Link>
          <a
            className={cns('header__user-link', !isProUser && 'header__user-link--disabled')}
            href={isProUser ? 'https://t.me/+aeBQzpHS3G8xZTVi' : ''}
            target="_blank"
            rel="noreferrer">
            <SpriteIcon name="telegram" width="16" height="16" />
            {t('actions.payedChat')} {!isProUser && <span className="pro-label">PRO</span>}
          </a>
          <a
            className={cns('header__user-link')}
            href={botLinkWithKey}
            target="_blank"
            rel="noreferrer">
            <SpriteIcon name="bot" width="16" height="16" />
            {t('actions.connectBot')}
          </a>
          <Link to={'/?tutorial'} className={cns('header__user-link')}>
            <SpriteIcon name="info-circle" width="16" height="16" />
            {t('actions.tutorial')}
          </Link>
          <Link to={'/?promocode'} className={cns('header__user-link')}>
            <SpriteIcon name="coupon" width="16" height="16" />
            {t('actions.promo')}
          </Link>
          {/* <a
            className="header__user-link"
            onClick={() => dispatch(setSimulator({ enabled: !simulator.enabled }))}>
            <SvgIcon name="replay" />
            {t('actions.simulator')}
          </a> */}
        </div>

        <Socials />

        <div className="header__user-theme-trigger" onClick={ctx?.handleChangeTheme} />
        <div className="header__user-minis">
          <Link to="?privacy">{t('policies.confidentiality')}</Link>
          <Link to="?terms">{t('policies.terms')}</Link>
          <Link to="?cookies">{t('policies.cookies')}</Link>
          <Link to="?disclaimer">{t('policies.disclaimer')}</Link>
        </div>
      </div>
    </div>
  );
};
