import { ISelectOption, Select, SpriteIcon, SvgIcon } from '@ui';

interface IForecastFilterProps {
  lastUpdate?: string;
  legendActive: boolean;
  minutesToUpdate: number;
  setLegendActive: (x: boolean) => void;
}

export const ForecastFilter: React.FC<IForecastFilterProps> = ({
  legendActive,
  setLegendActive,
  minutesToUpdate,
}) => {
  const { isProUser, userData } = useAppSelector((state) => state.userState);

  const { currentCoin, currentTime, coins, simulator } = useAppSelector(
    (state) => state.forecastState
  );
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation('forecast');
  const { t: tUnits } = useTranslation('forecast', { keyPrefix: 'willUpdate' });

  // minutes to update
  const minutesToUpdateVerbose = useMemo(() => {
    const minute = Math.ceil(minutesToUpdate);
    let displayUnit = minute;
    let unitKey = 'minute';

    if (minute >= 60) {
      const hour = Math.ceil(minute / 60);
      displayUnit = hour;
      unitKey = 'hour';
    } else if (minute <= 0) {
      return null;
    }

    return `${displayUnit} ${localizeKeys(displayUnit, unitKey, tUnits)}`;
  }, [minutesToUpdate, i18n.language]);

  // coins
  const coinOptions = useMemo(() => {
    if (coins && userData?.access_level) {
      return Object.keys(coins).map((key: string) => {
        const coinAccessLevel = coins[key].access_level;
        return {
          value: key,
          label: `${coins[key].title} (${coins[key].code})`,
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

      const newParams = searchParams;
      newParams.set('coin', newCoinKey);
      setSearchParams(newParams);
    },
    [searchParams]
  );

  // time
  const timeOptions = useMemo(() => {
    if (coins && currentCoin && userData?.access_level) {
      const coinData = coins[currentCoin];

      return coinData.interval_list.map((interval) => ({
        value: interval.label,
        label: t(`filter.ticks.${interval.label}`),
        disabled: userData?.access_level < interval.access_level,
        isPro: userData?.access_level < interval.access_level,
        isTestMode: interval.test_mode,
      }));
    }

    return [];
  }, [coins, currentCoin, userData?.access_level, i18n.language]);

  const handleTimeChange = useCallback(
    (opt: ISelectOption) => {
      const newTimeKey = opt.value as string;
      dispatch(setStateTime(newTimeKey));

      const newParams = searchParams;
      newParams.set('time', newTimeKey);
      setSearchParams(newParams);
    },
    [searchParams]
  );

  // is test graph
  const isTestGraph = useMemo(() => {
    const param = timeOptions.find((x) => x.value === currentTime && !x.disabled);

    return param?.isTestMode;
  }, [currentTime, timeOptions]);

  // сокет
  interface IReccommendation {
    currency: string;
    interval: string;
    status: string;
  }
  interface IRecSocket {
    opened: boolean;
    error: boolean;
  }

  const [recSocket, setRecSocket] = useState<IRecSocket>({
    opened: false,
    error: false,
  });

  const [reccomendations, setReccommendations] = useState<IReccommendation[]>([]);

  const curCoinReccomendations = useMemo(() => {
    const recs = reccomendations.filter((x) => x.currency === currentCoin);

    const getStatus = (interval: string) => {
      return recs.find((x) => x.interval === interval)?.status;
    };

    const getStatusColor = (status?: string) => {
      switch (status) {
        case 'Продавать':
          return 'var(--red)';
        case 'Активно продавать':
          return 'var(--red)';
        case 'Покупать':
          return 'var(--green)';
        case 'Активно покупать':
          return 'var(--green)';
        case 'Нейтрально':
          return 'var(--blue)';
        default:
          return 'currentColor';
      }
    };

    return [
      [
        {
          label: '1 минута',
          time: '1m',
          status: getStatus('1m'),
          color: getStatusColor(getStatus('1m')),
        },
        {
          label: '15 минут',
          time: '15m',
          status: getStatus('15m'),
          color: getStatusColor(getStatus('15m')),
        },
      ],
      [
        {
          label: '1 час',
          time: '1h',
          status: getStatus('1h'),
          color: getStatusColor(getStatus('1h')),
        },
        {
          label: '1 день',
          time: '1d',
          status: getStatus('1d'),
          color: getStatusColor(getStatus('1d')),
        },
      ],
    ];
  }, [reccomendations, currentCoin]);

  useEffect(() => {
    const ws = new WebSocket(`${import.meta.env.VITE_API_SOCKET}get_recommendations/`);
    ws.addEventListener('open', (_e) => {
      setRecSocket((prev) => ({ ...prev, opened: true }));
    });
    ws.addEventListener('message', ({ data }) => {
      const { currency, interval, status } = JSON.parse(data);

      setReccommendations((prev) => {
        if (prev.find((x) => x.currency === currency && x.interval === interval)) {
          return prev.map((x) =>
            x.currency === currency && x.interval === interval ? { ...x, status } : x
          );
        } else {
          return [...prev, ...[{ currency, interval, status }]];
        }
      });
    });
    ws.addEventListener('close', (_e) => {
      setRecSocket((prev) => ({ ...prev, opened: false }));
    });

    ws.addEventListener('error', (_e) => {
      setRecSocket((prev) => ({ ...prev, error: true }));
    });

    return () => {
      ws.close();
    };
  }, []);

  // initial params parser
  useEffect(() => {
    const coinParam = searchParams.get('coin');
    if (coinParam && coinOptions.some((x) => x.value === coinParam && !x.disabled)) {
      dispatch(setStateCoin(coinParam));
    } else if (!coinParam) {
      dispatch(setStateCoin('BTC'));
    }

    const timeParam = searchParams.get('time');

    if (timeParam && timeOptions.some((x) => x.value === timeParam && !x.disabled)) {
      dispatch(setStateTime(timeParam));
    } else {
      const firstAvailOption = timeOptions.find((x) => !x.disabled);
      const min15AvailOption = timeOptions.find((x) => !x.disabled && x.value === '15m');
      if (firstAvailOption) {
        dispatch(setStateTime(firstAvailOption.value));
        if (min15AvailOption) {
          // Ставим в приоритете 15 мин отображение графика
          dispatch(setStateTime(min15AvailOption.value));
        } else {
          dispatch(setStateTime(firstAvailOption.value));
        }
      }
    }
  }, [coinOptions, timeOptions, searchParams.get('coin'), searchParams.get('time')]);

  return (
    <div className="chart__head">
      <div className="chart__head-title">{t('filter.title')}</div>
      <div className="chart__head-filters">
        <Select value={currentCoin} options={coinOptions} onSelect={handleCoinChange} />
        <Select value={currentTime} options={timeOptions} onSelect={handleTimeChange} />
      </div>
      {isTestGraph && (
        <div
          className="chart__testing"
          dangerouslySetInnerHTML={{ __html: t('testMode') as string }}
        />
      )}
      {minutesToUpdate > 0 && (
        <div className="chart__head-time">
          {minutesToUpdateVerbose ? (
            <>
              {t('willUpdate.title')} {minutesToUpdateVerbose}
            </>
          ) : (
            <>{t('willUpdate.soon')}</>
          )}
        </div>
      )}
      {/* {i18n.language === 'ru-RU' && (
        <Link to="?guide" className="btn chart__head-btn" title={t('guide.title') as string}>
          <img src="/img/play.png" alt="play" />
          <span>{t('guide.title')}</span>
        </Link>
      )}

      <div
        className={cns('chart__settings-opener', legendActive && 'chart__settings-opener--active')}
        onClick={() => setLegendActive(!legendActive)}>
        <SpriteIcon name="settings" width="20" height="20" />
      </div> */}

      <div className="rec">
        {curCoinReccomendations.map((col, cidx) => (
          <div className="rec__col" key={cidx}>
            {col.map((rec, ridx) => (
              <div className="rec__item" key={ridx}>
                {rec.label} - <span style={{ color: rec.color }}>{rec.status}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
