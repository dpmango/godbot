export interface IUserDto {
  id: number;
  name: string;
  tariff: string;
  expire_date: Date;
  allowed_functions: string[];
  access_level: number;
  tutorial_complete: boolean;
}

export interface IReferralDto {
  date_joined: string;
  id: number;
  email: string;
  earnings: number;
}

export interface IPartnerDto {
  id: number;
  balance: number;
  referral_percent: number;
  referrals: IReferralDto[];
  conversion: string;
  referral_count: number;
  total_earnings: number;
}

export interface INotificationDto {
  type: string;
  title?: string;
  description: string;
  datetime: string;
  image?: string;
  link: string;
}
