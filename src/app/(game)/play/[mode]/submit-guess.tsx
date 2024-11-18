'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LOADING_STATUS } from '@/types';
import { submitGameAnswer } from '@/lib/extrinsic';
import { toast } from 'sonner';
import { Pause, Play } from 'lucide-react';
import { useGameContext } from '@/context/game-context';
import Image from 'next/image';
import { checkResult } from '@/app/actions';
import useLiveCountdown from '@/hooks/use-live-countdown';
import { realEstateFacts } from '@/config/facts';

type GameProps = {
  gameId: number;
  address: string | undefined;
};

export default function SubmitGuess({ address, gameId }: GameProps) {
  const router = useRouter();
  const [infoData, setInfoData] = useState({
    data: null,
    error: false
  });
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [status, setStatus] = useState<LOADING_STATUS>(LOADING_STATUS.IDLE);
  const [isResultChecking, setIsResultChecking] = useState(false);
  const [fact, setFact] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const { setResult } = useGameContext();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (typeof window === 'undefined' || !address) {
      toast.error('Address not found', {
        description: 'Please connect your wallet to start the game'
      });
      setStatus(LOADING_STATUS.ERROR);
      return;
    }

    if (status === LOADING_STATUS.LOADING || isResultChecking) {
      return; // Prevent multiple submissions
    }

    setStatus(LOADING_STATUS.LOADING);
    setShowLoadingDialog(true);

    const formData = new FormData(event.currentTarget);
    const guess = Number(formData.get('guess') as string);

    try {
      await submitGameAnswer(address, guess, gameId, async (data, error) => {
        if (error) {
          setResult({});
          setStatus(LOADING_STATUS.ERROR);
          console.error('Error:', infoData.error);
          router.push('/dashboard');
          return;
        }

        if (data) {
          setIsResultChecking(true);
          const result = await checkResult({
            guess,
            gameId,
            address
          });
          console.log('Check result:', result);
          if (result !== null) {
            setResult({ guess, ...result });
            setStatus(LOADING_STATUS.SUCCESS);
            setShowLoadingDialog(false);
            setIsResultChecking(false);
            router.push('/result');
          }
        }
      });
    } catch (error) {
      console.error('Error during submission:', error);
      setStatus(LOADING_STATUS.ERROR);
      setShowLoadingDialog(false);
      router.push('/dashboard');
    }
  }

  function getRandomFact() {
    const randomIndex = Math.floor(Math.random() * realEstateFacts.length);
    setFact(realEstateFacts[randomIndex].fact);
  }

  useEffect(() => {
    getRandomFact();
    const intervalId = setInterval(() => {
      if (!isPaused) {
        getRandomFact();
      }
    }, 10000); // Fetch a new fact every 10 seconds

    return () => clearInterval(intervalId);
  }, [getRandomFact, isPaused]);

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex items-center rounded-lg border border-[#D9D9D9] p-0 focus:outline-none focus:ring-current"
      >
        <Input
          name="guess"
          type="number"
          placeholder="Enter your guess"
          className="w-[308px] rounded-none border-0 bg-transparent py-5 outline-none ring-transparent placeholder:text-center placeholder:text-[1rem] placeholder:font-medium placeholder:opacity-50 focus:outline-none"
        />
        <Button
          type="submit"
          fullWidth
          className="w-[128px] rounded-l-none rounded-r-lg py-5"
          disabled={status === 'loading'}
        >
          Enter
        </Button>
      </form>
      {showLoadingDialog ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/[0.50] backdrop-blur-[4px]">
          <div className="flex w-full max-w-xl flex-col items-center gap-6 rounded-lg bg-[#172234] p-6">
            <div className="flex w-full flex-col items-center justify-center gap-10 py-12">
              <div className="space-y-3.5 px-3.5 text-center sm:px-0">
                <h1 className="text-xl font-semibold">
                  Just processing your guess, which may take a couple of minutes. While you
                  wait here are some interesting real estate facts...
                </h1>
                <p className="text-balance text-sm text-muted-foreground">{fact}</p>
              </div>

              <div>
                <Button
                  variant="text"
                  size="icon"
                  onClick={togglePause}
                  aria-label={isPaused ? 'Resume facts' : 'Pause facts'}
                >
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

// const DivBox = ({ className }: { className: string }) => (
//   <div className={cn('h-[17px] w-[32px] animate-pulse bg-primary-300', className)} />
// );

export const Countdown = () => {
  const { currentBlock, endingBlock } = useGameContext();
  const { blocksRemaining } = useLiveCountdown(currentBlock, endingBlock);

  return (
    <div className="flex size-[120px] items-center justify-center rounded-full border-[2.94px] border-primary-200 bg-primary px-[31px] py-10 shadow-time">
      <span className="font-heading text-[2.84569rem] font-bold">{blocksRemaining}</span>
    </div>
  );
};
