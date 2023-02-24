export interface ITarifDto {
  title: string;
  description: string;
  plans: IPlan[];
  available: boolean;
  active_days?: {
    start: string;
    end: string;
  };
  addition_days: number;
}

export interface IPlan {
  id: number;
  period: IPeriod;
  cost: number;
  available: boolean;
}

export interface IPeriod {
  main_period: IPeriodObj;
  add_period: IPeriodObj;
}

export interface IPeriodObj {
  number: number;
  units: string;
}

export interface ITarifMetaData {
  pro_free_space: number;
  is_wanting_pro: boolean;
}
