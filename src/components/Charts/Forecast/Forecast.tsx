import { useEffect, useRef, useState, useContext, useCallback, useLayoutEffect } from 'react';
import {
  createChart,
  LineStyle,
  LineWidth,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
  LogicalRange,
  DeepPartial,
  PriceFormat,
  SeriesMarker,
  SeriesMarkerPosition,
  SeriesMarkerShape,
  MouseEventParams,
  Time,
} from 'lightweight-charts';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import dayjs from 'dayjs';
import { utcToZonedTime } from 'date-fns-tz';

import { ThemeContext } from '@/App';
import { useProfile, useDebounce } from '@hooks';
import { getChart, getCoins } from '@store';
import { useAppSelector, useAppDispatch } from '@core';
import { timeToTz, formatPrice, formatUnixDate, formatDate, LOG, PerformanceLog } from '@utils';
import { LockScreen } from '@ui';
import { IGraphTickDto } from '@/core/interface/Forecast';

import { ForecastFilter, ForecastLegend } from '@c/Charts';
import { Logo } from '@c/Layout/Header';
import { BlockGraphPopup } from '@/components/Modal';

export interface IChartLines {
  id: string;
  name: string;
  showChanges: boolean;
  instance: ISeriesApi<'Line'> | ISeriesApi<'Candlestick'>;
}
export const graphColors: string[] = ['#2962FF', '#2962FF', '#CD1D15', '#3DAB8E', '#966ADB'];

export const Forecast: React.FC<{}> = () => {
  // внутренние стейты
  const [loading, setLoading] = useState<boolean>(true);
  const [legendActive, setLegendActive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [minutesToUpdate, setMinutesToUpdate] = useState<number>(0);
  const chart = useRef<IChartApi | null>(null);
  const [dataSeries, setSeries] = useState<any>([]);
  const [chartLines, setChartLines] = useState<IChartLines[]>([]);
  const [scrollRange, setScrollRange] = useState<LogicalRange>();
  const [crosshair, setCrosshair] = useState<MouseEventParams | null>(null);
  const [returnVisible, setReturnVisible] = useState<boolean>(false);
  const [isForecastOutdated, setIsForecastOutdated] = useState<boolean>(true);
  const [isForceGraph, setIsForceGraph] = useState<boolean>(false);
  const debouncedRange = useDebounce<LogicalRange | undefined>(scrollRange, 250);
  const [blockPointX, setBlockPointX] = useState(500);

  // стор
  const {
    data,
    dataNav,
    currentCoin,
    currentTime,
    prolongation,
    loading: storeLoading,
  } = useAppSelector((state) => state.forecastState);
  const { userData, tariffActive } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  // рефы
  const containerRef: any = useRef();
  const tooltipRef: any = useRef();
  const pulseRef: any = useRef();
  const ctx = useContext(ThemeContext);

  const { allowedFunctions } = useProfile();
  const { t } = useTranslation('forecast');

  const paginatePer = 200;
  const viewLocked = !tariffActive;

  // Проверка на блокировку скрола для пользователя
  const checkForBlockScroll = ({ from, to }: { from: number; to: number }) => {
    const isPossibleToCheck =
      prolongation.required > 0 &&
      prolongation.blockFromTimestamp &&
      ((dataSeries.length >= 1 && dataSeries[1]) || (dataSeries.length >= 2 && dataSeries[2]));

    if (isPossibleToCheck) {
      const mockPoints = prolongation.required;
      const pointsSize = dataNav.points;
      const rightBlockPoint = pointsSize;
      const leftBlockPoint = rightBlockPoint - 2 * mockPoints;

      const data = dataSeries[2]?.data || dataSeries[1]?.data;
      const checkPoint = data.length - 1 - mockPoints;

      const xCoordinate = chart.current
        ?.timeScale()
        .timeToCoordinate(prolongation.blockFromTimestamp || data.time);

      if (xCoordinate) {
        setBlockPointX(xCoordinate);
      }

      const middlePointLogic = from + (to - from) / 2;

      // BlockGraphPopup не должен быть больше по размеру чем пол графика
      if (to > rightBlockPoint || middlePointLogic > checkPoint) {
        // Force set visible range
        const newFrom = from < leftBlockPoint ? from : leftBlockPoint;

        chart.current?.timeScale().setVisibleLogicalRange({ from: newFrom, to: rightBlockPoint });

        return false;
      }
    }

    return true;
  };

  const checkLogicalRange = (range: LogicalRange | null) => {
    if (!range) {
      return;
    }

    if (checkForBlockScroll(range)) {
      setScrollRange(range);
    }
  };
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
  }, [chart.current, checkForBlockScroll]);

  // data: {
  //   time: UTCTimestamp;
  //   value: number;
  // }[],
  // series: ISeriesApi<'Line'>

  // основная функция отрисовки TW
  const initOrUpdateChart = (coinData: IGraphTickDto[]) => {
    // подготовка (маппинг) данных
    const PERF_TIME_SERIES = performance.now();

    // мапинг данных по графикам
    const chartsData = {
      RealCandle: coinData
        .map((x: IGraphTickDto) => {
          return {
            time: x.timestamp,
            open: x.real_open || 0,
            close: x.real_close || 0,
            high: x.real_high || 0,
            low: x.real_low || 0,
          };
        })
        .filter((x) => x.open && x.close && x.low && x.high),
      RealLine: coinData
        .map((x: IGraphTickDto) => {
          return {
            time: x.timestamp,
            value: x.real_close || 0,
          };
        })
        .filter((x) => x.value),
      Forecast: coinData
        .map((x: IGraphTickDto, _idx) => {
          return {
            time: x.timestamp,
            // value: idx >= 180 ? getRandomInt(16000, 17000) : x.forecast,
            value: x.forecast_trend,
          };
        })
        .filter((x) => x.value),
      Upper: coinData
        .map((x: IGraphTickDto) => {
          return {
            time: x.timestamp,
            value: x.forecast_high,
          };
        })
        .filter((x) => x.value),
      Lower: coinData
        .map((x: IGraphTickDto) => {
          return {
            time: x.timestamp,
            value: x.forecast_low,
          };
        })
        .filter((x) => x.value),
    };

    // Test: симулировать неактуальные forecast данные для последней точки
    //const realLineTime = chartsData.RealLine[chartsData.RealLine.length - 1].time;
    //chartsData.Forecast = chartsData.Forecast.filter(({ time }) => time < realLineTime);

    const currentSeries = [
      {
        id: 'RealCandle',
        displayName: 'Real (candle)',
        type: 'candle',
        candleStyle: {
          color: graphColors[0],
          visible: false,
        },
        data: chartsData.RealCandle,
      },
      {
        id: 'RealLine',
        displayName: 'Real (line)',
        type: 'line',
        lineStyle: {
          color: graphColors[0],
          lineWidth: 3 as LineWidth,
          visible: true,
        },
        data: chartsData.RealLine,
      },
      {
        id: 'Forecast',
        type: 'line',
        lineStyle: {
          color: graphColors[2],
          lineWidth: 3 as LineWidth,
        },
        showChanges: true,
        data: chartsData.Forecast,
      },
      {
        id: 'Upper',
        type: 'line',
        lineStyle: {
          color: graphColors[3],
          lineWidth: 1 as LineWidth,
          lineStyle: LineStyle.Dashed,
          crosshairMarkerVisible: false,
        },
        data: chartsData.Upper,
      },
      {
        id: 'Lower',
        type: 'line',
        lineStyle: {
          color: graphColors[4],
          lineWidth: 1 as LineWidth,
          lineStyle: LineStyle.Dashed,
          crosshairMarkerVisible: false,
        },
        data: chartsData.Lower,
      },
    ];

    // точки обновленный прогноза
    const updateDates = coinData.filter((x) => x.is_forecast_start).map((x) => x.timestamp);
    let updateMarkers: SeriesMarker<Time>[] = [];
    updateDates.forEach((x) => {
      updateMarkers.push({
        id: `update-${x}`,
        time: x,
        position: 'belowBar' as SeriesMarkerPosition,
        color: '#f68410',
        shape: 'circle' as SeriesMarkerShape,
        text: '',
      });
    });

    // Определение "график обновиться"
    const lastTick = coinData[coinData.length - 1].timestamp;
    const lastTime = dayjs(utcToZonedTime(lastTick * 1000, 'Etc/UTC'));
    const currentTime = dayjs();
    const minutesToUpdate = (lastTime.unix() - currentTime.unix()) / 60;
    setMinutesToUpdate(minutesToUpdate || 0);

    // watch changes in data
    // let forecastChanges: ISeriesData[] = [];
    // if (series.length && currentSeries[1].data) {
    //   forecastChanges = xorBy(series[1].data, currentSeries[1].data, 'value');
    // }

    setSeries([...currentSeries]);
    PerformanceLog(PERF_TIME_SERIES, 'creating series data');

    if (!chart.current) {
      // Создание инстанса графика
      const chartInstance = createChart(containerRef.current, {
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
        leftPriceScale: {
          visible: true,
          borderVisible: false,
          scaleMargins: { bottom: 0, top: 0 },
        },
        rightPriceScale: {
          visible: false,
        },
        // watermark: {
        //   visible: true,
        //   text: 'GODBOT-PRO',
        //   fontSize: window.innerWidth < 576 ? 34 : 56,
        //   fontFamily: 'GilroyWeb, sans-serif',
        //   // fontStyle: 'font-weight: 700',
        //   color: '#E2E2E2',
        // },
        layout: {
          textColor: !ctx?.theme ? '#262628' : '#FFFFFF',
          fontSize: window.innerWidth < 576 ? 9 : 12,
          fontFamily: 'GilroyWeb, sans-serif',
          background: { color: 'transparent' },
        },
        grid: {
          vertLines: { visible: false },
          horzLines: { color: !ctx?.theme ? '#AFCDEB' : '#5F636A', style: LineStyle.Dashed },
        },
        crosshair: {
          mode: CrosshairMode.Magnet,
          vertLine: {
            visible: false,
            labelVisible: false,
          },
        },
        timeScale: {
          rightOffset: 20,
          // fixLeftEdge: true
          fixRightEdge: true,
          borderVisible: false,
          timeVisible: true,
          secondsVisible: false,
        },
        localization: {
          priceFormatter: (price: number) => formatPrice(price),
        },
      });

      // отрисовка Series Types
      // https://tradingview.github.io/lightweight-charts/docs/series-types

      let newChartLines: IChartLines[] = [];

      currentSeries.forEach((s, idx) => {
        let lineSeriesInstance;

        const sharedSeriesOptions = {
          lastValueVisible: false,
          priceLineVisible: false,
          priceFormat: {
            type: 'price',
            precision: 4,
            minMove: 0.0001,
          } as DeepPartial<PriceFormat>,
        };

        if (s.type === 'line') {
          lineSeriesInstance = chartInstance.addLineSeries({
            ...sharedSeriesOptions,
            ...s.lineStyle,
          });
        } else if (s.type === 'candle') {
          lineSeriesInstance = chartInstance.addCandlestickSeries({
            ...sharedSeriesOptions,
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
            ...s.candleStyle,
          });
        }

        if (lineSeriesInstance) {
          lineSeriesInstance.setData(s.data);

          if (s.showChanges) {
            if (updateMarkers.length) {
              lineSeriesInstance.setMarkers(updateMarkers);
            }
          }
          newChartLines.push({
            id: s.id,
            name: s.displayName || s.id,
            showChanges: s.showChanges || false,
            instance: lineSeriesInstance,
          });
        }
      });

      setChartLines([...newChartLines]);

      // навигация по графику
      const lastUpdateMarker = updateDates.length ? updateDates[updateDates.length - 1] : 0;

      // на основе таймфрейма
      // let timeDisplay = 12;
      // if (currentTime === '1m') {
      //   timeDisplay = 3;
      // }

      let from = lastTime.subtract(3, 'hour');
      if (lastUpdateMarker) {
        from = dayjs(utcToZonedTime(lastUpdateMarker * 1000, 'Etc/UTC'));
      }

      const visibleRange = {
        from: timeToTz((from.unix() * 1000) as UTCTimestamp),
        to: timeToTz((lastTime.unix() * 1000) as UTCTimestamp),
      };
      chartInstance.timeScale().setVisibleRange(visibleRange);

      // тултипы
      chartInstance.subscribeCrosshairMove((param) => {
        const container = containerRef.current;
        const toolTip = tooltipRef.current;

        const toolTipWidth = 120;
        const priceScaleWidth = 50;
        const toolTipMargin = 15;

        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > container.clientWidth ||
          param.point.y < 0 ||
          param.point.y > container.clientHeight
        ) {
          toolTip.style.display = 'none';
          return;
        }

        tooltipRef.current.style.display = 'flex';
        setCrosshair(param);

        // build tooltip html

        const dateStr = formatUnixDate(param.time as UTCTimestamp);
        let pricesHtml = '';
        newChartLines.forEach((ser, idx) => {
          let priceInstance = param.seriesData.get(ser.instance) as {
            value: number;
            time: number;
            close?: number;
          };
          if (!priceInstance) return;

          let price = priceInstance.value;
          if (priceInstance.close) {
            price = priceInstance.close;
          }

          if (!price) return;
          const seriesData = currentSeries[idx];

          let displayName = seriesData.id;
          if (seriesData.id === 'RealCandle') {
            return false;
          } else if (seriesData.id === 'RealLine') {
            displayName = 'Real';
          }
          // @ts-ignore
          pricesHtml += `
            <div class="chart-info__pricedata">
              <i style="background: ${graphColors[idx]}"></i>
              <p>${displayName}:</p>&nbsp;${formatPrice(price)}
            </div>`;
        });

        let markersHtml = '';

        // show markers data
        const markerHovered = param.hoveredObjectId as string;
        if (markerHovered) {
          if (markerHovered.includes('update')) {
            const dateStamp = formatUnixDate(+markerHovered.split('-')[1] as UTCTimestamp);

            markersHtml += `<div class="chart-info__marker">
              <i style="background: #f68410"></i>
              <span>${t('marker.changes')} ${dateStamp}</span>
            </div>`;
          }
        }

        tooltipRef.current.innerHTML = `<div class="chart-info__inner">
            <div class="chart-info__label">${dateStr}</div>
            <div class="chart-info__prices">${pricesHtml}</div>
            <div class="chart-info__markers">${markersHtml}</div>
          </div>`;

        // set tooltip position
        let left = param.point.x as number;

        if (left > container.clientWidth - toolTipWidth - toolTipMargin) {
          left = container.clientWidth - toolTipWidth;
        } else if (left < toolTipWidth / 2) {
          left = priceScaleWidth;
        }

        toolTip.style.left = left + 'px';
        toolTip.style.top = 0 + 'px';
      });

      chart.current = chartInstance;
    } else {
      // обновление данных
      const PERF_TIME = performance.now();
      chartLines.forEach((lineSeries, idx) => {
        lineSeries.instance.setData([...currentSeries[idx].data]);

        // currentSeries[idx].data.forEach((tick) => {
        //   lineSeries.instance.update(tick);
        // });
      });

      if (updateMarkers.length) {
        chartLines.forEach((lineSeries, idx) => {
          if (lineSeries.showChanges) {
            lineSeries.instance.setMarkers(updateMarkers);
          }
        });
      }

      PerformanceLog(PERF_TIME, 'updating chart series');
    }

    setLoading(false);
    setLastUpdate(formatDate(new Date()));

    return () => {
      chart.current?.remove();
    };
  };

  // пульсирующая точка
  useEffect(() => {
    if (pulseRef.current && chart.current && dataSeries.length && chartLines.length) {
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
    }

    if (pulseRef.current) {
      pulseRef.current.style.display = 'none';
    }
  }, [dataSeries, chartLines, scrollRange, crosshair]);

  // вернуться к текущему времени
  const handleReturnToLive = useCallback(() => {
    chart.current?.timeScale().scrollToRealTime();
    setReturnVisible(false);
  }, []);

  // работа с цветовой темой
  const changeTheme = useCallback(() => {
    if (ctx?.theme) {
      // dark theme
      chart.current?.applyOptions({
        layout: {
          textColor: '#FFFFFF',
        },
        grid: {
          horzLines: { color: '#5F636A' },
        },
      });
    } else {
      // white theme
      chart.current?.applyOptions({
        layout: {
          textColor: '#262628',
        },
        grid: {
          horzLines: { color: '#AFCDEB' },
        },
      });
    }
  }, [ctx?.theme, chart.current]);

  useEffect(() => {
    changeTheme();
  }, [ctx?.theme]);

  // ресайз
  useLayoutEffect(() => {
    const handleResize = () => {
      chart.current?.applyOptions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // инициализация запросов
  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    let updateIntervalMin = 1;
    if (currentTime === '15m') {
      updateIntervalMin = 1;
    }

    const requestChart = async () => {
      if (currentCoin && currentTime) {
        dispatch(getChart({ page: 1, per: paginatePer }));
      }
    };

    if (allowedFunctions.forecast) {
      requestChart();
      // remove / 2
      timerConfirm.current = setInterval(requestChart, updateIntervalMin * (60 / 6) * 1000);
    }

    return () => {
      clearInterval(timerConfirm.current as NodeJS.Timeout);
    };
  }, [allowedFunctions.forecast, currentCoin, currentTime]);

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
    if (data && !viewLocked) {
      if (data.length) initOrUpdateChart(data);
    } else if (viewLocked) {
      chart.current?.remove();
      chart.current = null;
    }
  }, [data, viewLocked]);

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
  }, [dataSeries, chartLines, setIsForecastOutdated]);

  return (
    <>
      <div className={cns('chart', viewLocked && 'chart--locked')}>
        <ForecastFilter
          legendActive={legendActive}
          setLegendActive={(x) => setLegendActive(x)}
          lastUpdate={lastUpdate}
          minutesToUpdate={minutesToUpdate}
        />

        <ForecastLegend active={legendActive} chartLines={chartLines} />

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
              {[1, 2, 1, 2].map((num, index) => (
                <div key={index} className="chart-watermark__col">
                  {[...Array(num)].map((_, i) => (
                    <Logo key={i} />
                  ))}
                </div>
              ))}
            </div>
            <div className="chart-legend-tw">
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
                <span className="chart__settings-circle" style={{ backgroundColor: '#F5840F' }} />
                Update
              </label>
            </div>
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

                    <div dangerouslySetInnerHTML={{ __html: t('forecastOutdated.text') }} />

                    <button className="btn fader__btn-min" onClick={() => setIsForceGraph(true)}>
                      {t('forecastOutdated.action')}
                    </button>
                  </div>
                </div>
              </>
            )}

            <BlockGraphPopup graphRef={containerRef?.current} pointX={blockPointX} />
          </div>
        )}

        <div className={cns('fader fader--chart', legendActive && 'fader--active')}></div>

        {viewLocked && <LockScreen sizeModifier="big" section={t('lock')} textModifier={'big'} />}

        {/* {loading && (
        <div className="chart__load">
          <Loader />
        </div>
      )} */}
      </div>
      <div className="chart__undertext">{t('under-text')}</div>
    </>
  );
};
