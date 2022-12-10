import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { useAppDispatch, useAppSelector } from '@core';
import { setStateCoin, setStateTime } from '@store';
import { Select, SpriteIcon, ISelectOption } from '@ui';

interface IForecastFilterProps {
  lastUpdate?: string;
  legendActive: boolean;
  setLegendActive: (x: boolean) => void;
}

export const ForecastFilter: React.FC<IForecastFilterProps> = ({
  legendActive,
  setLegendActive,
  lastUpdate,
}) => {
  const { isProUser, userData, loading } = useAppSelector((state) => state.userState);

  const { currentCoin, currentTime, data, coins } = useAppSelector((state) => state.forecastState);
  const dispatch = useAppDispatch();

  let [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation('forecast');

  // coins
  const coinOptions = useMemo(() => {
    const getCoinNameByTicker = (ticker: string) => {
      switch (ticker) {
        case 'BTC':
          return 'Bitcoin (BTC)';
        case 'XRP':
          return 'Ripple (XRP)';

        default:
          return ticker;
      }
    };

    if (coins && userData?.access_level) {
      return Object.keys(coins).map((key: string) => {
        const coinAccessLevel = coins[key].access_level;
        return {
          value: key,
          label: getCoinNameByTicker(key),
          disabled: userData?.access_level < coinAccessLevel,
          isPro: userData?.access_level < coinAccessLevel,
        } as ISelectOption;
      });
    }

    return [];
    // return [
    //   // {
    //   //   value: 'estimate',
    //   //   label: t('filter.estimate'),
    //   //   isPro: !isProUser,
    //   //   disabled: true,
    //   //   modifier: 'blue',
    //   //   icon: 'plus',
    //   // },
    // ];
  }, [isProUser, coins, userData?.access_level]);

  const handleCoinChange = useCallback(
    (opt: ISelectOption) => {
      const newCoinKey = opt.value as string;
      dispatch(setStateCoin(newCoinKey));

      let newParams = searchParams;
      newParams.set('coin', newCoinKey);
      setSearchParams(newParams);
    },
    [searchParams]
  );

  // time
  const timeOptions = useMemo(() => {
    if (coins && currentCoin) {
      const coinData = coins[currentCoin];

      return coinData.interval_list.map((interval) => ({
        value: interval,
        label: t(`filter.ticks.${interval}`),
      }));
    }

    return [];
  }, [coins, currentCoin, i18n.language]);

  const handleTimeChange = useCallback(
    (opt: ISelectOption) => {
      const newTimeKey = opt.value as string;
      dispatch(setStateTime(newTimeKey));

      let newParams = searchParams;
      newParams.set('time', newTimeKey);
      setSearchParams(newParams);
    },
    [searchParams]
  );

  // initial params parser
  useEffect(() => {
    const coinParam = searchParams.get('coin');
    if (coinParam && coinOptions.some((x) => x.value === coinParam)) {
      dispatch(setStateCoin(coinParam));
    } else if (!coinParam) {
      dispatch(setStateCoin('BTC'));
    }

    const timeParam = searchParams.get('time');
    if (timeParam && timeOptions.some((x) => x.value === timeParam)) {
      dispatch(setStateTime(timeParam));
    } else if (!timeParam) {
      dispatch(setStateTime('1m'));
    }
  }, [coinOptions, timeOptions, searchParams]);

  return (
    <div className="chart__head">
      <div className="chart__head-title">{t('filter.title')}</div>
      <div className="chart__head-filters">
        <Select value={currentCoin} options={coinOptions} onSelect={handleCoinChange} />
        <Select value={currentTime} options={timeOptions} onSelect={handleTimeChange} />
      </div>

      {/* {lastUpdate && (
        <div className="chart__head-time">
          {t('lastUpdate')} {lastUpdate}
        </div>
      )} */}

      <div
        className={cns('chart__settings-opener', legendActive && 'chart__settings-opener--active')}
        onClick={() => setLegendActive(!legendActive)}>
        <SpriteIcon name="settings" width="20" height="20" />
      </div>
    </div>
  );
};
