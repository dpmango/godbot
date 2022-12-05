import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { useAppDispatch, useAppSelector } from '@core';
import { setStateCoin } from '@store';
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
  const { isProUser, loading } = useAppSelector((state) => state.userState);
  const [currentTime, setTimeOption] = useState<string>('15min');

  const { currentCoin } = useAppSelector((state) => state.forecastState);
  const dispatch = useAppDispatch();

  let [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation('forecast');

  // coins
  const coinOptions = useMemo(() => {
    return [
      { value: 'btc', label: 'Bitcoin (BTC)' },
      { value: 'xrp', label: 'Ripple (XRP)', isPro: !isProUser },
      // { value: 'matic', label: 'Polygon (MATIC)', isPro: !isProUser, disabled: true },
      // {
      //   value: 'estimate',
      //   label: t('filter.estimate'),
      //   isPro: !isProUser,
      //   disabled: true,
      //   modifier: 'blue',
      //   icon: 'plus',
      // },
    ];
  }, [isProUser]);

  const handleCoinChange = useCallback(
    (opt: ISelectOption) => {
      const newTimeKey = opt.value as string;
      dispatch(setStateCoin(newTimeKey));

      let newParams = searchParams;
      newParams.set('coin', newTimeKey);
      setSearchParams(newParams);
    },
    [searchParams]
  );

  // time
  const timeOptions = useMemo(() => {
    return [
      { value: '15min', label: t('filter.ticks.15min') },
      // { value: '1h', label: t('filter.ticks.1h'), isPro: !isProUser, disabled: true },
      // { value: '1d', label: t('filter.ticks.1d'), isPro: !isProUser, disabled: true },
    ];
  }, [isProUser]);

  const handleTimeChange = useCallback(
    (opt: ISelectOption) => {
      const newTimeKey = opt.value as string;
      setTimeOption(newTimeKey);

      let newParams = searchParams;
      newParams.set('time', newTimeKey);
      setSearchParams(newParams);
    },
    [searchParams]
  );

  // initial params parser
  useEffect(() => {
    const coinParam = searchParams.get('coin');
    if (coinParam && timeOptions.some((x) => x.value === coinParam)) {
      dispatch(setStateCoin(coinParam));
    }
  }, []);

  return (
    <div className="chart__head">
      <div className="chart__head-title">{t('filter.title')}</div>
      <div className="chart__head-filters">
        <Select value={currentCoin} options={coinOptions} onSelect={handleCoinChange} />
        <Select value={currentTime} options={timeOptions} onSelect={handleTimeChange} />
      </div>

      {lastUpdate && (
        <div className="chart__head-time">
          {t('lastUpdate')} {lastUpdate}
        </div>
      )}

      <div
        className={cns('chart__settings-opener', legendActive && 'chart__settings-opener--active')}
        onClick={() => setLegendActive(!legendActive)}>
        <SpriteIcon name="settings" width="20" height="20" />
      </div>
    </div>
  );
};
