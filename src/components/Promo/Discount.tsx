import { Countdown } from '@ui';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { Trans } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export const PromoDiscount = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { t, i18n } = useTranslation('promo', { keyPrefix: 'discount' });
  const { userData } = useAppSelector((state) => state.userState);

  const { pathname } = useLocation();

  const closePromo = () => {
    Cookies.set('shownDiscount', 'true');
    setVisible(false);
  };

  useEffect(() => {
    const shownCookie = Cookies.get('shownDiscount');

    if (userData?.tariff === 'Trial') {
      const expDate = dayjs(userData?.expire_date).unix();
      const timeLeft = timeDiff(expDate * 1000);
      const oneDayInSeconds = 24 * 60 * 60;

      const isDiscountActive = timeLeft;
      // todo переделать subscription date <= oneDayInSseconds

      if (isDiscountActive && !shownCookie) {
        setVisible(true);
      }
    }

    // if (shownCookie) {
    //   setVisible(false);
    // }
  }, [userData?.tariff]);

  if (!visible) return null;

  return (
    <div className="countdown" style={{ backgroundImage: 'url("img/countdown/bg-green.png")' }}>
      <div
        className="countdown__image countdown__image--gift"
        style={{ backgroundImage: 'url("img/countdown/gift.png")' }}
      />
      <div className="countdown__text countdown__text--gift">
        <div className="countdown__big">{t('subtitle')}</div>
        <div>
          <Trans t={t} i18nKey={'title'} />
        </div>
        <Link to={`${pathname}?tariffs`} className="btn btn--countdown btn--countdown-gift">
          {t('action')}
        </Link>
      </div>
      <Countdown toDate={userData?.expire_date} />

      <div className="countdown__close" onClick={closePromo}>
        {t('close')}
      </div>
    </div>
  );
};
