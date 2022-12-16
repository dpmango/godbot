export const localStorageSet = (name: string, v: any) => {
  localStorage.setItem(name, JSON.stringify(v));
};

export const localStorageGet = (name: string) => {
  try {
    const el = localStorage.getItem(name);
    if (el) return JSON.parse(el);
    return null;
  } catch {
    return null;
  }
};
