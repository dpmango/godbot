export interface IFaqCard {
  category: string;
  title: string;
  body: { [key in 'text' | 'list' | 'image']: string | string[] }[];
}
