import { Countdown } from '@ui';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { Trans } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
export const PromoByBit = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { t, i18n } = useTranslation('promo', { keyPrefix: 'bybit' });
  const { userData } = useAppSelector((state) => state.userState);

  const { pathname } = useLocation();

  const closePromo = () => {
    Cookies.set('shownByBit', 'true');
    setVisible(false);
  };

  useEffect(() => {
    const shownCookie = Cookies.get('shownByBit');

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
  }, [userData?.expire_date]);

  if (!visible) return null;

  return (
    <div
      className="wide-notification"
      style={{ backgroundImage: 'url("img/countdown/bg-green.png")' }}>
      <div
        className="wide-notification__image wide-notification__image--gift"
        style={{ backgroundImage: 'url("img/countdown/gift.png")' }}
      />
      <div className="wide-notification__text wide-notification__text--gift">
        <div className="wide-notification__big">
          <Trans t={t} i18nKey={'title'} />
        </div>
        <div>
          <Trans t={t} i18nKey={'subtitle'} />
        </div>
        <Link
          target={'_blank'}
          to={'https://www.bybit.com/en-US/task-center/rewards_hub/?affiliate_id=34718'}
          className="btn btn--countdown btn--countdown-gift">
          {t('action')}
        </Link>
      </div>
      <Countdown toDate={userData?.expire_date} />

      <div className="wide-notification__close" onClick={closePromo}>
        {t('close')}
      </div>
    </div>
  );
};
