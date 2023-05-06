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
  const paginatePer = 200;

  // рефы
  const containerRef: any = useRef(null);
  const tooltipRef: any = useRef(null);

  // Логика эмулятора
  const [simulatorDataLoaded, setSimulatorDataLoaded] = useState<boolean>(false);
  const [simulatorCurrentPrice, setSimulatorCurrentPrice] = useState<number>(0);
  const [simulatorCurrentTime, setSimulatorCurrentTime] = useState<UTCTimestamp | null>(null);
  const [simulatorTimeline, setSimulatorTimeline] = useState<ISimulatorTimeline>({
    paused: false,
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

  const handleSimulatorSpeedClick = useCallback(() => {
    let newSpeed = 10;

    switch (simulatorTimeline.speed) {
      case 10:
        newSpeed = 20;
        break;
      case 20:
        newSpeed = 5;
        break;
      case 5:
        newSpeed = 10;
    }

    setSimulatorTimeline((prev) => ({
      ...prev,
      speed: newSpeed,
    }));
  }, [simulatorTimeline.speed]);

  // установка ставки (всплываюший диалог)
  const [simulatorBetEnabled, setSimulatorBetEnabled] = useState(false);

  const simulatorOptions = useMemo(() => {
    return [1, 5, 25, 100, 500, 1000];
  }, []);

  const betSelectRef = useRef(null);
  useClickOutside(betSelectRef, () => setSimulatorBetEnabled(false));

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

  const gameEndsVerbose = useMemo(() => {
    if (dataSeries.length > 1) {
      const lastForecastTimestamp = dataSeries[1].data[dataSeries[1].data.length - 1].time;
      if (lastForecastTimestamp) {
        return formatUnixDate(lastForecastTimestamp);
      }
    }

    return null;
  }, [dataSeries]);

  // показ прогноза, логика стопов по интервалам
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
    if (currentInterval?.from) {
      updateSimulatorToTime(currentInterval?.from);
    }
  }, [currentInterval]);

  const updateSimulatorToTime = useCallback((time: UTCTimestamp) => {
    setSimulatorCurrentTime(time);
    handleSimualtorUpdate(time);
    setSimulatorTimeline((prev) => ({
      ...prev,
      paused: true,
    }));
  }, []);

  const handleSimulatorForwardClick = useCallback(() => {
    if (currentInterval?.to || currentInterval?.from) {
      const newTime = currentInterval?.to || currentInterval?.from;
      updateSimulatorToTime(newTime);
    }

    // chartLines.forEach((lineSeries, idx) => {
    //   const forecastInterval = dataSeries[idx].data.filter((x) => x.time <= currentInterval.to);

    //   if (forecastInterval?.length) {
    //     lineSeries.instance.setData(forecastInterval);
    //   }
    // });
  }, [currentInterval]);

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
  // показ прогноза, логика стопов по интервалам

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
                updateMarkers.filter((x) => x.time <= currentInterval.to || currentInterval.from)
              );
            }
          }
        }
      });

      if (intervalRun >= 1) {
        setSimulatorTimeline((prev) => ({
          ...prev,
          paused: true,
        }));
        setModalManager('interval');
      }
    }
  }, [currentInterval]);

  const handleModalClose = useCallback(() => {
    setModalManager(null);
    setSimulatorTimeline((prev) => ({ ...prev, paused: false }));
  }, []);

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

      // навигация по графику
      // const lastUpdateMarker = updateDates.length ? updateDates[updateDates.length - 1] : 0;
      const lastTick = coinData[coinData.length - 1].timestamp;
      const lastTime = dayjs(utcToZonedTime(lastTick * 1000, 'Etc/UTC'));
      const firstTick = coinData[0].timestamp;
      const firstTime = dayjs(utcToZonedTime(firstTick * 1000, 'Etc/UTC'));

      // chartInstance.timeScale().setVisibleLogicalRange({ from: 0, to: lastTick });
      // chartInstance.timeScale().setVisibleRange({
      //   from: timeToTz((firstTime.unix() * 1000) as UTCTimestamp),
      //   to: timeToTz((lastTime.unix() * 1000) as UTCTimestamp),
      // });

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

      // chartInstance.timeScale().setVisibleRange({
      //   from: timeToTz((firstTime.unix() * 1000) as UTCTimestamp),
      //   to: timeToTz((lastTime.unix() * 1000) as UTCTimestamp),
      // });
      chartInstance.timeScale().setVisibleLogicalRange({ from: 0, to: 20 });
    }

    setLoading(false);

    return () => {
      chart.current?.remove();
    };
  };

  const handleSimualtorUpdate = useCallback(
    (forcedTime?: UTCTimestamp) => {
      const currentTime = forcedTime || simulatorCurrentTime;

      chartLines.forEach((lineSeries, idx) => {
        if (lineSeries.id === 'RealLine') {
          const currentTickIndex = dataSeries[idx].data.findIndex((x) => x.time === currentTime);

          const nextTick = dataSeries[idx].data[currentTickIndex + 1];
          if (nextTick?.value && chart.current) {
            lineSeries.instance.update(nextTick);

            // timescale control
            const timeToCheck = currentInterval?.to || dataSeries[idx].data.length;
            const currentIntervalIndexLast = dataSeries[idx].data.findIndex(
              (x) => x.time === timeToCheck
            );

            chart.current
              .timeScale()
              .setVisibleLogicalRange({ from: 0, to: currentIntervalIndexLast });

            setSimulatorCurrentTime(nextTick.time);
            setSimulatorCurrentPrice(nextTick.value);
          } else {
            if (!endGame) {
              setModalManager('total');
              setEndGame(true);
            }
          }
        }
      });

      // if (currentIndex === 5000) {
      //   reset();
      //   return;
      // }
    },
    [chartLines, dataSeries, simulatorCurrentPrice, simulatorCurrentTime]
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
    const requestChart = async () => {
      if (currentCoin && currentTime) {
        dispatch(flushDataState());
        await dispatch(getChart({ page: 40, per: paginatePer }));
        setSimulatorDataLoaded(true);
      }
    };

    if (allowedFunctions.forecast) {
      requestChart();
    }
  }, [allowedFunctions.forecast, currentCoin, currentTime]);

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

            <div className="sim__timeline-action sim__speed" onClick={handleSimulatorSpeedClick}>
              {simulatorTimeline.speed}x
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
