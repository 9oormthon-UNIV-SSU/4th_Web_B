import { useEffect } from "react";

interface UseLocalStorageProps<T> {
  key: string;
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLocalStorage = <T>({
  key,
  value,
  setValue,
  setIsLoading,
}: UseLocalStorageProps<T>) => {
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setValue(JSON.parse(stored));
      } catch (err) {
        console.error("localStorage 파싱 오류", err);
      }
    }
  }, []);
  useEffect(() => {
    if (Array.isArray(value) && value.length === 0) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("localStorage 저장 오류", err);
    }
  }, [value]);
};
