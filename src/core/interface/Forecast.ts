import { LineStyle, LineWidth, UTCTimestamp } from 'lightweight-charts';

export interface IGraphTickDto {
  real_close: number | null;
  real_high: number | null;
  real_low: number | null;
  real_open: number | null;
  forecast_low: number;
  forecast_high: number;
  forecast_trend: number;
  invisible_line?: number;
  is_forecast_start: boolean;
  timestamp: UTCTimestamp;
}

export interface IGraphKeyedDto {
  [id: string]: IGraphHistoryDto[];
}

export interface IGraphHistoryDto {
  forecast_low: number;
  forecast_high: number;
  forecast_trend: number;
  timestamp: UTCTimestamp;
}

export interface IIntervalDto {
  access_level: number;
  label: string;
  test_mode: boolean;
}

export interface ICoinDto {
  code: string;
  title: string;
  access_level: number;
  interval_list: IIntervalDto[];
}

export interface ISeriesData {
  id: string;
  displayName?: string;
  type: string;
  candleStyle?: {
    color: string;
    visible?: boolean;
  };
  lineStyle?: {
    color: string;
    lineWidth: LineWidth;
    visible?: boolean;
    lineStyle?: LineStyle;
    crosshairMarkerVisible?: boolean;
  };
  showChanges?: boolean;
  data: {
    time: UTCTimestamp;
    open?: number;
    close?: number;
    high?: number;
    low?: number;
    value?: number;
  }[];
}
