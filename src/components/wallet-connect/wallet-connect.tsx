'use client';

import { useSubstrateContext } from '@/context/polkadot-contex';
import { ReactNode, useContext, useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '../ui/alert-dialog';

import { ConnectWalletIcon } from '../wallet-icon';
import { Icons } from '../icons';
import Skeleton from '../skelton';
import Link from 'next/link';
import { WalletContext } from '@/context/wallet-context';
// import { SCREENS, useScreenSize } from '@/lib/resolutionScreens';
import { NodeContext } from '@/context';
import { formatAddress } from '@/lib/formaters';
import ConnectWalletModal from './connect-wallet-modal';

interface ISection {
  [key: number]: ReactNode;
}

export default function WalletConnect({ open = false }: { open?: boolean }) {
  const [isDialogOpen, setIsDialogOpen] = useState(open);
  const [index, setIndex] = useState(1);

  const { api } = useContext(NodeContext);
  const walletContext = useContext(WalletContext);
  const selectedAddress = walletContext.selectedAccount?.[0]?.address;
  //   const screenSize = useScreenSize();

  const [walletModal, showWalletModal] = useState(false);

  //   const formattedAddress =
  //     screenSize === SCREENS.mobile
  //       ? formatAddress(selectedAddress, 2, 4, 9)
  //       : formatAddress(selectedAddress);

  function closeDialog() {
    setIsDialogOpen(false);
  }

  // const actions: ISection = {
  //   1: <ConnectWalletAction setIndex={setIndex} close={closeDialog} />,
  // };

  return (
    <AlertDialog open={walletModal} onOpenChange={showWalletModal}>
      <AlertDialogTrigger asChild>
        <button className="flex max-w-[250px] items-center gap-2 truncate rounded-lg border border-primary-300 px-[45px] py-4 font-heading text-[1rem] font-medium text-primary-300 hover:border-white hover:text-white">
          Connect <ConnectWalletIcon className="h-4 w-[21px]" />
        </button>
      </AlertDialogTrigger>
      {/* {actions[index]} */}
      {walletModal && (
        <ConnectWalletModal
          onConnected={() => {
            showWalletModal(false);
          }}
          onClose={() => {
            showWalletModal(false);
          }}
        />
      )}
    </AlertDialog>
  );
}
