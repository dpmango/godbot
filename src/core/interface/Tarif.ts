export interface ITarifDto {
  title: string;
  description: string;
  plans: IPlan[];
  available: boolean;
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
