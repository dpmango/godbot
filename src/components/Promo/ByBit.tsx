import { useMemo, useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import cns from 'classnames';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

import { useAppSelector } from '@core';
import { Countdown } from '@ui';
import { timeDiff } from '@utils';

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

    const expDate = dayjs(userData?.expire_date).unix();
    const timeLeft = timeDiff(expDate * 1000);
    const oneDayInSeconds = 24 * 60 * 60;

    const isDiscountActive = timeLeft;
    // todo переделать subscription date <= oneDayInSseconds

    if (isDiscountActive && !shownCookie) {
      setVisible(true);
    }

    // if (shownCookie) {
    //   setVisible(false);
    // }
  }, [userData?.expire_date]);

  if (!visible) return null;

  return (
    <div className="countdown" style={{ backgroundImage: 'url("img/countdown/bg-green.png")' }}>
      <div
        className="countdown__image countdown__image--gift"
        style={{ backgroundImage: 'url("img/countdown/gift.png")' }}
      />
      <div className="countdown__text countdown__text--gift">
        <div className="countdown__big">
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

      <div className="countdown__close" onClick={closePromo}>
        {t('close')}
      </div>
    </div>
  );
};
