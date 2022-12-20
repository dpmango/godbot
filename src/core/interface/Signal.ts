export interface ISignal {
  date: Date | string;
  currency: string;
  currency_icon: string;
  currency_code: string;
  stop_loss?: number;
  direction: string;
  status: string;
  entry_price_range: string[];
  get_exit_range: string[];
  trigger_stop: string;
  risk: number;
}

export interface ISignalMetaDto {
  current_page: number;
  pages_count: number;
  paginated_by: number;
  status: string | null;
  total: number;
  winrate: string;
}
