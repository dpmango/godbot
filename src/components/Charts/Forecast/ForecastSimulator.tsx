import { Logo } from '@c/Layout/Header';
import { utcToZonedTime } from 'date-fns-tz';
import dayjs from 'dayjs';
import { createChart, IChartApi, ISeriesApi, LogicalRange, UTCTimestamp } from 'lightweight-charts';

import { SvgIcon } from '@/components/UI';
import { IGraphTickDto, ISeriesData } from '@/core/interface/Forecast';

export interface IChartLines {
  id: string;
  name: string;
  showChanges: boolean;
  instance: ISeriesApi<'Line'> | ISeriesApi<'Candlestick'>;
}
interface IPositionElement {
  dir: 'long' | 'short';
  quantity: number;
  avarage: number;
  savedProfit: number;
}

export const ForecastSimulator = () => {
  // внутренние стейты
  const [loading, setLoading] = useState<boolean>(true);

  const chart = useRef<IChartApi | null>(null);
  const [dataSeries, setSeries] = useState<ISeriesData[]>([]);
  const [chartLines, setChartLines] = useState<IChartLines[]>([]);

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

  // Логика эмулятора
  const [simulatorPaused, setSimulatorPaused] = useState<boolean>(false);
  const [simulatorSpeed, setSimulatorSpeed] = useState<number>(10);
  const [simulatorCurrentPrice, setSimulatorCurrentPrice] = useState<number>(0);
  const [simulatorCurrentTime, setSimulatorCurrentTime] = useState<UTCTimestamp | null>(null);
  const [simulatorPosition, setSimulatorPosition] = useState<IPositionElement>({
    dir: 'short',
    quantity: 0,
    avarage: 0,
    savedProfit: 0,
  });
  const [simulatorBet, setsimulatorBet] = useState<number>(5);

  const changePosition = useCallback(
    (type: 'long' | 'short') => {
      setSimulatorPosition((position) => {
        const curentPositionTotal = position.quantity * position.avarage;
        const incomingPositionTotal = simulatorBet * simulatorCurrentPrice;

        const newAverage =
          (curentPositionTotal + incomingPositionTotal) / (position.quantity + simulatorBet);
        let newQuantity = position.quantity;
        let newDir = position.dir;
        const newSavedProfit = position.savedProfit;

        // если направление позиции совпадает, управление только количеством

        const addPosition = () => {
          newQuantity = position.quantity + simulatorBet;
        };

        const removePosition = () => {
          const incomingQuantity = position.quantity - simulatorBet;
          if (incomingQuantity >= 0) {
            newQuantity = incomingQuantity;
          } else {
            newDir = type;
            newQuantity = incomingQuantity * -1;
          }
        };

        if (position.dir === 'short') {
          if (type === 'short') {
            addPosition();
          } else if (type === 'long') {
            removePosition();
          }
        } else if (position.dir === 'long') {
          if (type === 'long') {
            addPosition();
          } else if (type === 'short') {
            removePosition();
          }
        }

        return {
          dir: newDir,
          avarage: newAverage,
          quantity: newQuantity,
          savedProfit: newSavedProfit,
        };
      });

      // setSimulatorPaused(false);
    },
    [simulatorPosition, simulatorCurrentPrice, simulatorBet]
  );

  const handleSimulatorSpeedClick = useCallback(() => {
    let newSpeed = 10;

    switch (simulatorSpeed) {
      case 10:
        newSpeed = 20;
        break;
      case 20:
        newSpeed = 5;
        break;
      case 5:
        newSpeed = 10;
    }

    setSimulatorSpeed(newSpeed);
  }, [simulatorSpeed]);

  const positionWeight = useMemo(() => {
    const { avarage, quantity } = simulatorPosition;

    return avarage * quantity;
  }, [simulatorPosition]);

  const positionPL = useMemo(() => {
    const { dir, avarage, quantity, savedProfit } = simulatorPosition;

    let bank = 0;

    if (dir === 'long') {
      bank = (simulatorCurrentPrice - avarage) * quantity;
    } else if (dir === 'short') {
      bank = (avarage - simulatorCurrentPrice) * quantity;
    }

    return bank + savedProfit;
  }, [simulatorPosition, simulatorCurrentPrice]);

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
        getChartDefaults(containerRef.current, {
          timeScale: {
            fixLeftEdge: true,
            fixRightEdge: true,
            borderVisible: false,
            timeVisible: true,
            secondsVisible: false,
          },
        })
      );

      // отрисовка Series Types
      const newChartLines = createChartLines({
        chart: chartInstance,
        updateMarkers,
        currentSeries,
      });
      setChartLines([...newChartLines]);

      // навигация по графику
      // const lastUpdateMarker = updateDates.length ? updateDates[updateDates.length - 1] : 0;
      const lastTick = coinData[coinData.length - 1].timestamp;
      const lastTime = dayjs(utcToZonedTime(lastTick * 1000, 'Etc/UTC'));
      const firstTick = coinData[0].timestamp;
      const firstTime = dayjs(utcToZonedTime(firstTick * 1000, 'Etc/UTC'));

      chartInstance.timeScale().setVisibleRange({
        from: timeToTz((firstTime.unix() * 1000) as UTCTimestamp),
        to: timeToTz((lastTime.unix() * 1000) as UTCTimestamp),
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

      newChartLines.forEach((lineSeries, idx) => {
        const initialSimulatorData = currentSeries[idx].data.slice(0, 20);

        lineSeries.instance.setData([...initialSimulatorData]);

        if (lineSeries.id === 'RealLine') {
          const initialTick = initialSimulatorData[initialSimulatorData.length - 1];

          if (initialTick.value) {
            setSimulatorCurrentTime(initialTick.time);
            setSimulatorCurrentPrice(initialTick.value);
          }
        }
      });
    }

    setLoading(false);

    return () => {
      chart.current?.remove();
    };
  };

  const handleSimualtorUpdate = useCallback(() => {
    chartLines.forEach((lineSeries, idx) => {
      if (lineSeries.id === 'RealLine') {
        const currentTickIndex = dataSeries[idx].data.findIndex(
          (x) => x.time === simulatorCurrentTime
        );

        const nextTick = dataSeries[idx].data[currentTickIndex + 1];
        if (nextTick?.value) {
          lineSeries.instance.update(nextTick);

          setSimulatorCurrentTime(nextTick.time);
          setSimulatorCurrentPrice(nextTick.value);
        } else {
          alert('end');
        }
      }
    });

    // if (currentIndex === 5000) {
    //   reset();
    //   return;
    // }
  }, [chartLines, dataSeries, simulatorCurrentPrice, simulatorCurrentTime]);

  const timerSimulator: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    if (timerSimulator.current) {
      clearTimeout(timerSimulator.current);
    }

    if (simulatorCurrentTime && simulatorCurrentPrice && !simulatorPaused) {
      timerSimulator.current = setTimeout(() => {
        handleSimualtorUpdate();
      }, 10 * (1000 / simulatorSpeed));
    }
  }, [simulatorCurrentPrice, simulatorCurrentTime, simulatorPaused]);

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
          <div className="sim__timeline">
            <div
              className={cns('sim__timeline-action sim__play', simulatorPaused && '_active')}
              onClick={() => setSimulatorPaused(!simulatorPaused)}>
              <SvgIcon name="play" />
              {simulatorPaused && 'paused'}
            </div>
            <div className="sim__timeline-action sim__speed" onClick={handleSimulatorSpeedClick}>
              {simulatorSpeed}x
            </div>
          </div>
          <div className="sim__bets">
            {simulatorPosition.quantity !== 0 && (
              <div
                className={cns(
                  'sim__position',
                  positionPL < 0 && '_loss',
                  positionPL > 0 && '_profit'
                )}>
                {positionPL > 0 ? '+' : ''}
                {formatPrice(positionPL, 0)} $ ({simulatorPosition.dir.toUpperCase()} x
                {simulatorPosition.quantity} ({formatPrice(positionWeight)}$){' '}
                {formatPrice(simulatorPosition.avarage, 0)} $)
              </div>
            )}

            <div className="btn sim__short" onClick={() => changePosition('short')}>
              SHORT
            </div>
            <div className="sim__bet">
              <input
                type="number"
                value={simulatorBet}
                max="999"
                min="1"
                onChange={(e) => setsimulatorBet(+e.target.value)}
              />
            </div>
            <div className="btn sim__long" onClick={() => changePosition('long')}>
              LONG
            </div>
          </div>
          <div className="sim__close" onClick={() => dispatch(setSimulator({ enabled: false }))}>
            <SvgIcon name="close" />
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
