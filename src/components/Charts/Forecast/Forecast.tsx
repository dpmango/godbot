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
} from 'lightweight-charts';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
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

export interface IChartLines {
  id: string;
  name: string;
  instance: ISeriesApi<'Line'> | ISeriesApi<'Candlestick'>;
}

export const Forecast: React.FC<{}> = () => {
  // внутренние стейты
  const [loading, setLoading] = useState<boolean>(true);
  const [legendActive, setLegendActive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const chart = useRef<IChartApi | null>(null);
  const [dataSeries, setSeries] = useState<any>([]);
  const [chartLines, setChartLines] = useState<IChartLines[]>([]);
  const [scrollRange, setScrollRange] = useState<LogicalRange>();
  const debouncedRange = useDebounce<LogicalRange | undefined>(scrollRange, 500);

  // стор
  const {
    data,
    dataNav,
    currentCoin,
    currentTime,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation('forecast');

  const colors: string[] = ['#0F701E', '#0F701E', '#CD1D15', '#3DAB8E', '#966ADB'];
  const paginatePer = 200;
  const viewLocked = !tariffActive;

  // data: {
  //   time: UTCTimestamp;
  //   value: number;
  // }[],
  // series: ISeriesApi<'Line'>

  // основная функция отрисовки TW
  const initOrUpdateChart = (coinData: IGraphTickDto[]) => {
    // подготовка (маппинг) данных
    const PERF_TIME_SERIES = performance.now();
    const currentSeries = [
      {
        id: 'RealCandle',
        displayName: 'Real (candle)',
        type: 'candle',
        candleStyle: {
          color: colors[0],
          visible: false,
        },
        data: coinData
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
      },
      {
        id: 'RealLine',
        displayName: 'Real (line)',
        type: 'line',
        lineStyle: {
          color: colors[0],
          lineWidth: 3 as LineWidth,
          visible: true,
        },
        data: coinData
          .map((x: IGraphTickDto) => {
            return {
              time: x.timestamp,
              value: x.real_open || 0,
            };
          })
          .filter((x) => x.value),
      },
      {
        id: 'Forecast',
        type: 'line',
        lineStyle: {
          color: colors[2],
          lineWidth: 3 as LineWidth,
        },
        showChanges: true,
        data: coinData
          .map((x: IGraphTickDto, idx) => {
            return {
              time: x.timestamp,
              // value: idx >= 180 ? getRandomInt(16000, 17000) : x.forecast,
              value: x.forecast_trend,
            };
          })
          .filter((x) => x.value),
      },
      {
        id: 'Upper',
        type: 'line',
        lineStyle: {
          color: colors[3],
          lineWidth: 1 as LineWidth,
          lineStyle: LineStyle.Dashed,
          crosshairMarkerVisible: false,
        },
        data: coinData
          .map((x: IGraphTickDto) => {
            return {
              time: x.timestamp,
              value: x.forecast_high,
            };
          })
          .filter((x) => x.value),
      },
      {
        id: 'Lower',
        type: 'line',
        lineStyle: {
          color: colors[4],
          lineWidth: 1 as LineWidth,
          lineStyle: LineStyle.Dashed,
          crosshairMarkerVisible: false,
        },
        data: coinData
          .map((x: IGraphTickDto) => {
            return {
              time: x.timestamp,
              value: x.forecast_low,
            };
          })
          .filter((x) => x.value),
      },
    ];

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
          scaleMargins: { bottom: 0.1, top: 0.2 },
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
          // fixLeftEdge: true,
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

          newChartLines.push({
            id: s.id,
            name: s.displayName || s.id,
            instance: lineSeriesInstance,
          });
        }
      });

      setChartLines([...newChartLines]);

      // навигация по графику
      const lastTick = coinData[coinData.length - 1].timestamp;

      let timeDisplay = 12;
      if (currentTime === '1m') {
        timeDisplay = 3;
      }

      const last = dayjs(utcToZonedTime(lastTick * 1000, 'Etc/UTC'));
      const from = last.subtract(timeDisplay, 'hour');

      chartInstance.timeScale().setVisibleRange({
        from: timeToTz((from.unix() * 1000) as UTCTimestamp),
        to: timeToTz((last.unix() * 1000) as UTCTimestamp),
      });

      chartInstance.timeScale().subscribeVisibleLogicalRangeChange((range) => {
        if (!range) return;

        setScrollRange(range);
      });

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

        tooltipRef.current.style.display = 'block';

        // build tooltip html

        const dateStr = formatUnixDate(param.time as UTCTimestamp);
        let pricesHtml = '';
        newChartLines.forEach((ser, idx) => {
          let price = param.seriesPrices.get(ser.instance);
          if (typeof price === 'object') {
            price = price.close;
          }

          if (!price) return;
          const seriesData = currentSeries[idx];

          let displayName = seriesData.id;
          if (seriesData.id === 'RealCandle') {
            return false;
          } else if (seriesData.id === 'RealLine') {
            displayName = 'Real';
          }

          pricesHtml += `
            <div class="chart-info__pricedata">
              <i style="background: ${colors[idx]}"></i> 
              <p>${displayName}:</p>&nbsp;${formatPrice(price as number)}
            </div>`;
        });

        let markersHtml = '';

        // show markers data
        if (param.hoveredMarkerId) {
          if (param.hoveredMarkerId === 'update') {
            markersHtml += `<div class="chart-info__marker">
              <i style="background: #f68410"></i> 
              <span>${t('marker.changes')}</span>
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

        // if (series[idx].showChanges) {
        //   let markers: SeriesMarker<Time>[] = [];
        //   forecastChanges.forEach((x) => {
        //     markers.push({
        //       id: 'update',
        //       time: x.time,
        //       position: 'belowBar' as SeriesMarkerPosition,
        //       color: '#f68410',
        //       shape: 'circle' as SeriesMarkerShape,
        //       text: 'Update',
        //     });
        //   });

        //   lineSeries.instance.setMarkers(markers);
        // }
      });
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

      if (y && x) {
        pulseRef.current.style.display = 'block';
        pulseRef.current.style.top = y - 4 + 'px';
        pulseRef.current.style.left = x + 54 - 4 + 'px';
      }
    } else {
      if (pulseRef.current) {
        pulseRef.current.style.display = 'none';
      }
    }
  }, [dataSeries, chartLines, scrollRange]);

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
      timerConfirm.current = setInterval(requestChart, updateIntervalMin * 60 * 1000);
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

  useEffect(() => {
    if (debouncedRange && debouncedRange.from < 0) {
      requestPagination(debouncedRange);
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

  return (
    <div className={cns('chart', viewLocked && 'chart--locked')}>
      <ForecastFilter
        legendActive={legendActive}
        setLegendActive={(x) => setLegendActive(x)}
        lastUpdate={lastUpdate}
      />

      <ForecastLegend active={legendActive} chartLines={chartLines} />

      {!viewLocked ? (
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
            {[0, 1, 2, 3].map((x) => (
              <>
                <div className="chart-watermark__col">
                  <Logo />
                </div>
                <div className="chart-watermark__col">
                  <Logo />
                  <Logo />
                </div>
              </>
            ))}
          </div>
        </div>
      ) : (
        <img style={{ minHeight: 200 }} src="/img/temp/chart.png" width="100%" alt="" />
      )}

      <div className={cns('fader fader--chart', legendActive && 'fader--active')}></div>

      {viewLocked && <LockScreen section={t('lock')} textModifier={'big'} />}

      {/* {loading && (
        <div className="chart__load">
          <Loader />
        </div>
      )} */}
    </div>
  );
};
