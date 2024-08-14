// import { useEffect, useState } from 'react';

// export default function useLiveCountdown(length: number) {
//   const [seconds, setSeconds] = useState(length);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setSeconds(prevSeconds => (prevSeconds > 0 ? prevSeconds - 1 : prevSeconds));
//     }, 1000);

//     return () => clearTimeout(timeout);
//   }, [seconds]);

//   return { seconds };
// }

import { useEffect, useState } from 'react';
import { ApiPromise } from '@polkadot/api';
import { getApi } from '@/lib/polkadot';

export default function useLiveCountdown(
  // api: ApiPromise | null,
  currentBlockNumber: number,
  expiryBlockNumber: number
) {
  const initialSeconds = (expiryBlockNumber - currentBlockNumber) * 6;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [blockCountdown, setBlockCountdown] = useState(6);

  useEffect(() => {
    // if (!api) return;

    let intervalId: NodeJS.Timeout;

    const startCountdown = async () => {
      const api = await getApi();
      const unsubscribe = await api.rpc.chain.subscribeNewHeads(lastHeader => {
        const newBlockNumber = lastHeader.number.toNumber();
        const remainingBlocks = expiryBlockNumber - newBlockNumber;

        if (remainingBlocks > 0) {
          const newTimeLeft = remainingBlocks * 6;
          setSeconds(newTimeLeft);
          setBlockCountdown(6); // Reset block countdown to 6 seconds
        } else {
          clearInterval(intervalId);
          setSeconds(0);
          unsubscribe();
        }
      });

      // Decrement the time left every second
      intervalId = setInterval(() => {
        setBlockCountdown(prev => (prev > 1 ? prev - 1 : 6));

        setSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(intervalId);
            return 0;
          }
        });
      }, 1000);

      // Cleanup: Unsubscribe and clear the interval when the component unmounts
      return () => {
        clearInterval(intervalId);
        unsubscribe();
      };
    };

    startCountdown();
  }, [currentBlockNumber, expiryBlockNumber]);

  return { seconds };
}
