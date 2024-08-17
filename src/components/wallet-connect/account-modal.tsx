'use client';

import { WalletContext } from '@/context/wallet-context';
import { Icons } from '../icons';
import { AnimatePresence, motion } from 'framer-motion';

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
import { cn } from '@/lib/utils';
import { WalletAccount } from '@/types';
import { ScrollArea } from '../ui/scroll-area';

type TConnectWallet = {
  onClose: () => void;
  onConnected: () => void;
};

export default function ConnectedAccountModal({ onConnected, onClose }: TConnectWallet) {
  const router = useRouter();
  const walletContext = useContext(WalletContext);
  const screenSize = useScreenSize();
  const selectedAddress = walletContext.selectedAccount?.[0]?.address;
  const walletAccounts: any = walletContext.accounts;
  const [walletType, setWalletType] = useState<string>('');
  const walletKey = getLocalStorageItem('wallet-key');

  console.log(walletContext.accounts);
  useEffect(() => {
    if (walletKey) {
      setWalletType(JSON.parse(walletKey));
    }
  });

  const onSelectAccount = async (account: WalletAccount) => {
    walletContext.selectAccount(account.address);
    onConnected();
    onClose();
    router.refresh();
  };

  const wallet = PREDEFINED_WALLETS.find(wallet => wallet.extensionName === walletType);

  const formattedAddress =
    screenSize === SCREENS.mobile
      ? formatAddress(selectedAddress, 2, 4, 9)
      : formatAddress(selectedAddress);

  return (
    <AlertDialogContent className="flex w-full flex-col gap-8">
      <AlertDialogTitle hidden>Connect</AlertDialogTitle>
      <div className="flex w-full items-start justify-between">
        <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold">Account</h1>

        <button onClick={() => onClose()}>
          <Icons.close className="size-6 stroke-white hover:stroke-primary-foreground" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
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
        <div className="grid justify-items-start gap-2 rounded-lg bg-[#3B4F74] px-4 py-2">
          <dl className="flex w-full items-center justify-between text-primary-foreground">
            <dt>XCAV tokens</dt>
            <dd>0 XCAV</dd>
          </dl>
        </div>
      </div>

      {wallet ? (
        <AnimatePresence>
          {walletAccounts.length >= 1 && wallet.extensionName === walletAccounts[0].source && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.1 }}
              className="mb-3 flex flex-col gap-2.5 transition"
            >
              <span className="text-primary-foreground">{`Choose ${walletContext.wallet?.title} account`}</span>
              <ScrollArea className="h-[160px] w-full">
                <div className="flex flex-col gap-2">
                  {walletAccounts.map((account: any) => (
                    <p
                      key={account.address}
                      className={cn(
                        'flex cursor-pointer justify-between gap-3 rounded border-l-2 border-primary-200 px-4 py-2 text-[16px]/[24px] font-light transition-all duration-300 ease-in hover:border-primary-300 hover:bg-primary',
                        selectedAddress === account.address ? 'text-primary-400' : 'text-white'
                      )}
                      onClick={() => {
                        onSelectAccount(account);
                      }}
                    >
                      <span className="capitalize group-hover:text-primary-300">
                        {account.name}
                      </span>
                      <span className="group-hover:text-primary-300">
                        {formatAddress(account.address)}
                      </span>
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      ) : null}

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
