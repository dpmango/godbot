import { useState } from 'react';
import cns from 'classnames';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@core';

import { Forecast, Investing } from '@c/Charts';

// TODO - переделать табы на роутер
export const ChartsRouter: React.FC<{}> = () => {
  const [activeTab, setActiveTab] = useState<string>('Forecast');

  const { userData, tariffActive } = useAppSelector((state) => state.userState);

  const { t } = useTranslation('charts');

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
