const createLocalStorage = () => ({
  length: localStorage.length,
  getItem(key: string): unknown {
    const item = localStorage.getItem(key);

    if (item === null) {
      return null;
    }

    try {
      return JSON.parse(item) as unknown;
    } catch {
      return null;
    }
  },
  setItem(key: string, item: unknown): void {
    const stringifiedItem = JSON.stringify(item);
    localStorage.setItem(key, stringifiedItem);
  },
  removeItem(key: string): void {
    localStorage.removeItem(key);
  },
  clear(): void {
    localStorage.clear();
  },
});

export default createLocalStorage();
