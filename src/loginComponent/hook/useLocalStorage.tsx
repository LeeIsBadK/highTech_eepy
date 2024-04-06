import { useState, Dispatch, SetStateAction } from "react";

// Define the type for the state updater function returned by useLocalStorage
type DispatchWithLocalStorage<T> = Dispatch<SetStateAction<T>>;

// Modify the useLocalStorage hook to return a function with the same signature as useState's setter
const useLocalStorage = <T extends any>(keyName: string, defaultValue: T): [T, DispatchWithLocalStorage<T>] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue:any) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};

export { useLocalStorage };
