export interface IInvesting {
  access_level: number;
  invest_id: number;
  currency: string;
  currency_icon: string;
  currency_code: string;
  datetime: string;
  isPlaceholder?: boolean;
  direction: '' | 'SHORT' | 'LONG';
}

export interface IInvestingGrafDto {
  time_list_forecast: { [key: string]: string };
  trend_forecast: { [key: string]: number | null };
  price_btc: { [key: string]: number | null };
  up: { [key: string]: number | null };
  low: { [key: string]: number | null };
}

export interface IGraphPoint {
  forecast_high: number | null;
  forecast_low: number | null;
  forecast_trend: number | null;
  is_forecast_start: number | null;
  real_close: number | null;
  real_high: number | null;
  real_low: number | null;
  real_open: number | null;
  timestamp: string;
}
export type IGraphPointKeys = keyof IGraphPoint;
