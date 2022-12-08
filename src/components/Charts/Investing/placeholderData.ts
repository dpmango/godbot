import { IInvesting } from '@core/interface/Investor';

export const placeholderInvesting: IInvesting[] = [...Array(8)].map((_, idx) => ({
  currency: 'S&P500',
  currency_code: 'SP500',
  currency_icon: 'https://api.devgodbot.ru/media/crypto_currency/3928.png',
  invest_id: idx,
  datetime: '2022-11-28T11:30:52.661Z',
  isPlaceholder: true,
}));
