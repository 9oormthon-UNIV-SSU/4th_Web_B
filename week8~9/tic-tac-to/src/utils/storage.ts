export function getStorage<T>(key: string, defaultValue: T): T {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
}

export function setStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
