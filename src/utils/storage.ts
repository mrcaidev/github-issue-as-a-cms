export const getStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const setStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Do nothing.
  }
};
