"use client";


const KEY_PREFIX = "SHIRISH";

const standardizeKey = (key: string) : string => {
  return KEY_PREFIX + "_" + key.toUpperCase();
};

const setData = (key: string, value: unknown) : void => {
  localStorage.setItem(standardizeKey(key), JSON.stringify(value));
};

const getData = (key: string) : string | null => {
  const data = localStorage.getItem(standardizeKey(key));
  return data;
};

const omitData = (key: string) : void => {
  localStorage.removeItem(standardizeKey(key));
};

const localstorage = {
  setData,
  getData,
  omitData,
};

export default localstorage;
