import { UTCTimestamp } from 'lightweight-charts';

export interface IChartTick {
  real: number | null;
  lower: number;
  upper: number;
  forecast: number;
  timestamp: UTCTimestamp;
}
