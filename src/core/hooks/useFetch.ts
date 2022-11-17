import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface IUseFetch {
  fetchData: [];
  getFetch: (url: string) => Promise<void>;
}

const useFetch = (setFetchData?: Dispatch<[] | SetStateAction<any>>) => {
  const getFetch = async (
    url: string,
    method: string = 'GET',
    body?: string,
    headers?: HeadersInit | undefined
  ) => {
    const resp = await fetch(url, {
      method: method,
      headers,
      body,
    });

    const data = await resp.json();
    if (setFetchData) {
      setFetchData(data);
    }
  };

  return {
    getFetch,
  };
};

export { useFetch };
