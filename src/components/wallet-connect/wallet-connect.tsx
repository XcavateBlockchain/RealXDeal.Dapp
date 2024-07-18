'use client';

import { ReactNode, useContext, useState } from 'react';
import { AlertDialog, AlertDialogTrigger } from '../ui/alert-dialog';
import { ConnectWalletIcon, WalletIcon } from '../wallet-icon';
import { WalletContext } from '@/context/wallet-context';
import { SCREENS, useScreenSize } from '@/lib/resolutionScreens';
import { NodeContext } from '@/context';
import { formatAddress } from '@/lib/formaters';
import ConnectWalletModal from './connect-wallet-modal';
import ConnectedAccountModal from './account-modal';
import Image from 'next/image';

interface ISection {
  [key: number]: ReactNode;
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

  // const actions: ISection = {
  //   1: <ConnectWalletAction setIndex={setIndex} close={closeDialog} />,
  // };

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
      {/* {actions[index]} */}
      {/* {walletModal && (
        <ConnectWalletModal
          onConnected={() => {
            showWalletModal(false);
          }}
          onClose={() => {
            showWalletModal(false);
          }}
        />
      )} */}
      {!selectedAddress ? (
        <ConnectWalletModal
          onConnected={() => {
            showWalletModal(false);
          }}
          onClose={() => {
            showWalletModal(false);
          }}
        />
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
