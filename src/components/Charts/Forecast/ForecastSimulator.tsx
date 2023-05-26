import { Logo } from '@c/Layout/Header';
import { utcToZonedTime } from 'date-fns-tz';
import dayjs from 'dayjs';
import {
  createChart,
  IChartApi,
  IPriceLine,
  ISeriesApi,
  LineStyle,
  LogicalRange,
  SeriesMarker,
  Time,
  UTCTimestamp,
} from 'lightweight-charts';
import internal from 'stream';

import { ForecastSimulatorModalInterval, ForecastSimulatorModalResult } from '@/components/Charts';
import { SvgIcon } from '@/components/UI';
import { IGraphTickDto, ISeriesData } from '@/core/interface/Forecast';

export interface IChartLines {
  id: string;
  name: string;
  showChanges: boolean;
  instance: ISeriesApi<'Line'> | ISeriesApi<'Candlestick'>;
}
export interface IPositionElement {
  dir: 'long' | 'short';
  quantity: number;
  avarage: number;
  savedProfit: number;
}

interface ISimulatorTimeline {
  paused: boolean;
  speed: number;
  intervals: { from: UTCTimestamp; to: UTCTimestamp }[];
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

  const { allowedFunctions } = useProfile();
  const { t } = useTranslation('simulator');

  // рефы
  const containerRef: any = useRef(null);
  const tooltipRef: any = useRef(null);

  // Логика эмулятора
  const [stageActiveID, setStageActiveID] = useState(0);
  const [stages, setStages] = useState([
    {
      from: dayjs('2023-04-10 15:00', 'YYYY-MM-DD HH:mm'),
      to: dayjs('2023-04-11 02:00', 'YYYY-MM-DD HH:mm'),
      fromTz: timeToTz(
        (dayjs('2023-04-10 15:00', 'YYYY-MM-DD HH:mm').unix() * 1000) as UTCTimestamp
      ),
      toTz: timeToTz((dayjs('2023-04-11 02:00', 'YYYY-MM-DD HH:mm').unix() * 1000) as UTCTimestamp),
      intervalModal: 'stage1',
    },
    {
      from: dayjs('2023-04-11 17:30', 'YYYY-MM-DD HH:mm'),
      to: dayjs('2023-04-12 06:00', 'YYYY-MM-DD HH:mm'),
      fromTz: timeToTz(
        (dayjs('2023-04-11 17:30', 'YYYY-MM-DD HH:mm').unix() * 1000) as UTCTimestamp
      ),
      toTz: timeToTz((dayjs('2023-04-12 06:00', 'YYYY-MM-DD HH:mm').unix() * 1000) as UTCTimestamp),
      intervalModal: 'stage2',
    },
    {
      from: dayjs('2023-04-13 10:45', 'YYYY-MM-DD HH:mm'),
      to: dayjs('2023-04-13 20:00', 'YYYY-MM-DD HH:mm'),
      fromTz: timeToTz(
        (dayjs('2023-04-13 10:45', 'YYYY-MM-DD HH:mm').unix() * 1000) as UTCTimestamp
      ),
      toTz: timeToTz((dayjs('2023-04-13 20:00', 'YYYY-MM-DD HH:mm').unix() * 1000) as UTCTimestamp),
      intervalModal: 'stage3',
      channels: true,
    },
    {
      from: dayjs('2023-04-16 13:45', 'YYYY-MM-DD HH:mm'),
      to: dayjs('2023-04-17 03:00', 'YYYY-MM-DD HH:mm'),
      fromTz: timeToTz(
        (dayjs('2023-04-16 13:45', 'YYYY-MM-DD HH:mm').unix() * 1000) as UTCTimestamp
      ),
      toTz: timeToTz((dayjs('2023-04-17 03:00', 'YYYY-MM-DD HH:mm').unix() * 1000) as UTCTimestamp),
      intervalModal: 'stage4',
      channels: true,
    },
    {
      from: dayjs('2023-04-08 21:30', 'YYYY-MM-DD HH:mm'),
      to: dayjs('2023-04-10 06:30', 'YYYY-MM-DD HH:mm'),
      fromTz: timeToTz(
        (dayjs('2023-04-08 21:30', 'YYYY-MM-DD HH:mm').unix() * 1000) as UTCTimestamp
      ),
      toTz: timeToTz((dayjs('2023-04-10 06:30', 'YYYY-MM-DD HH:mm').unix() * 1000) as UTCTimestamp),
      intervalModal: 'stage5',
      channels: true,
    },
  ]);

  const [simulatorDataLoaded, setSimulatorDataLoaded] = useState<boolean>(false);
  const [simulatorCurrentPrice, setSimulatorCurrentPrice] = useState<number>(0);
  const [simulatorCurrentTime, setSimulatorCurrentTime] = useState<UTCTimestamp | null>(null);
  const [simulatorTimeline, setSimulatorTimeline] = useState<ISimulatorTimeline>({
    paused: true,
    speed: 10,
    intervals: [],
  });
  const [simulatorPosition, setSimulatorPosition] = useState<IPositionElement>({
    dir: 'long',
    quantity: 0,
    avarage: 0,
    savedProfit: 0,
  });
  const [simulatorBet, setSimulatorBet] = useState<number>(1);
  const [modalManager, setModalManager] = useState<string | null>(null);
  const [dealsMarkers, setDealsMarkers] = useState<SeriesMarker<Time>[]>([]);
  const [endGame, setEndGame] = useState<boolean>(false);

  const [updateMarkers, setUpdateMarkers] = useState<SeriesMarker<any>[]>([]);

  // логика открытия / закрытия / изминения позиции симулятора
  const changePosition = useCallback(
    (type: 'long' | 'short', forcedQuantity?: number) => {
      setSimulatorPosition((position) => {
        let newAverage = position.avarage || simulatorCurrentPrice;
        let newQuantity = position.quantity;
        let newDir = position.dir;
        let newSavedProfit = position.savedProfit;

        const positionQuantity = forcedQuantity || simulatorBet;

        if (type === 'long') {
          setDealsMarkers((prev) => [
            ...prev,
            {
              time: simulatorCurrentTime as Time,
              position: 'belowBar',
              color: '#2196F3',
              shape: 'arrowUp',
              text: `Long @ ${positionQuantity} x ${formatPrice(simulatorCurrentPrice)}`,
            },
          ]);
        } else if (type === 'short') {
          setDealsMarkers((prev) => [
            ...prev,
            {
              time: simulatorCurrentTime as Time,
              position: 'aboveBar',
              color: '#e91e63',
              shape: 'arrowDown',
              text: `Short @ ${positionQuantity} x ${formatPrice(simulatorCurrentPrice)}`,
            },
          ]);
        }

        // если направление позиции совпадает, управление только количеством
        const addPosition = () => {
          const curentPositionTotal = position.quantity * position.avarage;
          const incomingPositionTotal = positionQuantity * simulatorCurrentPrice;

          newQuantity = position.quantity + positionQuantity;
          newAverage =
            (curentPositionTotal + incomingPositionTotal) / (position.quantity + positionQuantity);
        };

        // если позиция уменьшается, считать разницу и сохранять P/L
        const removePosition = () => {
          let directionChanged = false;

          const incomingQuantity = position.quantity - positionQuantity;
          if (incomingQuantity >= 0) {
            newQuantity = incomingQuantity;
          } else {
            newDir = type;
            directionChanged = true;
            newQuantity = incomingQuantity * -1;
          }

          // установка PL
          const diffPosition = position.quantity - incomingQuantity;
          let diffValue = 0;

          if (type === 'short') {
            diffValue = (simulatorCurrentPrice - newAverage) * diffPosition;
          } else if (type === 'long') {
            diffValue = (newAverage - simulatorCurrentPrice) * diffPosition;
          }

          newSavedProfit = newSavedProfit + diffValue;
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
          avarage: newQuantity ? newAverage : 0,
          quantity: newQuantity,
          savedProfit: newSavedProfit,
        };
      });

      // setSimulatorPaused(false);
    },
    [simulatorPosition, simulatorCurrentPrice, simulatorBet]
  );

  const flattenPosition = useCallback(() => {
    const { dir, quantity } = simulatorPosition;

    if (quantity > 0) {
      changePosition(dir === 'long' ? 'short' : 'long', quantity);
    }
  }, [simulatorPosition]);

  // таймлайн
  const handleSimulatorPausedClick = useCallback(() => {
    setSimulatorTimeline((prev) => ({
      ...prev,
      paused: !prev.paused,
    }));
  }, []);

  // установка ставки (всплываюший диалог)
  const [simulatorBetEnabled, setSimulatorBetEnabled] = useState(false);

  const simulatorOptions = useMemo(() => {
    return [1, 5, 25, 100, 500, 1000];
  }, []);

  const betSelectRef = useRef(null);
  useClickOutside(betSelectRef, () => setSimulatorBetEnabled(false));

  // установка скорости (всплывающий диалог)
  const [simulatorSpeedEnabled, setSimulatorSpeedEnabled] = useState(false);

  const simulatorSpeedOptions = useMemo(() => {
    return [
      { value: 10, label: '10 upd per 1 sec' },
      { value: 3, label: '3 upd per 1 sec' },
      { value: 1, label: '1 upd per 1 sec' },
      { value: 0.5, label: '1 upd per 2 sec' },
      { value: 0.3, label: '1 upd per 3 sec' },
      { value: 0.1, label: '1 upd per 10 sec' },
    ];
  }, []);

  const speedSelectRef = useRef(null);
  useClickOutside(speedSelectRef, () => setSimulatorSpeedEnabled(false));

  // мемо по позиции (калькуляции)
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

  // показ прогноза, логика стопов по интервалам
  const currentStage = useMemo(() => {
    if (stages.length > 0 && simulatorCurrentTime) {
      return stages[stageActiveID];
      // return stages.find((x) => {
      //   return simulatorCurrentTime >= x.fromTz && simulatorCurrentTime < x.toTz;
      // });
    }

    return stages[0];
  }, [stages, stageActiveID, simulatorCurrentTime]);

  const [intervalRun, setIntervalRun] = useState(0);
  const currentInterval = useMemo(() => {
    if (simulatorTimeline.intervals.length > 0 && simulatorCurrentTime) {
      return simulatorTimeline.intervals.find(
        (x) => simulatorCurrentTime >= x.from && simulatorCurrentTime < x.to
      );
    }

    return null;
  }, [simulatorTimeline, simulatorCurrentTime]);

  const handleSimulatorBackClick = useCallback(() => {
    if (currentStage?.fromTz) {
      updateSimulatorToTime(currentStage.fromTz);
    }
  }, [currentStage]);

  const updateSimulatorToTime = useCallback(
    (time: UTCTimestamp) => {
      setSimulatorCurrentTime(time);

      chartLines.forEach((lineSeries, idx) => {
        const forecastInterval = dataSeries[idx].data.filter((x) => x.time <= time);
        if (forecastInterval?.length) {
          lineSeries.instance.setData(forecastInterval);
        }
      });

      handleSimualtorUpdate(time);
      setSimulatorTimeline((prev) => ({
        ...prev,
        paused: true,
      }));
    },
    [chartLines, dataSeries]
  );

  const handleSimulatorForwardClick = useCallback(() => {
    if (currentInterval?.to || currentStage?.toTz) {
      const newTime = currentInterval?.to || currentStage?.toTz;
      updateSimulatorToTime(newTime);
    }
  }, [currentStage]);

  // установка горизонтальных линиий с инофрмацией по позции
  const [lastPriceLine, setLastPriceLine] = useState<IPriceLine | null>(null);
  useEffect(() => {
    if (simulatorPosition.avarage) {
      const avgPriceLine = {
        price: simulatorPosition.avarage,
        color: '#be1238',
        lineWidth: 2 as any,
        lineStyle: LineStyle.Solid,
        axisLabelVisible: true,
        title: 'average',
      };

      chartLines.forEach((lineSeries, idx) => {
        if (lineSeries.id === 'Forecast') {
          if (lastPriceLine) {
            lineSeries.instance.removePriceLine(lastPriceLine);
          }

          const priceLineInstance = lineSeries.instance.createPriceLine(avgPriceLine);
          setLastPriceLine(priceLineInstance);
        }
      });
    } else {
      chartLines.forEach((lineSeries, idx) => {
        if (lineSeries.id === 'Forecast') {
          if (lastPriceLine) {
            lineSeries.instance.removePriceLine(lastPriceLine);
          }
        }
      });
    }
  }, [simulatorPosition.avarage]);

  // отображение сделок на графике
  useEffect(() => {
    if (dealsMarkers.length) {
      chartLines.forEach((lineSeries, idx) => {
        if (lineSeries.id === 'RealLine') {
          lineSeries.instance.setMarkers(dealsMarkers);
        }
      });
    }
  }, [dealsMarkers]);

  // показ прогноза по интервалам (промежуточки между пересчетами)
  useEffect(() => {
    if (currentInterval?.from) {
      chartLines.forEach((lineSeries, idx) => {
        if (lineSeries.id === 'Forecast') {
          const forecastInterval = dataSeries[idx].data.filter((x) => x.time <= currentInterval.to);

          if (forecastInterval?.length) {
            lineSeries.instance.setData(forecastInterval);
            setIntervalRun((prev) => prev + 1);
            if (updateMarkers.length) {
              lineSeries.instance.setMarkers(
                updateMarkers.filter(
                  (x) =>
                    (x.time >= currentInterval.to || currentInterval.from) &&
                    x.time <= currentInterval.from
                )
              );
            }
          }
        }
      });
    }
  }, [currentInterval]);

  // изминение этапа (игры)
  // useEffect(() => {
  //   if (intervalRun >= 1) {
  //     setSimulatorTimeline((prev) => ({
  //       ...prev,
  //       paused: true,
  //     }));
  //     setModalManager('interval');
  //   }
  // }, [currentStage]);

  // при закрытии модального логика перехода на следующий стейдж либо конец игры
  const handleModalClose = useCallback(
    (isLossResult?: boolean) => {
      setModalManager(null);
      if (isLossResult) {
        handleSimulatorBackClick();
      } else {
        // определение окончания либо следующего этапа симулятора
        let nextStageIdx = stageActiveID + 1;
        if (nextStageIdx >= stages.length - 1) {
          nextStageIdx = stages.length - 1;

          setEndGame(true);
        }
        setStageActiveID(nextStageIdx);
      }

      // сброс стейта
      setSimulatorPosition({ dir: 'long', quantity: 0, avarage: 0, savedProfit: 0 });
      // if (endGame){}

      setSimulatorTimeline((prev) => ({ ...prev, paused: true }));
    },
    [stageActiveID, stages]
  );

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
    const currentSeries = createSeriesData(coinData, ['RealLine', 'Forecast']);
    setSeries([...currentSeries]);

    // точки обновленный прогноза
    const updateDates = coinData.filter((x) => x.is_forecast_start).map((x) => x.timestamp);
    const updateMarkers = createUpdateMarkers(updateDates);
    setUpdateMarkers(updateMarkers);
    // установка в эмулятор
    setSimulatorTimeline((prev) => ({
      ...prev,
      intervals: updateMarkers.map((x, idx) => ({
        from: x.time as UTCTimestamp,
        to: updateMarkers[idx + 1]?.time as UTCTimestamp,
      })),
    }));

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
        updateMarkers: [],
        currentSeries,
      });
      setChartLines([...newChartLines]);

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

            setChartRange();
          }
        }
      });
    }

    setLoading(false);

    return () => {
      chart.current?.remove();
    };
  };

  const setChartRange = useCallback(() => {
    chartLines.forEach((lineSeries, idx) => {
      if (lineSeries.id === 'Forecast') {
        if (chart.current) {
          const dataLength = dataSeries[idx].data.length;

          if (dataLength) {
            chart.current.timeScale().setVisibleLogicalRange({ from: 0, to: dataLength });
          }
        }
      }
    });
  }, [chartLines, currentInterval, currentStage, dataSeries, chart.current]);

  useEffect(() => {
    setChartRange();
  }, [chartLines, dataSeries]);

  const handleSimualtorUpdate = useCallback(
    (forcedTime?: UTCTimestamp) => {
      const currentTime = forcedTime || simulatorCurrentTime;

      chartLines.forEach((lineSeries, idx) => {
        if (lineSeries.id === 'RealLine') {
          const currentTickIndex = dataSeries[idx].data.findIndex((x) => x.time === currentTime);

          const nextTick = dataSeries[idx].data[currentTickIndex + 1];
          if (nextTick?.value && chart.current) {
            lineSeries.instance.update(nextTick);

            setChartRange();

            setSimulatorCurrentTime(nextTick.time);
            setSimulatorCurrentPrice(nextTick.value);
          } else {
            if (!endGame) {
              setSimulatorTimeline((prev) => ({
                ...prev,
                paused: true,
              }));
              setModalManager('interval');
            } else {
              setModalManager('total');
            }
          }
        }
      });
    },
    [chartLines, dataSeries, simulatorCurrentPrice, simulatorCurrentTime, intervalRun, endGame]
  );

  const timerSimulator: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    if (timerSimulator.current) {
      clearTimeout(timerSimulator.current);
    }

    if (simulatorCurrentTime && simulatorCurrentPrice && !simulatorTimeline.paused) {
      timerSimulator.current = setTimeout(() => {
        handleSimualtorUpdate();
      }, 10 * (1000 / simulatorTimeline.speed));
    }
  }, [simulatorCurrentPrice, simulatorCurrentTime, simulatorTimeline]);

  // инициализация запросов
  useEffect(() => {
    const getIntervalMinues = (time: string) => {
      switch (time) {
        case '1m':
          return 1;
        case '15m':
          return 15;
        case '1h':
          return 60;
        case '1d':
          return 60 * 24;
        default:
          return 1;
      }
    };
    const getTickDistance = ({
      targetTime,
      interval,
    }: {
      targetTime: dayjs.Dayjs;
      interval: number;
    }) => {
      const timeNow = dayjs();
      const diff = timeNow.diff(targetTime, 'minutes');

      return Math.floor(diff / interval);
    };

    const batchFetchChart = async ({
      distanceStart,
      distanceEnd,
    }: {
      distanceStart: number;
      distanceEnd: number;
    }) => {
      // const intervalTotalTicks = distanceStart - distanceEnd;

      const wantedDistance = Math.ceil(distanceStart / 100);
      const requestPagesBounds = [
        wantedDistance - 1,
        wantedDistance,
        wantedDistance + 1,
      ] as number[];
      const promisesToRequest = [] as Promise<any>[];

      requestPagesBounds.forEach((page) => {
        const paginationParams = buildParams({ page, paginated_by: 100 });

        //   api(`get_graph/${currentCoin}/${currentTime}/`, {
        promisesToRequest.push(
          api(`get_graph/BTC/15m/`, {
            params: paginationParams,
          })
        );
      });

      let collectedData = await Promise.all(promisesToRequest);

      collectedData = collectedData
        .reduce((acc, x) => {
          acc = [...acc, ...(x.data || [])];
          return acc;
        }, [])
        .map((x: IGraphTickDto) => ({
          ...x,
          originalTime: x.timestamp,
          timestamp: timeToTz(x.timestamp),
        }))
        .filter((x: IGraphTickDto) => x.timestamp);

      collectedData = [...new Map([...collectedData].map((x) => [x['timestamp'], x])).values()]
        .sort((a, b) => a.timestamp - b.timestamp)
        .filter((x) => {
          const timeTick = dayjs(utcToZonedTime(x.timestamp * 1000, 'Etc/UTC'));
          return (
            (timeTick.isAfter(currentStage.from) && timeTick.isBefore(currentStage.to)) ||
            timeTick.isSame(currentStage.from) ||
            timeTick.isSame(currentStage.to)
          );
        });

      console.log({ collectedData });
      dispatch(setStateDataForce(collectedData));
    };

    const requestChart = async () => {
      if (!currentCoin || !currentTime || !currentStage) return;

      const interval = getIntervalMinues(currentTime);
      const intervalDistanceStart = getTickDistance({
        targetTime: currentStage.from,
        interval,
      });
      const intervalDistanceEnd = getTickDistance({
        targetTime: currentStage.to,
        interval,
      });
      let intervalTotalTicks = intervalDistanceStart - intervalDistanceEnd;
      if (intervalTotalTicks < 100) {
        intervalTotalTicks = 100;
      }

      dispatch(flushDataState());
      await batchFetchChart({
        distanceStart: intervalDistanceStart,
        distanceEnd: intervalDistanceEnd,
      });
      setSimulatorDataLoaded(true);
    };

    if (allowedFunctions.forecast) {
      requestChart();
    }
  }, [allowedFunctions.forecast, currentCoin, currentTime, currentStage]);

  // обновление данных
  useEffect(() => {
    if (data) {
      if (data.length && simulatorDataLoaded) initOrUpdateChart(data);
    } else {
      chart.current?.remove();
      chart.current = null;
    }
  }, [data, simulatorDataLoaded]);

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
              className={cns('sim__timeline-action sim__back')}
              onClick={handleSimulatorBackClick}>
              <SvgIcon name="back" />
            </div>
            <div
              className={cns(
                'sim__timeline-action sim__play',
                simulatorTimeline.paused && '_active'
              )}
              onClick={handleSimulatorPausedClick}>
              <SvgIcon name="play" />
              {simulatorTimeline.paused && 'paused'}
            </div>
            <div
              className={cns('sim__timeline-action sim__forward')}
              onClick={handleSimulatorForwardClick}>
              <SvgIcon name="forward" />
            </div>

            <div className="sim__speed speed">
              <div
                className={cns('speed__current', simulatorSpeedEnabled && '_active')}
                onClick={() => setSimulatorSpeedEnabled(!simulatorSpeedEnabled)}>
                {simulatorTimeline.speed}x
              </div>
              <div
                className={cns('speed__select', simulatorSpeedEnabled && '_active')}
                ref={speedSelectRef}>
                <div className="speed__select-list">
                  {simulatorSpeedOptions.map((opt) => (
                    <span
                      className="speed__select-item"
                      key={opt.value}
                      onClick={() => {
                        setSimulatorTimeline((prev) => ({
                          ...prev,
                          speed: opt.value,
                        }));
                        setSimulatorSpeedEnabled(false);
                      }}>
                      <span>{opt.value}x</span>
                      {opt.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* {simulatorCurrentTime && (
              <div className="sim__time">
                {formatUnixDate(simulatorCurrentTime, 'DD.MM HH:mm')} - {gameEndsVerbose}
              </div>
            )} */}
          </div>
          <div className="sim__bets">
            {(simulatorPosition.quantity !== 0 || positionPL !== 0) && (
              <>
                <div
                  className={cns(
                    'sim__position',
                    positionPL < 0 && '_loss',
                    positionPL > 0 && '_profit'
                  )}>
                  {positionPL > 0 ? '+' : ''}
                  {formatPrice(positionPL, 0)} $
                </div>
                <div className="sim__stats">
                  {simulatorPosition.dir === 'long' ? (
                    <span className="c-green">
                      {t('actions.long')} x{simulatorPosition.quantity}
                    </span>
                  ) : (
                    <span className="c-red">
                      {t('actions.short')} x{simulatorPosition.quantity}
                    </span>
                  )}{' '}
                  ({formatPrice(positionWeight)}$)
                </div>
              </>
            )}

            <div className="btn sim__short" onClick={() => changePosition('short')}>
              Sell
            </div>
            <div className="sim__bet bet">
              <div
                className={cns('bet__current', simulatorBetEnabled && '_active')}
                onClick={() => setSimulatorBetEnabled(!simulatorBetEnabled)}>
                {simulatorBet}
              </div>
              <div
                className={cns('bet__select', simulatorBetEnabled && '_active')}
                ref={betSelectRef}>
                <div className="bet__select-list">
                  <div className="bet__select-current">{simulatorBet}</div>
                  <span
                    className="bet__select-item _minus"
                    onClick={() => setSimulatorBet((prev) => prev - 1)}></span>
                  <span
                    className="bet__select-item _plus"
                    onClick={() => setSimulatorBet((prev) => prev + 1)}></span>
                  {simulatorOptions.map((opt) => (
                    <span
                      className="bet__select-item"
                      key={opt}
                      onClick={() => {
                        setSimulatorBet(opt);
                        setSimulatorBetEnabled(false);
                      }}>
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="btn sim__long" onClick={() => changePosition('long')}>
              Buy
            </div>
            <div className="btn sim__flatten" onClick={flattenPosition}>
              Flatten
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
      <div className="chart-legend-tw">
        <label className="chart__legend-item">
          <span className="chart__settings-line" style={{ borderColor: 'rgb(205, 29, 21)' }} />
          Forecast
        </label>
        <label className="chart__legend-item">
          <span className="chart__settings-line" style={{ borderColor: 'rgb(41, 98, 255)' }} />
          Real
        </label>
      </div>

      {modalManager === 'interval' && (
        <ForecastSimulatorModalInterval
          positionWeight={positionWeight}
          simulatorPosition={simulatorPosition}
          positionPL={positionPL}
          translationKey={positionPL >= 0 ? 'profit' : currentStage?.intervalModal || ''}
          closeModal={handleModalClose}
        />
      )}

      {modalManager === 'total' && (
        <ForecastSimulatorModalResult
          positionWeight={positionWeight}
          simulatorPosition={simulatorPosition}
          positionPL={positionPL}
          closeModal={handleModalClose}
        />
      )}
    </div>
  );
};
