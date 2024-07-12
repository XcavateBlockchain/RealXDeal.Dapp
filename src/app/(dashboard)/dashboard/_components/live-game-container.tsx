'use client';

import { Dispatch, ReactNode, SetStateAction, useState, useTransition } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import GameMode from './game-mode';
import { GuessFail, GuessPass } from './success-failure';

import { Icons } from '@/components/icons';
import { playGame } from '@/lib/extrinsic';
import { useSubstrateContext } from '@/context/polkadot-contex';
import { set } from 'zod';
interface IGamePlaySection {
  [key: string]: ReactNode;
}

type Player = {
  Player: 1;
};

type Practice = {
  Practice: 0;
};

// type GameType = Player | Practice;

type GameType = 0 | 1;

export default function LiveGamePlay({ type }: { type: GameType }) {
  const [openGameSheet, setOpenGameSheet] = useState<boolean>(false);
  const [gameId, setGameId] = useState(null);
  const [propertyDisplay, setPropertyDisplay] = useState<any>();
  const [display, setDisplay] = useState<'start' | 'play' | 'success' | 'fail'>('start');

  function closeGameSheet() {
    setOpenGameSheet(false);
  }

  const game: IGamePlaySection = {
    start: (
      <StartGame
        type={type}
        setDisplay={setDisplay}
        close={closeGameSheet}
        setPropertyDisplay={setPropertyDisplay}
        setGameId={setGameId}
      />
    ),
    play: (
      <GameMode
        data={propertyDisplay}
        setDisplay={setDisplay}
        close={closeGameSheet}
        gameId={gameId}
      />
    ),
    success: <GuessPass close={closeGameSheet} />,
    fail: <GuessFail close={closeGameSheet} />
  };

  return (
    <Sheet open={openGameSheet} onOpenChange={setOpenGameSheet}>
      <SheetTrigger asChild>
        <Button variant={type === 1 ? 'secondary' : 'warning'} size={'md'}>
          {type === 1 ? 'Live Mode' : '  Demo Mode'}
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-screen border-0"
        onInteractOutside={e => {
          e.preventDefault();
        }}
        onEscapeKeyDown={e => {
          e.preventDefault();
        }}
      >
        <div className="container mx-auto min-h-screen w-full max-w-screen-xl">
          {game[display]}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface GameProps {
  type: GameType;
  setDisplay: Dispatch<SetStateAction<'start' | 'play' | 'success' | 'fail'>>;
  setPropertyDisplay: Dispatch<SetStateAction<any>>;
  setGameId: Dispatch<SetStateAction<any>>;
  close: () => void;
}

function StartGame({ type, close, setDisplay, setPropertyDisplay, setGameId }: GameProps) {
  const { address } = useSubstrateContext();
  const [isLoading, setIsLoading] = useState(false);

  // const [isPending, startTransition] = useTransition();

  async function onPlay() {
    try {
      setIsLoading(true);
      await playGame(type, address, async (data, gameId) => {
        setPropertyDisplay(await data);
        setGameId(gameId);
        setDisplay('play');
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-[44px]">
      <div className="flex items-center justify-between">
        <Button variant={'text'} onClick={close} className="p-0" disabled={isLoading}>
          <Icons.CaretLeft className="size-6" />
          Return
        </Button>
        <div className="space-x-[15px]">
          <span>points</span>
          <span className="text-primary-400">1500</span>
        </div>
      </div>
      <div className="flex items-center justify-center p-[200px]">
        <Button
          className="size-[250px] rounded-full p-10 font-heading text-[2.84569rem] font-bold shadow-game"
          onClick={onPlay}
          disabled={isLoading}
        >
          Start <br /> Game
        </Button>
      </div>
    </div>
  );
}

// const address = '5CSFhuBPkG1SDyHseSHh23Kg89oYVysjRmXH5ea3F3fzEyx5';
// const playGame = async () => {
//   try {
//     const api = await getApi();
//     const extensions = await web3Enable('RealXDEal');
//     const injected = await web3FromAddress(address);
//     const extrinsic = api.tx.gameModule.playGame(0);
//     const signer = injected.signer;

//     const unsub = await extrinsic.signAndSend(address, { signer }, result => {
//       if (result.status.isInBlock) {
//         console.log(`Completed at block hash #${result.status.asInBlock.toString()}`);
//       } else if (result.status.isBroadcast) {
//         console.log('Broadcasting the guess...');
//       }
//     });

//     console.log('Transaction sent:', unsub);
//   } catch (error) {
//     console.error('Failed to submit guess:', error);
//   }
// };
