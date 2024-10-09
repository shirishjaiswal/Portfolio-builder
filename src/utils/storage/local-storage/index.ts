import maps from "./maps";

const setData = (key: string, value: unknown) : void => {
  localStorage.setItem(key.toUpperCase(), JSON.stringify(value));
};

const getData = (key: string) : string | null => {
  const data = localStorage.getItem(key.toUpperCase());
  return data;
};

const omitData = (key: string) : void => {
  localStorage.removeItem(key.toUpperCase());
};

const localstorage = {
  setData,
  getData,
  omitData,
  maps
};

export default localstorage;
