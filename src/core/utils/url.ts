export const openExternalLink = (url: string) => {
  if (window.opener == null) {
    window.location.href = url;
  } else {
    window.open(url);
  }
};
