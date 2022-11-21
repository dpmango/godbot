export interface ITarifDto {
  title: string;
  description: string;
  plans: IPlan[];
}

export interface IPlan {
  id: number;
  period: IPeriod;
  cost: number;
}

export interface IPeriod {
  main_period: string;
  add_period: string;
}
