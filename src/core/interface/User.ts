export interface IUserDto {
  name: string;
  tariff: string;
  expire_date: Date;
  allowed_functions: string[];
  access_level: number;
}
