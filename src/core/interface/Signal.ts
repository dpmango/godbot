export interface ISignal {
  date: string;
  currency: string;
  shortname: string;
  stop_loss?: string;
  icon: string;
  direction: string;
  status: string;
  entry_price_range: string[];
  get_exit_range: string[];
  trigger_stop: string;
  risk: number;
}
