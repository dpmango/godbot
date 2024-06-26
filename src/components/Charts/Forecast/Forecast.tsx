import { ForecastFilter, ForecastLegend, ForecastSimulator } from '@c/Charts';
import { Logo } from '@c/Layout/Header';
import { LockScreen } from '@ui';
import { utcToZonedTime } from 'date-fns-tz';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import {
  createChart,
  IChartApi,
  ISeriesApi,
  LogicalRange,
  MouseEventParams,
  UTCTimestamp,
} from 'lightweight-charts';

import { BlockGraphPopup } from '@/components/Modal';
import { IGraphKeyedDto, IGraphTickDto, ISeriesData } from '@/core/interface/Forecast';

export interface IChartLines {
  id: string;
  name: string;
  showChanges: boolean;
  instance: ISeriesApi<'Line'> | ISeriesApi<'Candlestick'>;
}

export const graphColors: string[] = ['#2962FF', '#2962FF', '#CD1D15', '#3DAB8E', '#966ADB'];
export const graphColorInvisible = '#00000000';

export const Forecast = () => {
  // внутренние стейты
  const [loading, setLoading] = useState<boolean>(true);
  const [legendActive, setLegendActive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [minutesToUpdate, setMinutesToUpdate] = useState<number>(0);
  const chart = useRef<IChartApi | null>(null);
  const [dataSeries, setSeries] = useAsyncState<any>([]);
  const [chartLines, setChartLines] = useAsyncState<IChartLines[]>([]);
  const [scrollRange, setScrollRange] = useState<LogicalRange>();
  // const [crosshair, setCrosshair] = useState<MouseEventParams | null>(null);
  const [returnVisible, setReturnVisible] = useState<boolean>(false);
  const [isForecastOutdated, setIsForecastOutdated] = useState<boolean>(true);
  const [isForceGraph, setIsForceGraph] = useState<boolean>(false);
  const debouncedRange = useDebounce<LogicalRange | undefined>(scrollRange, 250);
  const [blockPointX, setBlockPointX] = useState(500);
  const [showHistory, setShowHistory] = useState(false);

  // стор
  const { data, dataHistory, dataNav, currentCoin, currentTime, prolongation, simulator } =
    useAppSelector((state) => state.forecastState);
  const { tariffActive } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  // рефы
  const containerRef: any = useRef();
  const tooltipRef: any = useRef();
  const pulseRef: any = useRef();

  const { allowedFunctions } = useProfile();
  const { t } = useTranslation('forecast');

  // Хук с утилитами (data-blind)
  const {
    getChartDefaults,
    createSeriesData,
    createChartLines,
    createUpdateMarkers,
    setTooltipOnCrosshairMove,
  } = useChart({
    chart,
    containerRef,
    tooltipRef,
    dataSeries,
    chartLines,
  });

  const paginatePer = 200;
  const viewLocked = !tariffActive && !allowedFunctions.forecast;

  // основная функция отрисовки TW
  const initOrUpdateChart = useCallback(
    async (coinData: IGraphTickDto[], historyData?: IGraphKeyedDto) => {
      const PERF_TIME_SERIES = performance.now();

      // Создание данных по ответу forecast (указываются id для отрисовки)
      const currentSeries = createSeriesData(
        coinData,
        ['RealCandle', 'RealLine', 'Forecast', 'Upper', 'Lower', 'History'],
        historyData,
        showHistory
      );

      // определение что изменилось. История отрисовывается по отдельным правилам
      const historySeriesPrev = dataSeries.filter((x) => x.id.includes('History')).length;
      const historySeriesCurrent = currentSeries.filter((x) => x.id.includes('History')).length;
      const nonHistorySeriesPrev = dataSeries.filter((x) => !x.id.includes('History')).length;
      const nonHistorySeriesCurrent = currentSeries.filter((x) => !x.id.includes('History')).length;
      const historyChanged = historySeriesPrev !== historySeriesCurrent;
      const nonHistoryChanged = nonHistorySeriesPrev !== nonHistorySeriesCurrent;
      const seriesChanged = nonHistoryChanged;

      // точки обновленный прогноза
      const updateDates = coinData.filter((x) => x.is_forecast_start).map((x) => x.timestamp);
      const updateMarkers = createUpdateMarkers(updateDates);

      // Определение "график обновиться"
      const lastTick = coinData[coinData.length - 1].timestamp;
      const lastTime = dayjs(utcToZonedTime(lastTick * 1000, 'Etc/UTC'));
      const currentTime = dayjs();
      const minutesToUpdate = (lastTime.unix() - currentTime.unix()) / 60;
      setMinutesToUpdate(minutesToUpdate || 0);

      // Создание инстанса графика
      let chartInstance = chart.current;

      const create = async (isRefresh = false) => {
        // обновление данных
        try {
          chartLines.forEach((lineSeries, idx) => {
            chart.current?.removeSeries(lineSeries.instance);
          });
        } catch (e) {
          console.warn('1. chartLines remove ERR', e);
        }

        if (!isRefresh) {
          chartInstance = createChart(
            containerRef.current,
            getChartDefaults(containerRef.current, {})
          );
        }

        // отрисовка Series Types
        const newChartLines = createChartLines({
          // @ts-ignore
          chart: chartInstance,
          updateMarkers,
          currentSeries,
        });

        await setChartLines(newChartLines);

        if (!isRefresh) {
          // навигация по графику
          const lastUpdateMarker = updateDates.length ? updateDates[updateDates.length - 1] : 0;

          let from = lastTime.subtract(3, 'hour');
          if (lastUpdateMarker) {
            from = dayjs(utcToZonedTime(lastUpdateMarker * 1000, 'Etc/UTC'));
          }

          const visibleRange = {
            from: timeToTz((from.unix() * 1000) as UTCTimestamp),
            to: timeToTz((lastTime.unix() * 1000) as UTCTimestamp),
          };

          chartInstance?.timeScale().setVisibleRange(visibleRange);
        }

        chart.current = chartInstance;
      };

      const update = async () => {
        if (!chart.current) return;

        const nonHistoryLines = chartLines.filter((x) => !x.id.includes('History'));
        const historyUpdateLines = chartLines.filter((x) => {
          if (!x.id.includes('History')) return false;
          return !!dataSeries.find((y: ISeriesData) => x.id === y.id);
        });

        const historyUpdateIds = historyUpdateLines.map((x) => x.id);
        const newLinesToCreate = dataSeries.reduce((acc: ISeriesData[], x) => {
          if (x.id.includes('History') && !historyUpdateIds.includes(x.id)) {
            acc.push(x);
          }

          return acc;
        }, [] as ISeriesData[]);

        // console.log({ l: currentSeries.length }, { newLinesToCreate });

        await setSeries([...currentSeries]);

        if (nonHistoryLines.length) {
          nonHistoryLines.forEach((lineSeries, idx) => {
            const newData = currentSeries.find((x) => x.id === lineSeries.id)?.data;
            if (newData) {
              lineSeries.instance.setData([...newData]);
            }
          });
        }

        if (historyUpdateLines.length) {
          historyUpdateLines.forEach((lineSeries, idx) => {
            const newData = currentSeries.find((x) => x.id === lineSeries.id)?.data;
            if (newData) {
              lineSeries.instance.setData([...newData]);
            }
          });
        }

        // создание новых линий внутри апдейда данных
        if (newLinesToCreate.length) {
          const historyNewLines = createChartLines({
            chart: chart.current,
            updateMarkers,
            currentSeries: newLinesToCreate,
          });

          // console.log('setChartLines 2', { historyNewLines });
          const upLines = [
            ...(nonHistoryLines || []),
            ...(historyUpdateLines || []),
            ...historyNewLines,
          ];
          await setChartLines(upLines);
        }

        // маркеры обновлений
        if (updateMarkers.length) {
          chartLines
            .filter((x) => x.showChanges)
            .forEach((lineSeries) => {
              lineSeries.instance.setMarkers(updateMarkers);
            });
        }
      };

      // Роутинг действий
      if (!chart.current) {
        await setSeries([...currentSeries]);
        create();
      } else if (seriesChanged) {
        await setSeries([...currentSeries]);
        create(true);
      } else {
        update();
      }

      setLoading(false);
      setLastUpdate(formatDate(new Date()));

      PerformanceLog(PERF_TIME_SERIES, 'updating chart series');
    },
    [chart.current, containerRef.current, dataSeries, chartLines, showHistory]
  );

  // Проверка на блокировку скрола для пользователя
  const checkForBlockScroll = useCallback(
    ({ from, to }: { from: number; to: number }) => {
      const isPossibleToCheck =
        prolongation.required > 0 &&
        prolongation.blockFromTimestamp &&
        ((dataSeries.length >= 1 && dataSeries[1]) || (dataSeries.length >= 2 && dataSeries[2]));

      if (isPossibleToCheck) {
        const mockPoints = 20; // prolongation.required
        const pointsSize = dataNav.points;
        const rightBlockPoint = pointsSize;
        const leftBlockPoint = rightBlockPoint - 2 * mockPoints;

        const data = dataSeries[2]?.data || dataSeries[1]?.data;
        const blockPoint = rightBlockPoint - mockPoints;

        const xCoordinate = chart.current
          ?.timeScale()
          .timeToCoordinate(prolongation.blockFromTimestamp || data.time);

        if (xCoordinate) {
          setBlockPointX(xCoordinate);
        }

        const middlePointLogic = (to + from) / 2;

        // BlockGraphPopup не должен быть больше по размеру чем пол графика
        if (middlePointLogic > blockPoint) {
          const newFrom = from < leftBlockPoint ? from : from - 0.5;
          const newTo = to < rightBlockPoint ? to : to - 0.1;

          chart.current?.timeScale().setVisibleLogicalRange({ from: newFrom, to: newTo });

          return false;
        }
      }

      return true;
    },
    [prolongation.required, dataNav.points, dataSeries.length, chart.current]
  );

  const checkLogicalRange = useCallback((range: LogicalRange | null) => {
    if (!range) {
      return;
    }

    if (checkForBlockScroll(range)) {
      setScrollRange(range);
    }
  }, []);

  const handleVisibilityToggle = useCallback(
    (id: string, isVisible: boolean) => {
      const targetLine = chartLines.find((x) => x.id === id);

      if (targetLine) {
        // const { visible } = targetLine.instance.options();
        targetLine.instance.applyOptions({
          visible: isVisible,
        });
      }
    },
    [chartLines]
  );

  const [currentViewType, setCurrentViewType] = useState<'lines' | 'bars'>('lines');
  const setLinesView = useCallback(() => {
    if (currentViewType === 'lines') {
      setBarsView();
      return;
    }
    handleVisibilityToggle('RealCandle', false);
    handleVisibilityToggle('RealLine', true);
    setCurrentViewType('lines');
  }, [handleVisibilityToggle, currentViewType]);

  const setBarsView = useCallback(() => {
    if (currentViewType === 'bars') {
      setLinesView();
      return;
    }
    handleVisibilityToggle('RealCandle', true);
    handleVisibilityToggle('RealLine', false);
    setCurrentViewType('bars');
  }, [handleVisibilityToggle, currentViewType]);

  const setHistoryShow = useCallback(() => {
    if (showHistory) {
      setHistoryHide();
      return;
    }

    chartLines.forEach((x) => {
      if (x.id.startsWith('History')) {
        handleVisibilityToggle(x.id, true);
      }
    });

    setShowHistory(true);
  }, [handleVisibilityToggle, showHistory, chartLines]);

  const setHistoryHide = useCallback(() => {
    if (!showHistory) {
      setHistoryShow();
      return;
    }

    chartLines.forEach((x) => {
      if (x.id.startsWith('History')) {
        handleVisibilityToggle(x.id, false);
      }
    });

    setShowHistory(false);
  }, [handleVisibilityToggle, showHistory]);

  useEffect(() => {
    if (chart.current) {
      // Подписываемся на проверку обновления VisibleRange графика
      chart.current.timeScale().subscribeVisibleLogicalRangeChange(checkLogicalRange);
    }

    return () => {
      // По обновлению - отписываемся
      chart.current &&
        chart.current.timeScale().unsubscribeVisibleLogicalRangeChange(checkLogicalRange);
    };
  }, [chart.current, chartLines, dataSeries]);

  // подписка на тултипы
  useEffect(() => {
    if (chart.current) {
      chart.current.subscribeCrosshairMove(setTooltipOnCrosshairMove);
    }

    return () => {
      chart.current && chart.current.unsubscribeCrosshairMove(setTooltipOnCrosshairMove);
    };
  }, [chart.current, chartLines, dataSeries]);

  // пульсирующая точка
  useEffect(() => {
    if (pulseRef.current && chart.current && dataSeries.length && chartLines.length) {
      try {
        const data = dataSeries[1].data;
        const series = chartLines[1].instance;

        // @ts-ignore
        const { value, time } = data[data.length - 1];
        const y = series.priceToCoordinate(value);
        const x = chart.current?.timeScale().timeToCoordinate(time);

        const { visible } = series.options();

        if (visible && y && x) {
          pulseRef.current.style.display = 'block';
          pulseRef.current.style.top = y - 4 + 'px';
          pulseRef.current.style.left = x + 54 + 'px';

          // setBlockPointX(x);
          return;
        }
      } catch (err) {
        if (pulseRef.current) {
          pulseRef.current.style.display = 'none';
        }
      }
    } else {
      if (pulseRef.current) {
        pulseRef.current.style.display = 'none';
      }
    }
  }, [dataSeries, chartLines, scrollRange]);

  // вернуться к текущему времени
  const handleReturnToLive = useCallback(() => {
    chart.current?.timeScale().scrollToRealTime();
    setReturnVisible(false);
  }, []);

  // инициализация запросов
  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    if (simulator.enabled) return;
    let updateIntervalMin = 1;
    if (currentTime === '15m') {
      updateIntervalMin = 1;
    }

    const requestChart = async () => {
      if (currentCoin && currentTime && !simulator.enabled) {
        dispatch(getChart({ page: 1, per: paginatePer }));
      }
    };

    if (allowedFunctions.forecast) {
      dispatch(flushDataState());
      requestChart();
      timerConfirm.current = setInterval(requestChart, updateIntervalMin * (60 / 6) * 1000);
    }

    return () => {
      clearInterval(timerConfirm.current as NodeJS.Timeout);
    };
  }, [allowedFunctions.forecast, currentCoin, currentTime, simulator.enabled]);

  useEffect(() => {
    if (allowedFunctions.forecast) {
      dispatch(getCoins());
    }
  }, [allowedFunctions.forecast]);

  // пагинация
  const requestPagination = useCallback(
    async (range: LogicalRange) => {
      const navDistance = Math.ceil(Math.abs(range.from) / paginatePer);
      let currentPage = Math.max.apply(0, dataNav.requested);
      if (currentPage === -Infinity) currentPage = 1;

      const requestPage = currentPage + navDistance;
      const requestPower = requestPage - currentPage;

      LOG.log({ currentPage }, { requestPage }, { requestPower }, { dataNav: dataNav.requested });

      if (!dataNav.requested.includes(requestPage)) {
        [...Array(requestPower)].forEach((_, idx) => {
          const targetPage = requestPage - idx;
          if (targetPage <= dataNav.max) {
            dispatch(
              getChart({
                page: requestPage - idx,
                per: paginatePer,
              })
            );
          }
        });
      }
    },
    [dataNav]
  );

  // Логика отображения кнопки скрола в начало графика
  useEffect(() => {
    if (debouncedRange && debouncedRange.from < 0) {
      requestPagination(debouncedRange);
    }
    // if (debouncedRange && debouncedRange.to) {
    //   setReturnVisible(debouncedRange.to < 199);
    // }
    if (debouncedRange && debouncedRange.to) {
      // Проверка на отображение кнопки для скрола в начало графика
      const requestedPoints = dataNav?.requested?.length * paginatePer - 1;
      const loadedSize = requestedPoints === 0 ? paginatePer - 1 : requestedPoints;
      const visibleShiftFromStart = 20;

      setReturnVisible(debouncedRange.to < loadedSize - visibleShiftFromStart);
    }
  }, [debouncedRange]);

  // обновление данных
  useEffect(() => {
    if (data && !viewLocked && !simulator.enabled) {
      if (data.length) initOrUpdateChart(data, dataHistory);
    } else if (viewLocked || simulator.enabled) {
      chart.current?.remove();
      chart.current = null;
    }
  }, [data, viewLocked, dataHistory, simulator]);

  useEffect(() => {
    if (chart.current && currentCoin && currentTime) {
      chart.current?.remove();
      chart.current = null;
    }
  }, [currentCoin, currentTime]);

  // Проверка на устаревшие Forecast данные
  useEffect(() => {
    if (dataSeries.length === 0) {
      return;
    }

    const getChartLastPoint = (index: number) => {
      const { data } = dataSeries[index];

      return data[data.length - 1]?.time || 0;
    };

    const realLineLastItemTime = getChartLastPoint(1);
    const forecastLastItemTime = getChartLastPoint(2);

    setIsForecastOutdated(realLineLastItemTime > forecastLastItemTime);
  }, [dataSeries, chartLines]);

  return (
    <>
      <div
        className={cns(
          'chart',
          viewLocked && 'chart--locked',
          simulator.enabled && 'chart--simulator'
        )}>
        <ForecastFilter
          chartLines={chartLines}
          legendActive={legendActive}
          setLegendActive={(x) => setLegendActive(x)}
          lastUpdate={lastUpdate}
          minutesToUpdate={minutesToUpdate}
          showHistory={showHistory}
          currentViewType={currentViewType}
          setHistoryHide={setHistoryHide}
          setHistoryShow={setHistoryShow}
          setBarsView={setBarsView}
          setLinesView={setLinesView}
        />

        <ForecastLegend active={legendActive} chartLines={chartLines} />

        {simulator.enabled ? (
          <ForecastSimulator />
        ) : (
          <>
            {viewLocked ? (
              <img className="fader--size-big" src="/img/temp/chart.png" width="100%" alt="" />
            ) : (
              <div
                ref={containerRef}
                className="chart-container"
                style={{
                  opacity: loading ? '0' : '1',
                }}>
                <div className="chart-info" ref={tooltipRef} />
                <div className="chart-pulse" ref={pulseRef}>
                  <span></span>
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
                {/* <div className="chart-legend-tw">
                  <div
                    className={cns('chart-legend-view', currentViewType === 'bars' && '_active')}>
                    <div className="chart-legend-view__default" onClick={setLinesView}>
                      <SvgIcon name="tw-lines" />
                    </div>
                    <div className="chart-legend-view__option" onClick={setBarsView}>
                      <SvgIcon name="tw-bars" />
                    </div>
                  </div>

                  <div className={cns('chart-legend-view', '_history', showHistory && '_active')}>
                    <div className="chart-legend-view__default" onClick={setHistoryShow}>
                      <SvgIcon name="history" />
                    </div>
                    <div className="chart-legend-view__option" onClick={setHistoryHide}>
                      <SvgIcon name="history" />
                    </div>
                  </div>

                  <label className="chart__legend-item">
                    <span
                      className="chart__settings-line"
                      style={{ borderColor: 'rgb(205, 29, 21)' }}
                    />
                    Forecast
                  </label>
                  <label className="chart__legend-item">
                    <span
                      className="chart__settings-line"
                      style={{ borderColor: 'rgb(41, 98, 255)' }}
                    />
                    Real
                  </label>
                  <label className="chart__legend-item">
                    <span
                      className="chart__settings-circle"
                      style={{ backgroundColor: '#F5840F' }}
                    />
                    Update
                  </label>
                </div> */}
                <div
                  className={cns('chart-return', returnVisible && '_visible')}
                  onClick={handleReturnToLive}>
                  <img src="/img/next-tw.svg" alt="" />
                </div>

                {/* Нет актуальных предсказаний на графике, выводим предупреждение */}
                {!isForceGraph && isForecastOutdated && (
                  <>
                    <div className={'fader fader--active chart-popup'}>
                      <div className="fader__text fader__text--big">
                        <svg width="32" height="32">
                          <use xlinkHref="/img/icons-tea.svg#tea"></use>
                        </svg>

                        <div
                          dangerouslySetInnerHTML={{ __html: t('forecastOutdated.text') as string }}
                        />

                        <button
                          className="btn fader__btn-min"
                          onClick={() => setIsForceGraph(true)}>
                          {t('forecastOutdated.action')}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {containerRef?.current && (
                  <BlockGraphPopup graphRef={containerRef?.current} pointX={blockPointX} />
                )}
              </div>
            )}

            <div className={cns('fader fader--chart', legendActive && 'fader--active')}></div>

            {viewLocked && (
              <LockScreen sizeModifier="big" section={t('lock')} textModifier={'big'} />
            )}
          </>
        )}
      </div>
      {/* <div className="chart__undertext">{t('under-text')}</div> */}
    </>
  );
};
