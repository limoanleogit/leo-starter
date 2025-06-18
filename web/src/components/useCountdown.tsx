import { useState, useMemo } from 'react';

export const useCountdown = (seconds: number) => {
  const [countdown, setCountdown] = useState(seconds);
  useMemo(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : prevCountdown));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  return countdown;
};
