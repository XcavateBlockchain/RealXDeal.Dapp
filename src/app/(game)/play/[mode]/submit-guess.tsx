'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LOADING_STATUS } from '@/types';
import { submitGameAnswer } from '@/lib/extrinsic';
import { toast } from 'sonner';
import { useGameContext } from '@/context/game-context';
// import { checkResult } from '@/app/actions';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { checkResult } from '@/app/actions';
import { error } from 'console';

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

          setResult({ guess, ...result });
          setStatus(LOADING_STATUS.SUCCESS);
          setShowLoadingDialog(false);
          setIsResultChecking(false);
          router.push('/result');
        }
      });
    } catch (error) {
      console.error('Error during submission:', error);
      setStatus(LOADING_STATUS.ERROR);
      setShowLoadingDialog(false);
      router.push('/dashboard');
    }
  }

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
      <AlertDialog open={showLoadingDialog} onOpenChange={setShowLoadingDialog}>
        <AlertDialogContent className="max-w-lg bg-[#1D2A41]">
          <div className="flex flex-col items-center justify-center gap-6 py-12">
            <Image src={'/images/logo.svg'} alt="" width={143} height={56} priority />

            <div className="space-y-2">
              <p className="text-[14px]/[17px]">
                {status === 'loading'
                  ? 'Loading....'
                  : isResultChecking
                    ? 'Checking Result'
                    : ''}
              </p>
              <div className="flex h-8 max-w-md items-center justify-start gap-2 rounded-[34px] border-2 border-primary-300 p-1">
                <DivBox className="rounded-l-[34px] bg-primary-300" />
                <DivBox className="bg-[#F08482]" />
                <DivBox className="bg-[#9E75B2]" />
                <DivBox className="bg-[#2E765F]" />
                <DivBox className="bg-[#364E77]" />
                <DivBox className="bg-[#60B565]" />
                <DivBox className="bg-[#F08482]" />
                <DivBox className="bg-[#9E75B2]" />
                <DivBox className="bg-[#2E765F]" />
                <DivBox className="bg-[#364E77]" />
                <DivBox className="rounded-r-[34px] bg-[#60B565]" />
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const DivBox = ({ className }: { className: string }) => (
  <div className={cn('h-[17px] w-[32px] animate-pulse bg-primary-300', className)} />
);
