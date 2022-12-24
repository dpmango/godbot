export interface IUserDto {
  name: string;
  tariff: string;
  expire_date: Date;
  allowed_functions: string[];
  access_level: number;
  tutorial_complete: boolean;
}

export interface IReferalDto {
  date: string;
  'Дата регистрации': string; // убрать
  id: number;
  email: string;
  earnings: number;
}

export interface IPartnerDto {
  id: number;
  balance: number;
  referals: IReferalDto[];
}
