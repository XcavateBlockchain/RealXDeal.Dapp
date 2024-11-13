'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { GameICons } from '@/components/game-icon';
import { startGame } from '@/lib/extrinsic';
import { LOADING_STATUS } from '@/types';
import { Data } from '@polkadot/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronLeft, CircleX, LoaderCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameContext } from '@/context/game-context';

const buttonVariants = cva(
  'flex flex-col items-center w-full justify-center gap-2 rounded-lg p-3  duration-20 transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        practice: 'bg-primary-300 hover:bg-primary-300/90',
        pro: 'bg-primary-600 hover:bg-primary-600/90',
        player: 'bg-primary-400 hover:bg-primary-400/90'
      },
      fullWidth: {
        true: 'w-full'
      }
    },
    defaultVariants: {
      variant: 'practice'
    }
  }
);

interface GameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  mode: 0 | 1 | 2;
  address: string | undefined;
  description?: string;
}

const GAME_MODE = ['practice', 'player', 'pro'];

export default function StartGame({
  variant,
  fullWidth,
  mode,
  address,
  className,
  ...props
}: GameButtonProps) {
  const router = useRouter();
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [status, setStatus] = useState<LOADING_STATUS>(LOADING_STATUS.IDLE);
  const { setCurrentBlock, setEndingBlock } = useGameContext();

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
          setCurrentBlock(data.submittedAtBlock);
          setEndingBlock(data.endingBlock);
          setStatus(LOADING_STATUS.SUCCESS);
          router.push(`/play/${GAME_MODE[mode]}?id=${gameId}`);
        }
      });
    } catch (error) {
      setStatus(LOADING_STATUS.ERROR);
      setShowLoadingDialog(true);
      toast.error('Failed to start game.');
    }
  }

  const Icon = GameICons[GAME_MODE[mode] as keyof typeof GameICons];

  return (
    <>
      <button
        className={cn(buttonVariants({ variant, fullWidth }))}
        {...props}
        disabled={status === LOADING_STATUS.LOADING}
        onClick={handleClick}
      >
        <div className="flex size-[75px] items-center justify-center rounded-full bg-card">
          <Icon className={cn('size-10', className)} />
        </div>
        <span className="text-[12px]/[18px] font-bold">{GAME_MODE[mode]} mode</span>
        {props.description ? (
          <span className="text-[10px]/[24px] font-light">{props.description}</span>
        ) : null}
      </button>
      {showLoadingDialog ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/[0.50] backdrop-blur-[4px]">
          <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-lg bg-[#172234] p-6">
            <div className="flex w-full flex-col items-center justify-center gap-10 py-12">
              <span className="relative flex size-10 md:size-20">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex size-10 rounded-full bg-primary md:size-20"></span>
              </span>

              <div className="space-y-3.5 px-3.5 text-center sm:px-0">
                <h1 className="text-xl font-semibold">{'Loading'}</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  {`Please wait while we process your request`}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* <AlertDialog open={showLoadingDialog} onOpenChange={setShowLoadingDialog}>
        <AlertDialogContent className="w-sm rounded-3xl bg-[#1D2A41]">
       
          {status === LOADING_STATUS.ERROR ? (
            <button
              className="absolute left-[26px] top-[42px] z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground md:top-[26px]"
              onClick={() => setShowLoadingDialog(false)}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Cancel connection</span>
            </button>
          ) : null}
          <div className="flex w-full flex-col items-center justify-center gap-10 py-12">
            <div className="relative flex size-[116px] items-center justify-center rounded-2xl border p-3">
              {status === LOADING_STATUS.LOADING ? (
                <LoaderCircle
                  className="size-[90px] animate-spin overflow-hidden"
                  aria-hidden="true"
                />
              ) : (
                <CircleX className="size-[90px] overflow-hidden" aria-hidden="true" />
              )}

              {status === LOADING_STATUS.ERROR ? (
                <Button
                  size="icon"
                  variant="secondary"
                  className="group absolute -bottom-2 -right-2 rounded-full bg-muted p-1.5 shadow"
                  onClick={handleClick}
                >
                  <RotateCcw className="size-4 transition-transform group-hover:-rotate-45" />
                </Button>
              ) : null}
            </div>

            <div className="space-y-3.5 px-3.5 text-center sm:px-0">
              <h1 className="text-xl font-semibold">
                {status === LOADING_STATUS.ERROR ? 'Request Error' : 'Loading'}
              </h1>
              <p className="text-balance text-sm text-muted-foreground">
                {status === LOADING_STATUS.ERROR
                  ? 'There was an error with the request. Click above to try again.'
                  : `Please wait while we process your request`}
              </p>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}

// const DivBox = ({ className }: { className: string }) => (
//   <div className={cn('h-[17px] w-[32px] animate-pulse bg-primary-300', className)} />
// );
