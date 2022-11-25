export interface IInvesting {
  invest_id: number;
  currency: string;
  currency_icon: string;
  currency_code: string;
  datetime: string;
}

export interface IInvestingGrafDto {
  time_list_forecast: { [key: string]: Date };
  trend_forecast: { [key: string]: number | null };
  price_btc: { [key: string]: number | null };
  up: { [key: string]: number | null };
  low: { [key: string]: number | null };
}
