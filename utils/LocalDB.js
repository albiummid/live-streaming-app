export const LocalDB_SaveData = (key, value) => {
  global.window.localStorage.setItem(key, JSON.stringify(value));
  return JSON.parse(global.window.localStorage.getItem(key));
};

export const LocalDB_GetData = (key) => {
  return JSON.parse(global.window.localStorage.getItem(key)) || null;
};
export const LocalDB_DeleteData = (key) => {
  return global.window.localStorage.removeItem(key);
};
export const LocalDB_ClearAll = () => {
  return global.window.localStorage.clear();
};
