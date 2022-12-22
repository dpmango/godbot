export interface ILangSelect {
  key: string;
  lang: string;
}

export const languageList = [
  { key: 'ru', lang: 'ru-RU' },
  { key: 'en', lang: 'en-US' },
  { key: 'tr', lang: 'tr-TR' },
];

export const getLanguageByKey = (lang: string | null) => {
  return languageList.find((x) => x.lang === lang);
};
