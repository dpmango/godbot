import { Logo } from '@c/Layout/Header';
import { utcToZonedTime } from 'date-fns-tz';
import dayjs from 'dayjs';
import { createChart, IChartApi, ISeriesApi, LogicalRange, UTCTimestamp } from 'lightweight-charts';

import { IGraphTickDto } from '@/core/interface/Forecast';

export interface IChartLines {
  id: string;
  name: string;
  showChanges: boolean;
  instance: ISeriesApi<'Line'> | ISeriesApi<'Candlestick'>;
}

export const ForecastSimulator = () => {
  // внутренние стейты
  const [loading, setLoading] = useState<boolean>(true);

  const chart = useRef<IChartApi | null>(null);
  const [dataSeries, setSeries] = useState<any>([]);
  const [chartLines, setChartLines] = useState<IChartLines[]>([]);
  const [scrollRange, setScrollRange] = useState<LogicalRange>();
  const debouncedRange = useDebounce<LogicalRange | undefined>(scrollRange, 500);

  // стор
  const {
    data,
    currentCoin,
    currentTime,
    loading: storeLoading,
  } = useAppSelector((state) => state.forecastState);

  const dispatch = useAppDispatch();

  // рефы
  const containerRef: any = useRef(null);
  const tooltipRef: any = useRef(null);

  const { allowedFunctions } = useProfile();
  const { t } = useTranslation('forecast');
  const paginatePer = 200;

  interface IStakeElement {
    type: string;
    enter: number;
    exit?: number;
    quantity: number;
  }

  // Логика эмулятора
  const [currentPrice, setCurrentPrice] = useState<number>(100);
  const [simulatorStake, setSimulatorStake] = useState<IStakeElement[]>([]);
  const [simulatorPaused, setSimulatorPaused] = useState<boolean>(false);
  const [simulatorBet, setsimulatorBet] = useState<number>(1000);

  const addShort = useCallback(() => {
    setSimulatorStake([
      ...simulatorStake,
      ...[{ type: 'short', enter: currentPrice, quantity: simulatorBet }],
    ]);
    setSimulatorPaused(false);
  }, [simulatorStake]);

  const addLong = () => {
    setSimulatorStake([
      ...simulatorStake,
      ...[{ type: 'long', enter: currentPrice, quantity: simulatorBet }],
    ]);
    setSimulatorPaused(false);
  };

  const positionPL = useMemo(() => {
    return simulatorStake.reduce((acc, x) => {
      acc = acc + (x.enter - currentPrice) * x.quantity;
      return acc;
    }, 0);
  }, [simulatorStake, currentPrice]);

  // Хук с утилитами (data-blind)
  const {
    theme,
    graphColors,

    getChartDefaults,
    createSeriesData,
    createChartLines,
    createUpdateMarkers,
    setTooltipOnCrosshairMove,
  } = useChart({
    chart,
    containerRef,
    tooltipRef,
  });

  // основная функция отрисовки TW
  const initOrUpdateChart = (coinData: IGraphTickDto[]) => {
    // Создание данных по ответу forecast (указываются id для отрисовки)
    const currentSeries = createSeriesData(coinData, ['RealLine']);
    setSeries([...currentSeries]);

    // точки обновленный прогноза
    const updateDates = coinData.filter((x) => x.is_forecast_start).map((x) => x.timestamp);
    const updateMarkers = createUpdateMarkers(updateDates);

    if (!chart.current) {
      // Создание инстанса графика

      const chartInstance = createChart(
        containerRef.current,
        getChartDefaults(containerRef.current)
      );

      // отрисовка Series Types
      const newChartLines = createChartLines({
        chart: chartInstance,
        updateMarkers,
        currentSeries,
      });
      setChartLines([...newChartLines]);

      // навигация по графику
      const lastUpdateMarker = updateDates.length ? updateDates[updateDates.length - 1] : 0;
      const lastTick = coinData[coinData.length - 1].timestamp;
      const lastTime = dayjs(utcToZonedTime(lastTick * 1000, 'Etc/UTC'));

      let from = lastTime.subtract(3, 'hour');
      if (lastUpdateMarker) {
        from = dayjs(utcToZonedTime(lastUpdateMarker * 1000, 'Etc/UTC'));
      }

      chartInstance.timeScale().setVisibleRange({
        from: timeToTz((from.unix() * 1000) as UTCTimestamp),
        to: timeToTz((lastTime.unix() * 1000) as UTCTimestamp),
      });

      chartInstance.timeScale().subscribeVisibleLogicalRangeChange((range) => {
        if (!range) return;

        setScrollRange(range);
      });

      // тултипы
      chartInstance.subscribeCrosshairMove((param) => {
        setTooltipOnCrosshairMove({
          param,
          newChartLines,
          currentSeries,
          setCrosshair: (v) => null,
        });
      });

      chart.current = chartInstance;
    } else {
      // обновление данных
      const PERF_TIME = performance.now();
      chartLines.forEach((lineSeries, idx) => {
        lineSeries.instance.setData([...currentSeries[idx].data]);
      });

      if (updateMarkers.length) {
        chartLines.forEach((lineSeries, idx) => {
          if (lineSeries.showChanges) {
            lineSeries.instance.setMarkers(updateMarkers);
          }
        });
      }
    }

    setLoading(false);

    return () => {
      chart.current?.remove();
    };
  };

  // инициализация запросов
  useEffect(() => {
    const requestChart = async () => {
      if (currentCoin && currentTime) {
        dispatch(getChart({ page: 20, per: paginatePer }));
      }
    };

    if (allowedFunctions.forecast) {
      requestChart();
    }
  }, [allowedFunctions.forecast, currentCoin, currentTime]);

  // обновление данных
  useEffect(() => {
    if (data) {
      if (data.length) initOrUpdateChart(data);
    } else {
      chart.current?.remove();
      chart.current = null;
    }
  }, [data]);

  return (
    <div className={cns('chart')}>
      <div
        ref={containerRef}
        className="chart-container _simulator"
        style={{
          opacity: loading ? '0' : '1',
        }}>
        <div className="chart-info" ref={tooltipRef} />
        <span></span>
      </div>
      <div className="chart-simulator sim">
        <div className="sim__wrapper">
          <div className="sim__bets">
            {positionPL !== 0 && (
              <div
                className={cns(
                  'sim__position',
                  positionPL < 0 && '_loss',
                  positionPL > 0 && '_profit'
                )}>
                {formatPrice(positionPL, 0)} $
              </div>
            )}

            <div className="btn sim__short" onClick={addShort}>
              SHORT
            </div>
            <div className="sim__bet" contentEditable={true}>
              {simulatorBet}
            </div>
            <div className="btn sim__long" onClick={addLong}>
              LONG
            </div>
          </div>
        </div>
      </div>
      <div className="chart-watermark">
        {[1, 2, 3, 4].map((num, index) => (
          <div key={index} className="chart-watermark__col">
            {[...Array(num)].map((_, i) => (
              <Logo key={`${index}_${i}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
