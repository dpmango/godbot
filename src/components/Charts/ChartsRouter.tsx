import { useEffect, useRef, useState } from 'react';
import cns from 'classnames';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@core';
import { useProfile } from '@hooks';
import { getInvesting, getChart } from '@store';

import { Forecast, Investing } from '@c/Charts';

// TODO - переделать табы на роутер
export const ChartsRouter: React.FC<{}> = () => {
  const [activeTab, setActiveTab] = useState<string>('Forecast');

  const { userData, tariffActive } = useAppSelector((state) => state.userState);
  const investorData = useAppSelector((state) => state.investorState);
  const dispatch = useAppDispatch();

  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);

  const { allowedFunctions } = useProfile();

  const { t } = useTranslation('charts');

  useEffect(() => {
    if (allowedFunctions.forecast) {
      dispatch(getChart('coin=BTC'));

      timerConfirm.current = setInterval(() => {
        dispatch(getChart('coin=BTC'));
      }, 15 * 60 * 1000);
    }

    if (allowedFunctions.investing) {
      dispatch(getInvesting());
    }

    return () => {
      clearInterval(timerConfirm.current as NodeJS.Timeout);
    };
  }, [userData?.allowed_functions[0]]);

  return (
    <>
      {(userData?.tariff || tariffActive) && (
        <div className="tabs">
          <div
            className={cns('tabs__link', activeTab === 'Forecast' && 'tabs__link--active')}
            onClick={() => setActiveTab('Forecast')}>
            {t('tabs.trading')}
          </div>
          <div
            className={cns(
              'tabs__link',
              activeTab === 'Investing' && 'tabs__link--active'
              // !allowedFunctions.investing && 'tabs__link--disabled'
            )}
            onClick={() => setActiveTab('Investing')}>
            {t('tabs.investing')}
            {/* {!allowedFunctions.investing && <span className="pro-label">PRO</span>} */}
          </div>
        </div>
      )}

      {activeTab === 'Forecast' && <Forecast />}
      {activeTab === 'Investing' && <Investing />}
    </>
  );
};
