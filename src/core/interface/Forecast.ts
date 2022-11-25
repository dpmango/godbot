import { UTCTimestamp } from 'lightweight-charts';

export interface IForecastTick {
  real: number | null;
  lower: number;
  upper: number;
  forecast: number;
  timestamp: UTCTimestamp;
}
