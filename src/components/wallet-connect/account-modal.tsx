'use client';

import { WalletContext } from '@/context/wallet-context';
import { Icons } from '../icons';
import { AlertDialogContent, AlertDialogTitle } from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { SCREENS, useScreenSize } from '@/lib/resolutionScreens';
import { useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getLocalStorageItem } from '@/lib/localstorage';
import { PREDEFINED_WALLETS } from '@/config/dotsama';
import Image from 'next/image';
import { formatAddress } from '@/lib/formaters';
import { useRouter } from 'next/navigation';

type TConnectWallet = {
  onClose: () => void;
};

export default function ConnectedAccountModal({ onClose }: TConnectWallet) {
  const router = useRouter();
  const walletContext = useContext(WalletContext);
  const screenSize = useScreenSize();
  const selectedAddress = walletContext.selectedAccount?.[0]?.address;
  const [walletType, setWalletType] = useState<string>('');
  const walletKey = getLocalStorageItem('wallet-key');

  useEffect(() => {
    if (walletKey) {
      setWalletType(JSON.parse(walletKey));
    }
  });

  const wallet = PREDEFINED_WALLETS.find(wallet => wallet.extensionName === walletType);

  const formattedAddress =
    screenSize === SCREENS.mobile
      ? formatAddress(selectedAddress, 2, 4, 9)
      : formatAddress(selectedAddress);

  return (
    <AlertDialogContent className="top-36 flex w-full flex-col gap-4">
      <AlertDialogTitle hidden>Connect</AlertDialogTitle>
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold">Summary</h1>
          <div className="flex gap-2">
            {wallet ? (
              <Image
                src={wallet?.logo.src}
                alt={wallet?.logo.alt}
                width={24}
                height={24}
                priority
              />
            ) : null}
            <span>{formattedAddress}</span> <Icons.copy className="size-6" />
          </div>
        </div>
        <button onClick={() => onClose()}>
          <Icons.close className="size-6 stroke-white hover:stroke-primary-foreground" />
        </button>
      </div>
      <div className="grid justify-items-start gap-2 rounded-lg border px-4 py-2">
        <dl className="flex w-full items-center justify-between">
          <dt>XCAV tokens</dt>
          <dd>0 XCAV</dd>
        </dl>
      </div>
      <div className="flex w-full items-center gap-4 md:justify-end md:gap-2">
        <Button
          className="w-full md:w-auto"
          variant={'outline'}
          onClick={async () => {
            await walletContext.disconnectWallet();
            router.refresh();
            onClose();
          }}
        >
          DISCONNECT
        </Button>
      </div>
    </AlertDialogContent>
  );
}
