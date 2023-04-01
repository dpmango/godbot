export const openExternalLink = (url: string) => {
  if (window.opener == null) {
    window.location.href = url;
  } else {
    window.open(url);
  }
};

export const isModalOpened = (searchParams: URLSearchParams) => {
  const list = [
    'tariffs',
    'activated',
    'success',
    'privacy',
    'terms',
    'cookies',
    'disclaimer',
    'guide',
  ];

  return list.some((name) => searchParams.get(name) !== null);
};

/*
  get full url, remove parameter from query and retun back
 url: 'https://example.com/path?query=value#fragment', paramName: 'query'
 result: '/path#fragment'
*/
export const removeQueryParam = (url: string, paramName: string) => {
  try {
    const urlObj = new URL(url);
    const queryParams = urlObj.searchParams;

    queryParams.delete(paramName);

    urlObj.search = queryParams.toString();

    return urlObj.pathname + urlObj.search + urlObj.hash;
  } catch (e) {
    console.error(e);
  }

  return '/';
};
