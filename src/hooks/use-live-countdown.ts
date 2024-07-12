import { useEffect, useState } from 'react';

export default function useLiveCountdown(length: number) {
  const [seconds, setSeconds] = useState(length);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSeconds(prevSeconds => (prevSeconds > 0 ? prevSeconds - 1 : prevSeconds));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [seconds]);

  return { seconds };
}
