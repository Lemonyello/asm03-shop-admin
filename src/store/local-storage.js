export const ROLE = "role";

export const saveToStorage = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};

export const getFromStorage = (key, defaultVal) => {
  return localStorage.getItem(key) === null
    ? defaultVal
    : JSON.parse(localStorage.getItem(key));
};

export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};
