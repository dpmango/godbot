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
} from 'lightweight-charts';
import { useTranslation } from 'react-i18next';

import cns from 'classnames';
import dayjs from 'dayjs';
import { utcToZonedTime } from 'date-fns-tz';

import { ThemeContext } from '@/App';
import { useProfile, useDebounce, useChart } from '@hooks';
import { getChart, getCoins } from '@store';
import { useAppSelector, useAppDispatch } from '@core';
import { timeToTz, formatPrice, formatUnixDate, formatDate, LOG, PerformanceLog } from '@utils';

import { IGraphTickDto } from '@/core/interface/Forecast';

import { Logo } from '@c/Layout/Header';

export interface IChartLines {
  id: string;
  name: string;
  showChanges: boolean;
  instance: ISeriesApi<'Line'> | ISeriesApi<'Candlestick'>;
}

export const ForecastSimulator: React.FC<{}> = () => {
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
  const { tariffActive } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  // рефы
  const containerRef: any = useRef();
  const tooltipRef: any = useRef();

  const { allowedFunctions } = useProfile();
  const { t } = useTranslation('forecast');

  // Хук с утилитами (data-blind)
  const {
    theme,
    graphColors,

    createSeriesData,
    createChartLines,
    createUpdateMarkers,
    setTooltipOnCrosshairMove,
  } = useChart({
    chart,
    containerRef,
    tooltipRef,
  });

  const colors: string[] = ['#2962FF', '#2962FF', '#CD1D15', '#3DAB8E', '#966ADB'];
  const paginatePer = 200;
  const viewLocked = !tariffActive;

  // основная функция отрисовки TW
  const initOrUpdateChart = (coinData: IGraphTickDto[]) => {
    // подготовка (маппинг) данных
    const PERF_TIME_SERIES = performance.now();

    // Создание данных по ответу forecast (указываются id для отрисовки)
    const currentSeries = createSeriesData(coinData, ['RealLine', 'Forecast']);

    // точки обновленный прогноза
    const updateDates = coinData.filter((x) => x.is_forecast_start).map((x) => x.timestamp);
    let updateMarkers = createUpdateMarkers(updateDates);

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
          // scaleMargins: { bottom: 0.1, top: 0.2 },
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
          textColor: !theme ? '#262628' : '#FFFFFF',
          fontSize: window.innerWidth < 576 ? 9 : 12,
          fontFamily: 'GilroyWeb, sans-serif',
          background: { color: 'transparent' },
        },
        grid: {
          vertLines: { visible: false },
          horzLines: { color: !theme ? '#AFCDEB' : '#5F636A', style: LineStyle.Dashed },
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
      let newChartLines = createChartLines({ chart: chartInstance, updateMarkers, currentSeries });
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

      PerformanceLog(PERF_TIME, 'updating chart series');
    }

    setLoading(false);

    return () => {
      chart.current?.remove();
    };
  };

  // инициализация запросов
  const timerConfirm: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    let updateIntervalMin = 1;
    if (currentTime === '15m') {
      updateIntervalMin = 1;
    }

    const requestChart = async () => {
      if (currentCoin && currentTime) {
        dispatch(getChart({ page: 10, per: paginatePer }));
      }
    };

    if (allowedFunctions.forecast) {
      requestChart();
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
      <div
        ref={containerRef}
        className="chart-container"
        style={{
          opacity: loading ? '0' : '1',
        }}>
        <div className="chart-info" ref={tooltipRef} />
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
  );
};
