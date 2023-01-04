export interface IFaqCard {
  category: string;
  title: string;
  body: { [key: string]: string }[];
}
