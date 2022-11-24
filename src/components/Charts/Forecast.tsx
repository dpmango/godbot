import { useEffect, useRef, useState, useContext, useCallback, useLayoutEffect } from 'react';
import {
  createChart,
  ColorType,
  LineStyle,
  LineWidth,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
} from 'lightweight-charts';
import { ThemeContext } from '@/App';
import { useAppSelector } from '@store';
import { timeToTz, formatPrice } from '@utils';
import { IChartTick } from '@core/interface/Chart';

import { ChartLegend } from '@c/Charts/ChartLegend';
import { Loader } from '@ui/Loader';

interface IChartLines {
  id: string;
  instance: ISeriesApi<'Line'>;
}

export const Forecast: React.FC<{}> = () => {
  const { data, currentCoin } = useAppSelector((state) => state.chartState);
  const [loading, setLoading] = useState<boolean>(true);
  const chart = useRef<IChartApi | null>(null);
  const [chartLines, setChartLines] = useState<IChartLines[]>([]);
  const [series, setSeries] = useState<any>([]);
  const [colors, setColors] = useState<any>([]);

  const containerRef: any = useRef();
  const tooltipRef: any = useRef();
  const ctx = useContext(ThemeContext);

  const initChart = (coinData: IChartTick[]) => {
    const color: string[] = ['#3182bd', '#1c9099', '#43a2ca', '#9ebcda'];

    const coinDataMapped = coinData
      .map((x) => ({
        ...x,
        timestamp: timeToTz(
          x.timestamp,
          Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Moscow'
        ),
      }))
      .reverse();

    const series = [
      {
        name: 'Real',
        type: 'line',
        lineStyle: {
          color: color[0],
          lineWidth: 2 as LineWidth,
        },
        data: coinDataMapped
          .map((x: IChartTick) => {
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
          color: color[1],
          lineWidth: 2 as LineWidth,
        },
        data: coinDataMapped
          .map((x: IChartTick) => {
            return {
              time: x.timestamp,
              value: x.forecast,
            };
          })
          .filter((x) => x.value),
      },
      {
        name: 'Upper',
        type: 'line',
        lineStyle: {
          color: color[2],
          lineWidth: 1 as LineWidth,
          lineStyle: LineStyle.Dashed,
        },
        data: coinDataMapped
          .map((x: IChartTick) => {
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
          color: color[3],
          lineWidth: 1 as LineWidth,
          lineStyle: LineStyle.Dashed,
        },
        data: coinDataMapped
          .map((x: IChartTick) => {
            return {
              time: x.timestamp,
              value: x.lower,
            };
          })
          .filter((x) => x.value),
      },
    ];

    setSeries(series);
    setColors(color);

    // graph?.setOption(option);

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
            return formatPrice(price, 0);
          },
        },
      });

      chart.current = chartInstance;

      let newSeries: IChartLines[] = [];
      series.forEach((series, idx) => {
        const lineSeries = chartInstance.addLineSeries(series.lineStyle);
        lineSeries.setData(series.data);

        newSeries.push({
          id: series.name,
          instance: lineSeries,
        });
      });

      setChartLines([...newSeries]);

      chartInstance.timeScale().fitContent();

      // chartInstance.subscribeCrosshairMove((param) => {
      //   if (param.point === undefined || !param.time || param.point.x < 0 || param.point.y < 0) {
      //     tooltipRef.current.style.display = 'none';
      //   } else {
      //     // const dateStr = dateToString(param.time);
      //     tooltipRef.current.style.display = 'block';
      //     // const price = param.seriesPrices.get(chartInstance.series);
      //     // tooltipRef.current.innerHTML = `<div>${price.toFixed(2)}</div>`;
      //     //           `<div><i style="background: ${elem.color}"></i> <p>${elem.seriesName}:</p>  ${
      //     //             elem?.data?.toFixed(2) || '-'
      //     //           }</div>`
      //     // Position tooltipRef according to mouse cursor position
      //     tooltipRef.current.style.left = param.point.x + 'px';
      //     tooltipRef.current.style.top = param.point.y + 'px';
      //   }
      // });
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
      if (coinData) initChart(coinData);
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
    const targetSeries = series.find((x: any) => x.name === title);

    if (targetLine && targetSeries) {
      if (!disabled) {
        targetLine.instance.applyOptions({
          color: targetSeries.lineStyle.color,
        });
      } else {
        targetLine.instance.applyOptions({
          color: 'transparent',
        });
      }
    }
  };

  return (
    <>
      <ChartLegend colors={colors} data={series} handleToggle={handleChangeSeries} />

      <div
        ref={containerRef}
        className="chart-container"
        style={{
          opacity: loading ? '0' : '1',
        }}
      />

      {/* <div className="chart-info" ref={tooltipRef}></div> */}

      {loading && (
        <div className="chart__load">
          <Loader />
        </div>
      )}
    </>
  );
};
