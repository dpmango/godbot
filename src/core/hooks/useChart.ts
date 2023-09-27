import {
  ChartOptions,
  CrosshairMode,
  DeepPartial,
  IChartApi,
  LineStyle,
  LineWidth,
  MouseEventParams,
  PriceFormat,
  SeriesMarker,
  SeriesMarkerPosition,
  SeriesMarkerShape,
  Time,
  UTCTimestamp,
} from 'lightweight-charts';

import { ThemeContext } from '@/App';
import { IChartLines } from '@/components/Charts/Forecast/Forecast';
import {
  IGraphHistoryDto,
  IGraphKeyedDto,
  IGraphTickDto,
  ISeriesData,
} from '@/core/interface/Forecast';

interface IUseChartProps {
  chart: React.MutableRefObject<IChartApi | null>;
  containerRef: React.MutableRefObject<any>;
  tooltipRef: React.MutableRefObject<HTMLElement | null>;
}

export function useChart({ chart, containerRef, tooltipRef }: IUseChartProps) {
  const graphColors: string[] = ['#2962FF', '#2962FF', '#CD1D15', '#3DAB8E', '#966ADB'];
  const graphColorInvisible = '#00000000';

  const { t } = useTranslation('forecast');
  const ctx = useContext(ThemeContext);

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

  const handleResize = useCallback(() => {
    chart.current?.applyOptions({
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });
  }, [containerRef.current, chart.current]);

  // ресайз
  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // дефолт опции
  const getChartDefaults = (
    ref: any,
    overideParams?: DeepPartial<ChartOptions>
  ): DeepPartial<ChartOptions> => {
    return {
      width: ref?.clientWidth,
      height: ref?.clientHeight,
      leftPriceScale: {
        visible: true,
        borderVisible: false,
        scaleMargins: { bottom: 0, top: 0 },
      },
      rightPriceScale: {
        visible: false,
      },
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
        fixRightEdge: true,
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
      },
      localization: {
        priceFormatter: (price: number) => formatPrice(price),
      },
      ...overideParams,
    };
  };

  // опциональные функции
  // точки обновленный прогноза
  const createUpdateMarkers = (updateDates: UTCTimestamp[]) => {
    const updateMarkers: SeriesMarker<Time>[] = [];
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

    return updateMarkers;
  };

  // Создание и маппинг данных
  const createSeriesData = (
    coinData: IGraphTickDto[],
    whitelist: string[],
    historyData?: IGraphKeyedDto,
    showHistory = false
  ) => {
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
      Invisible: coinData
        .map((x: IGraphTickDto) => {
          return {
            time: x.timestamp,
            value: x.invisible_line,
          };
        })
        .filter((x) => x.value),
    };

    // Test: симулировать неактуальные forecast данные для последней точки
    //const realLineTime = chartsData.RealLine[chartsData.RealLine.length - 1].time;
    //chartsData.Forecast = chartsData.Forecast.filter(({ time }) => time < realLineTime);

    const series = [] as ISeriesData[];
    whitelist.forEach((key) => {
      if (key === 'RealCandle') {
        series.push({
          id: 'RealCandle',
          displayName: 'Real (candle)',
          type: 'candle',
          candleStyle: {
            color: graphColors[0],
            visible: false,
          },
          data: chartsData.RealCandle,
        });
      } else if (key === 'RealLine') {
        series.push({
          id: 'RealLine',
          displayName: 'Real (line)',
          type: 'line',
          lineStyle: {
            color: graphColors[0],
            lineWidth: 3 as LineWidth,
            visible: true,
          },
          data: chartsData.RealLine,
        });
      } else if (key === 'Forecast') {
        series.push({
          id: 'Forecast',
          type: 'line',
          lineStyle: {
            color: graphColors[2],
            lineWidth: 3 as LineWidth,
          },
          showChanges: true,
          data: chartsData.Forecast,
        });
      } else if (key === 'Upper') {
        series.push({
          id: 'Upper',
          type: 'line',
          lineStyle: {
            color: graphColors[3],
            lineWidth: 1 as LineWidth,
            lineStyle: LineStyle.Dashed,
            crosshairMarkerVisible: false,
          },
          data: chartsData.Upper,
        });
      } else if (key === 'Lower') {
        series.push({
          id: 'Lower',
          type: 'line',
          lineStyle: {
            color: graphColors[4],
            lineWidth: 1 as LineWidth,
            lineStyle: LineStyle.Dashed,
            crosshairMarkerVisible: false,
          },
          data: chartsData.Lower,
        });
      } else if (key === 'Invisible') {
        series.push({
          id: 'Invisible',
          type: 'line',
          lineStyle: {
            color: graphColorInvisible,
            lineWidth: 1 as LineWidth,
            lineStyle: LineStyle.Dashed,
            crosshairMarkerVisible: false,
          },
          data: chartsData.Invisible,
        });
      }

      if (historyData && Object.keys(historyData).length) {
        Object.keys(historyData).forEach((keyHistory) => {
          if (key === 'History') {
            series.push({
              id: `History_${keyHistory}`,
              displayName: `History_${keyHistory}`,
              type: 'line',
              lineStyle: {
                color: graphColors[2],
                lineWidth: 2 as LineWidth,
                lineStyle: LineStyle.Dashed,
                visible: showHistory,
              },
              data: historyData[keyHistory]
                .map((x: IGraphHistoryDto) => {
                  return {
                    time: x.timestamp,
                    value: x.forecast_trend,
                  };
                })
                .filter((x) => x.value),
            });
          }
          // else if (key === 'HistoryUpper') {
          //   series.push({
          //     id: `HistoryUpper_${keyHistory}`,
          //     displayName: `HistoryUpper_${keyHistory}`,
          //     type: 'line',
          //     lineStyle: {
          //       color: graphColors[3],
          //       lineWidth: 1 as LineWidth,
          //       lineStyle: LineStyle.Dashed,
          //       visible: false,
          //       crosshairMarkerVisible: false,
          //     },
          //     data: historyData[keyHistory]
          //       .map((x: IGraphHistoryDto) => {
          //         return {
          //           time: x.timestamp,
          //           value: x.forecast_high,
          //         };
          //       })
          //       .filter((x) => x.value),
          //   });
          // } else if (key === 'HistoryLower') {
          //   series.push({
          //     id: `HistoryLower_${keyHistory}`,
          //     displayName: `HistoryLower_${keyHistory}`,
          //     type: 'line',
          //     lineStyle: {
          //       color: graphColors[4],
          //       lineWidth: 1 as LineWidth,
          //       lineStyle: LineStyle.Dashed,
          //       visible: false,
          //       crosshairMarkerVisible: false,
          //     },
          //     data: historyData[keyHistory]
          //       .map((x: IGraphHistoryDto) => {
          //         return {
          //           time: x.timestamp,
          //           value: x.forecast_low,
          //         };
          //       })
          //       .filter((x) => x.value),
          //   });
          // }
        });
      }
    });

    return series;
  };

  // отрисовка Series Types
  // https://tradingview.github.io/lightweight-charts/docs/series-types
  const createChartLines = ({
    chart,
    currentSeries,
    updateMarkers,
  }: {
    chart: IChartApi;
    currentSeries: any[];
    updateMarkers: SeriesMarker<Time>[];
  }) => {
    const newChartLines: IChartLines[] = [];

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
        lineSeriesInstance = chart.addLineSeries({
          ...sharedSeriesOptions,
          ...s.lineStyle,
        });
      } else if (s.type === 'candle') {
        lineSeriesInstance = chart.addCandlestickSeries({
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

    return newChartLines;
  };

  // Тултипы (подписка при инициализации графика)
  const setTooltipOnCrosshairMove = ({
    param,
    setCrosshair,
    newChartLines,
    currentSeries,
  }: {
    param: MouseEventParams;
    setCrosshair?: (p: MouseEventParams) => void;
    newChartLines: IChartLines[];
    currentSeries: { id: NamedCurve }[];
  }) => {
    const container = containerRef.current;
    const toolTip = tooltipRef.current;

    if (!tooltipRef.current || !toolTip) return;

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
    setCrosshair && setCrosshair(param);

    // build tooltip html

    const dateStr = formatUnixDate(param.time as UTCTimestamp);
    let pricesHtml = '';
    newChartLines.forEach((ser, idx) => {
      const isVisible = ser.instance.options().visible;
      if (!isVisible) return;

      const priceInstance = param.seriesData.get(ser.instance) as {
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
      let color = graphColors[idx];
      if (
        ['Invisible', 'RealCandle', 'HistoryUpper', 'HistoryLower'].some((k) =>
          seriesData.id.startsWith(k)
        )
      ) {
        return false;
      } else if (seriesData.id === 'RealLine') {
        displayName = 'Real';
      } else if (seriesData.id.startsWith('History')) {
        displayName = 'History';
        color = graphColors[2];
      }

      // @ts-ignore
      pricesHtml += `
        <div class="chart-info__pricedata">
          <i style="background: ${color}"></i>
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
  };

  return {
    graphColors,
    theme: ctx?.theme,

    handleResize,
    getChartDefaults,
    createSeriesData,
    createChartLines,
    createUpdateMarkers,
    setTooltipOnCrosshairMove,
  };
}
