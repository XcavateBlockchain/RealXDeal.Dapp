'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { GameICons } from '@/components/game-icon';
import { startGame } from '@/lib/extrinsic';
import { LOADING_STATUS } from '@/types';
import { Data } from '@polkadot/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type GameProps = {
  mode: 0 | 1 | 2;
  address: string | undefined;
};

const GAME_MODE = ['practice', 'player', 'pro'];

export default function StartGame({ mode, address }: GameProps) {
  const router = useRouter();
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [status, setStatus] = useState<LOADING_STATUS>(LOADING_STATUS.IDLE);

  async function handleClick() {
    try {
      setStatus(LOADING_STATUS.LOADING);
      setShowLoadingDialog(true);
      if (!address) {
        setShowLoadingDialog(false);
        toast.error('Address not found', {
          description: 'Please connect your wallet to start game'
        });
        setStatus(LOADING_STATUS.ERROR);
        return;
      }

      await startGame(mode, address, async (data, gameId) => {
        console.log(data);
        if (data.status === false && gameId === null) {
          toast.warning(data.message);
          setStatus(LOADING_STATUS.ERROR);
          setShowLoadingDialog(false);
        }
        if (data.status === true && gameId) {
          toast.success(data.message);
          setStatus(LOADING_STATUS.SUCCESS);
          router.push(`/play/${GAME_MODE[mode]}?id=${gameId}`);
        }
      });
    } catch (error) {
      setStatus(LOADING_STATUS.ERROR);
      setShowLoadingDialog(false);
      toast.error('Failed to start game.');
    }
  }

  return (
    <>
      <button
        className="group flex flex-col items-center justify-center gap-[6px] rounded-[6px] border border-primary-400 p-3"
        disabled={status === 'loading'}
        onClick={handleClick}
      >
        <div className="flex size-[55px] items-center justify-center rounded-full shadow-header group-hover:shadow-xl">
          <GameICons.player className="size-[38px]" />
        </div>
        <span className="text-[12px]/[18px] font-bold">Practice mode</span>
      </button>
      <AlertDialog open={showLoadingDialog} onOpenChange={setShowLoadingDialog}>
        <AlertDialogContent className="max-w-lg bg-[#1D2A41]">
          <div className="flex flex-col items-center justify-center gap-6 py-12">
            <Image src={'/images/logo.svg'} alt="" width={143} height={56} priority />

            <div className="space-y-2">
              <p className="text-[14px]/[17px]">Loading...</p>
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
