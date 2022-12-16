import { UTCTimestamp } from 'lightweight-charts';

export interface IGraphTickDto {
  real_close: number | null;
  real_high: number | null;
  real_low: number | null;
  real_open: number | null;
  forecast_low: number;
  forecast_high: number;
  forecast_trend: number;
  timestamp: UTCTimestamp;
}

export interface IIntervalDto {
  access_level: number;
  label: string;
}

export interface ICoinDto {
  code: string;
  title: string;
  access_level: number;
  interval_list: IIntervalDto[];
}
