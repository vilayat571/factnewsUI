import { useRef, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const useThrottle = (callback: Function, delay: number = 1000) => {
  // eslint-disable-next-line react-hooks/purity
  const lastRun = useRef(Date.now());

  return useCallback(
    (...args: unknown[]) => {
      const now = Date.now();

      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      }
    },
    [callback, delay]
  );
};