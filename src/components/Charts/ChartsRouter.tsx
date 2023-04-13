import { useState, useEffect } from 'react';
import cns from 'classnames';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@core';
import { useProfile } from '@hooks';

import { Forecast, Investing } from '@c/Charts';
import { Signals } from '../Signal';
import { useWindowParams } from '@/core/hooks';

// TODO - переделать табы на роутер
export const ChartsRouter: React.FC<{}> = () => {
  const { isTablet } = useWindowParams();
  const { userData, tariffActive } = useAppSelector((state) => state.userState);
  const { data } = useAppSelector((state) => state.forecastState);

  const [activeTab, setActiveTab] = useState<string>('Forecast');
  const [shouldSetTab, setShouldSetTab] = useState(true);

  const { t } = useTranslation('charts');

  useEffect(() => {
    if (shouldSetTab && userData?.tariff === 'Trial' && data.length) {
      setActiveTab('Signals');
      setShouldSetTab(false);
    }
  }, [userData?.tariff, data]);

  return (
    <>
      {tariffActive && (
        <div className="tabs">
          <div
            className={cns('tabs__link', activeTab === 'Forecast' && 'tabs__link--active')}
            onClick={() => setActiveTab('Forecast')}>
            {t('tabs.trading')}
          </div>
          <div
            className={cns(
              'tabs__link tabs__link--desktop',
              activeTab === 'Signals' && 'tabs__link--active'
            )}
            onClick={() => setActiveTab('Signals')}>
            {t('tabs.signals')}
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
      {(activeTab === 'Signals' || isTablet) && <Signals />}
    </>
  );
};
