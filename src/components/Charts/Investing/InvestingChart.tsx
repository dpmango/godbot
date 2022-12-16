import { FC, useEffect, useRef, useState, useLayoutEffect, useContext } from 'react';
import {
  createChart,
  ColorType,
  LineStyle,
  LineWidth,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from 'lightweight-charts';
import dayjs from 'dayjs';

import { ThemeContext } from '@/App';
import { timeToTz, formatPrice } from '@utils';
import { IInvestingGrafDto } from '@core/interface/Investor';
import { api } from '@core';
import { time } from 'console';

interface IInvestingChartProps {
  id: number;
}

export const InvestingChart: FC<IInvestingChartProps> = ({ id }) => {
  const chart = useRef<IChartApi | null>(null);

  const containerRef: any = useRef();
  const ctx = useContext(ThemeContext);

  const fetchGraphAndCreate = async () => {
    const { raw: data }: Partial<{ raw: IInvestingGrafDto }> = await api(
      `get_invest_graph/${id}`,
      {}
    );

    if (!data) return;

    const investDataMapped = Object.keys(data.time_list_forecast).map((key) => {
      const timeValue = data.time_list_forecast[key];
      let mask = 'YYYY-MM-DD';
      if (timeValue.length > 10) {
        mask = 'YYYY-MM-DD HH:mm:ss';
      }

      const timeUnix = dayjs(timeValue, mask, true).unix() as UTCTimestamp;

      return {
        time: timeToTz((timeUnix * 1000) as UTCTimestamp),
        value: data['trend_forecast'][key] || 0,
      };
    });

    const seriesData = {
      name: 'Trend Forecast',
      type: 'line',
      lineStyle: {
        color: '#4F9E7D',
        lineWidth: 2 as LineWidth,
      },
      data: investDataMapped,
    };

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
          fontSize: 8,
          fontFamily: 'GilroyWeb, sans-serif',
          background: { color: 'transparent' },
        },
        grid: {
          vertLines: { color: !ctx?.theme ? '#AFCDEB' : '#5F636A', style: LineStyle.Dashed },
          horzLines: { color: !ctx?.theme ? '#AFCDEB' : '#5F636A', style: LineStyle.Dashed },
        },
        crosshair: {
          mode: CrosshairMode.Magnet,
        },
        timeScale: {
          fixLeftEdge: true,
          fixRightEdge: true,
          borderVisible: false,
          timeVisible: false,
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
      const lineSeries = chartInstance.addLineSeries({
        lastValueVisible: false,
        priceLineVisible: false,
        ...seriesData.lineStyle,
      });
      lineSeries.setData(seriesData.data);

      chartInstance.timeScale().fitContent();
    }
  };

  useEffect(() => {
    fetchGraphAndCreate();
  }, [id]);

  // theme
  const changeTheme = () => {
    if (ctx?.theme) {
      // dark theme
      chart?.current?.applyOptions({
        layout: {
          textColor: '#FFFFFF',
        },
        grid: {
          vertLines: { color: '#5F636A' },
          horzLines: { color: '#5F636A' },
        },
      });
    } else {
      // white theme
      chart?.current?.applyOptions({
        layout: {
          textColor: '#262628',
        },
        grid: {
          vertLines: { color: '#AFCDEB' },
          horzLines: { color: '#AFCDEB' },
        },
      });
    }
  };

  useEffect(() => {
    changeTheme();
  }, [ctx?.theme]);

  // resize
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

  return <div data-id={id} ref={containerRef} style={{ height: 140 }} />;
};
