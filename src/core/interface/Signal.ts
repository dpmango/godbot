export interface ISignal {
  date: string;
  currency: string;
  currency_icon: string;
  shortname: string;
  stop_loss?: number;
  icon: string;
  direction: string;
  status: string;
  entry_price_range: string[];
  get_exit_range: string[];
  trigger_stop: string;
  risk: number;
}
