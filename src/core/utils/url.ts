export const openExternalLink = (url: string) => {
  if (window.opener == null) {
    window.location.href = url;
  } else {
    window.open(url);
  }
};

export const isModalOpened = (searchParams: URLSearchParams) => {
  const list = ['tariffs', 'activated', 'success', 'privacy', 'terms', 'cookies', 'disclaimer'];

  return list.some((name) => searchParams.get(name) !== null);
};
