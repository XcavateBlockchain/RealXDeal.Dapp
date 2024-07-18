'use client';

import { Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '../ui/alert-dialog';
import { ConnectWalletIcon, WalletIcon } from '../wallet-icon';
import { WalletContext } from '@/context/wallet-context';
import { SCREENS, useScreenSize } from '@/lib/resolutionScreens';
import { NodeContext } from '@/context';
import { formatAddress } from '@/lib/formaters';
import ConnectWalletModal from './connect-wallet-modal';
import ConnectedAccountModal from './account-modal';
import Image from 'next/image';
import { Icons } from '../icons';
import { Button } from '../ui/button';
import Link from 'next/link';

interface ISection {
  [key: number]: ReactNode;
}

type IProps = {
  setIndex: Dispatch<SetStateAction<number>>;
  close: () => void;
};

function AddPlayerNameAction({ setIndex }: IProps) {
  const [isUsername, setUsername] = useState(false);

  function onSubmit() {
    setUsername(true), setIndex(3);
  }

  return (
    <AlertDialogContent className="max-w-md gap-6">
      <div className="flex items-center justify-center">
        <h1 className="font-heading text-[1.0625rem]/[1.5rem] font-medium">
          What should we call you?
        </h1>
      </div>
      <input
        className="flex w-full rounded-lg border-primary-300/50 bg-white/[0.31] p-4 text-[1.0625rem]/[1.5rem] font-light placeholder:text-white"
        placeholder="Username"
        type="text"
      />
      <Button onClick={onSubmit}>Submit Player Name</Button>
    </AlertDialogContent>
  );
}

function ConnectedSuccessFull({ close }: IProps) {
  return (
    <AlertDialogContent>
      <div className="flex justify-end">
        <button onClick={close}>
          <Icons.close className="size-6 stroke-white hover:stroke-primary-foreground" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex size-[140px] items-center justify-center rounded-full bg-primary-300/[0.10] text-primary-300">
          <Icons.CheckCircle className="size-[75px]" />
        </div>
        <h1 className="font-heading text-[1rem]/[1.5rem] font-medium">
          Wallet connected successful
        </h1>
        <p className="text-[1rem]/[1.5rem] font-light">
          Guess correct property prices and win NFTs.
        </p>
        <Button asChild>
          <Link href="/dashboard">Continue</Link>
        </Button>
      </div>
    </AlertDialogContent>
  );
}

export default function WalletConnect({ open = false }: { open?: boolean }) {
  const [index, setIndex] = useState(1);
  const { api } = useContext(NodeContext);
  const walletContext = useContext(WalletContext);
  const selectedAddress = walletContext.selectedAccount?.[0]?.address;
  const screenSize = useScreenSize();

  const [walletModal, showWalletModal] = useState(open);

  const formattedAddress =
    screenSize === SCREENS.mobile
      ? formatAddress(selectedAddress, 2, 4, 9)
      : formatAddress(selectedAddress);

  const actions: ISection = {
    1: (
      <ConnectWalletModal
        setIndex={setIndex}
        onConnected={() => {
          showWalletModal(false);
        }}
        onClose={() => {
          showWalletModal(false);
        }}
      />
    ),
    2: <AddPlayerNameAction setIndex={setIndex} close={() => showWalletModal(false)} />,
    3: <ConnectedSuccessFull setIndex={setIndex} close={() => showWalletModal(false)} />
  };

  return (
    <AlertDialog open={walletModal} onOpenChange={showWalletModal}>
      <AlertDialogTrigger asChild>
        <button className="flex max-w-[250px] items-center gap-2 truncate rounded-lg border border-primary-300 px-[45px] py-4 font-heading text-[1rem] font-medium text-primary-300 hover:border-white hover:text-white">
          {selectedAddress ? (
            <>
              <Image
                src={'/images/profile.jpeg'}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full shadow-profile"
                priority
              />
              {formattedAddress}
            </>
          ) : (
            <>
              Connect <ConnectWalletIcon className="h-4 w-[21px]" />
            </>
          )}
        </button>
      </AlertDialogTrigger>
      {!selectedAddress ? (
        <>{actions[index]}</>
      ) : (
        <ConnectedAccountModal
          onClose={() => {
            showWalletModal(false);
          }}
        />
      )}
    </AlertDialog>
  );
}
