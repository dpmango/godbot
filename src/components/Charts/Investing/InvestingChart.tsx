import { IGraphPoint, IGraphPointKeys, IInvestingGrafDto } from '@interface/Investor';
import dayjs from 'dayjs';
import {
  ColorType,
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
  LineStyle,
  LineWidth,
  UTCTimestamp,
} from 'lightweight-charts';

import { ThemeContext } from '@/App';

import { graphColors } from '../Forecast/Forecast';

interface IInvestingChartProps {
  id: number;
}

export const InvestingChart: React.FC<IInvestingChartProps> = ({ id }) => {
  const chart = useRef<IChartApi | null>(null);
  const [stats, setStats] = useState<{ min: number; max: number; length: number }>({
    min: 0,
    max: 0,
    length: 0,
  });
  const containerRef: any = useRef();
  const ctx = useContext(ThemeContext);

  const { t, i18n } = useTranslation('investing');
  const { t: tUnits } = useTranslation('units');

  // отображаемая статистика
  const displayStats = useMemo(() => {
    const months = Math.round(stats.length / 30);
    const plural = localizeKeys(months, 'month', tUnits);

    return [
      { label: t('info.min'), value: `$ ${formatPrice(stats.min)}` },
      { label: t('info.max'), value: `$ ${formatPrice(stats.max)}` },
      { label: t('info.time'), value: `${months} ${plural}` },
    ];
  }, [t, i18n.language, stats]);

  // Main function
  const fetchGraphAndCreate = async () => {
    const { data }: { data: Array<IGraphPoint> | null } = await api(`get_invest_graph/${id}`, {});

    if (!data) return;

    const convertDataForLines = (data: Array<IGraphPoint>, key: IGraphPointKeys) => {
      const convertedData = data
        .map((item: IGraphPoint) => {
          const timeValue = item.timestamp;
          let mask = 'YYYY-MM-DD';
          if (timeValue.length > 10) {
            // 2023-03-31T00:00:00Z
            mask = 'YYYY-MM-DD HH:mm:ss';
          }

          // 2023-03-31T00:00:00Z
          const timeUnix = dayjs.utc(timeValue).unix();

          return {
            time: timeToTz((timeUnix * 1000) as UTCTimestamp),
            value: Number(item[key] || 0),
          };
        })
        .filter((x) => x.value)
        .sort((a, b) => a.time - b.time);

      return convertedData;
    };

    const investDataMapped = convertDataForLines(data, 'forecast_trend');

    const [minValue, maxValue] = investDataMapped.reduce(
      (acc: Array<number>, cur: { value: number; time: UTCTimestamp }) => {
        return [Math.min(cur.value, acc[0]), Math.max(cur.value, acc[1])];
      },
      [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
    );

    setStats({
      min: minValue,
      max: maxValue,
      length: investDataMapped.length,
    });

    const seriesData = [
      {
        name: 'Trend Forecast',
        type: 'line',
        lineStyle: {
          color: '#4F9E7D',
          lineWidth: 2 as LineWidth,
        },
        data: investDataMapped,
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
        data: convertDataForLines(data, 'forecast_high'),
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
        data: convertDataForLines(data, 'forecast_low'),
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
        data: convertDataForLines(data, 'real_close'),
      },
    ];

    if (!chart.current) {
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
      seriesData.forEach((series) => {
        const lineSeries = chartInstance.addLineSeries({
          lastValueVisible: false,
          priceLineVisible: false,
          ...series.lineStyle,
        });

        lineSeries.setData(series.data);
      });

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

  return (
    <>
      <div data-id={id} ref={containerRef} style={{ height: 140 }} />

      <ul className="investing__info">
        {displayStats.map((stat, idx) => (
          <li key={idx}>
            {stat.label}: <strong>{stat.value}</strong>
          </li>
        ))}
      </ul>
    </>
  );
};
