const INTERVAL = 500;

export const debounce = <T extends unknown[]>(callback: (...args: T) => unknown) => {
  let lastTimeout: number;

  const debounced = (...args: T) => {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(() => callback(...args), INTERVAL);
  };

  debounced.cancel = () => {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
  };

  return debounced;
};
