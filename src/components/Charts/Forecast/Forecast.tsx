import { useEffect, useRef, useState, useContext, useCallback, useLayoutEffect } from 'react';
import {
  createChart,
  ColorType,
  LineStyle,
  LineWidth,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
  SeriesMarkerPosition,
  SeriesMarkerShape,
  SeriesMarker,
  Time,
} from 'lightweight-charts';
import xorBy from 'lodash/xorBy';
import { useTranslation } from 'react-i18next';

import { ThemeContext } from '@/App';
import { useAppSelector } from '@store';
import { timeToTz, formatPrice, formatUnixDate, getRandomInt } from '@utils';
import { IForecastTick } from '@/core/interface/Forecast';

import { Logo } from '@c/Layout/Atom';
import { ForecastLegend } from '@c/Charts';
import { Loader } from '@ui/Loader';

interface IChartLines {
  id: string;
  instance: ISeriesApi<'Line'>;
}

interface ISeriesData {
  time: UTCTimestamp;
  value: number;
}

export const Forecast: React.FC<{}> = () => {
  const { data, currentCoin } = useAppSelector((state) => state.forecastState);
  const [loading, setLoading] = useState<boolean>(true);
  const chart = useRef<IChartApi | null>(null);
  const [series, setSeries] = useState<any>([]);
  const [chartLines, setChartLines] = useState<IChartLines[]>([]);

  const containerRef: any = useRef();
  const tooltipRef: any = useRef();
  const ctx = useContext(ThemeContext);

  const { t } = useTranslation('forecast');

  const colors: string[] = ['#0F701E', '#CD1D15', '#3DAB8E', '#966ADB'];

  const initOrUpdateChart = (coinData: IForecastTick[]) => {
    const coinDataMapped = coinData
      .map((x) => ({
        ...x,
        timestamp: timeToTz(x.timestamp),
      }))
      .reverse();

    const currentSeries = [
      {
        name: 'Real',
        type: 'line',
        lineStyle: {
          color: colors[0],
          lineWidth: 3 as LineWidth,
        },
        data: coinDataMapped
          .map((x: IForecastTick) => {
            return {
              time: x.timestamp,
              value: x.real || 0,
            };
          })
          .filter((x) => x.value),
      },
      {
        name: 'Forecast',
        type: 'line',
        lineStyle: {
          color: colors[1],
          lineWidth: 3 as LineWidth,
        },
        showChanges: true,
        data: coinDataMapped
          .map((x: IForecastTick, idx) => {
            return {
              time: x.timestamp,
              // value: idx >= 180 ? getRandomInt(16000, 17000) : x.forecast,
              value: x.forecast,
            };
          })
          .filter((x) => x.value),
      },
      {
        name: 'Upper',
        type: 'line',
        lineStyle: {
          color: colors[2],
          lineWidth: 1 as LineWidth,
          lineStyle: LineStyle.Dashed,
          crosshairMarkerVisible: false,
        },
        data: coinDataMapped
          .map((x: IForecastTick) => {
            return {
              time: x.timestamp,
              value: x.upper,
            };
          })
          .filter((x) => x.value),
      },
      {
        name: 'Lower',
        type: 'line',
        lineStyle: {
          color: colors[3],
          lineWidth: 1 as LineWidth,
          lineStyle: LineStyle.Dashed,
          crosshairMarkerVisible: false,
        },
        data: coinDataMapped
          .map((x: IForecastTick) => {
            return {
              time: x.timestamp,
              value: x.lower,
            };
          })
          .filter((x) => x.value),
      },
    ];

    // watch changes in data
    let forecastChanges: ISeriesData[] = [];
    if (series.length && currentSeries[1].data) {
      forecastChanges = xorBy(series[1].data, currentSeries[1].data, 'value');
    }

    setSeries(currentSeries);

    // create or update chart
    if (!chart.current) {
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
          background: { type: ColorType.Solid, color: !ctx?.theme ? 'white' : '#1C2326' },
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
          fixLeftEdge: true,
          fixRightEdge: true,
          borderVisible: false,
          timeVisible: true,
          secondsVisible: false,
        },
        localization: {
          priceFormatter: (price: number) => {
            // const thousands = Math.round(p / 100).toString();
            // return `${thousands.slice(0, 2)}.${thousands.slice(2, 3)}к`;
            return formatPrice(price);
          },
        },
      });

      chart.current = chartInstance;

      let newChartLines: IChartLines[] = [];
      currentSeries.forEach((s, idx) => {
        const lineSeries = chartInstance.addLineSeries({
          lastValueVisible: false,
          priceLineVisible: false,
          ...s.lineStyle,
        });

        lineSeries.setData(s.data);

        newChartLines.push({
          id: s.name,
          instance: lineSeries,
        });
      });

      setChartLines([...newChartLines]);

      chartInstance.timeScale().fitContent();

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
          const price = param.seriesPrices.get(ser.instance);
          if (!price) return;
          const seriesData = currentSeries[idx];

          pricesHtml += `
            <div class="chart-info__pricedata">
              <i style="background: ${colors[idx]}"></i> 
              <p>${seriesData.name}:</p>&nbsp;${formatPrice(price as number)}
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
    } else {
      // update data
      chartLines.forEach((lineSeries, idx) => {
        lineSeries.instance.setData(currentSeries[idx].data);

        if (series[idx].showChanges) {
          let markers: SeriesMarker<Time>[] = [];
          forecastChanges.forEach((x) => {
            markers.push({
              id: 'update',
              time: x.time,
              position: 'belowBar' as SeriesMarkerPosition,
              color: '#f68410',
              shape: 'circle' as SeriesMarkerShape,
              text: 'Update',
            });
          });

          lineSeries.instance.setMarkers(markers);
        }
      });
    }

    setLoading(false);

    return () => {
      chart?.current?.remove();
    };
  };

  const changeTheme = () => {
    if (ctx?.theme) {
      // dark theme
      chart?.current?.applyOptions({
        layout: {
          textColor: '#FFFFFF',
          background: { color: '#1C2326' },
        },
        grid: {
          horzLines: { color: '#5F636A' },
        },
      });
    } else {
      // white theme
      chart?.current?.applyOptions({
        layout: {
          textColor: '#262628',
          background: { color: 'white' },
        },
        grid: {
          horzLines: { color: '#AFCDEB' },
        },
      });
    }
  };

  useEffect(() => {
    if (data && currentCoin) {
      const coinData = data?.[currentCoin];
      if (coinData) initOrUpdateChart(coinData);
    }
  }, [currentCoin, data]);

  useEffect(() => {
    changeTheme();
  }, [ctx?.theme]);

  useLayoutEffect(() => {
    const handleResize = () => {
      chart?.current?.applyOptions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChangeSeries = (title: string, disabled: boolean) => {
    const targetLine = chartLines.find((x) => x.id === title);

    if (targetLine) {
      targetLine.instance.applyOptions({
        visible: !disabled,
      });
    }
  };

  return (
    <>
      <ForecastLegend colors={colors} data={series} handleToggle={handleChangeSeries} />

      <div
        ref={containerRef}
        className="chart-container"
        style={{
          opacity: loading ? '0' : '1',
        }}>
        <div className="chart-info" ref={tooltipRef}></div>
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

      {loading && (
        <div className="chart__load">
          <Loader />
        </div>
      )}
    </>
  );
};
