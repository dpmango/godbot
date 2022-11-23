import Cookies from 'js-cookie';
import { ofetch, FetchError, FetchOptions } from 'ofetch';

interface IRequestOptions {
  method?: string;
  body?: { [key: string]: any };
  headers?: { [key: string]: string };
  params?: { [key: string]: string };
}

interface IError {
  status: number;
  message: string;
  raw: any;
}

export const api = async (
  url: string,
  { method = 'GET', body, params, headers }: IRequestOptions
) => {
  try {
    let requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json' as string,
        'X-CSRFTOKEN': Cookies.get('csrftoken') || '',
      },
      body,
      params,
    } as RequestInit;

    if (headers) {
      requestOptions.headers = {
        ...requestOptions.headers,
        ...headers,
      };
    }

    const i18nextLng = localStorage.getItem('i18nextLng');

    if (i18nextLng) {
      requestOptions.headers = {
        ...requestOptions.headers,
        ['Accept-Language']: i18nextLng,
      };
    }

    let requestUrl = `${process.env.REACT_APP_API_URL}${url}`;

    if (url.startsWith('http')) {
      requestUrl = url;
    }

    const { data, message } = await ofetch(requestUrl, requestOptions);

    console.log(`👌 fetch ${url}`, data);

    return { data, message, error: null };
  } catch (err: any) {
    let errMessage = err?.data?.message || '';

    if (!errMessage) {
      switch (err?.status) {
        case 500:
          errMessage = 'Ошибка сервера';
          break;
        case 403:
          errMessage = 'Ошибка авторизации';
          break;
      }
    }

    let error: IError = { status: err?.status || 500, message: errMessage, raw: err };

    console.log('❌ Request Error', error);

    return { data: null, message: null, error };
  }
};
