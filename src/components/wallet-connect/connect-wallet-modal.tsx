'use client';

import { AlertDialogContent } from '../ui/alert-dialog';
import { Icons } from '../icons';
import Link from 'next/link';
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction
} from 'react';

import { getWalletBySource, getWallets } from '@/components/wallet-connect/wallets';
import { OpenSelectWallet, WalletContext } from '@/context/wallet-context';
import { Wallet, WalletAccount } from '@/types';
import { formatAddress, getFormattedBalance } from '@/lib/formaters';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import { NodeContext } from '@/context';
import { toast } from 'sonner';
import Skeleton from '../skelton';
import Image from 'next/image';

// interface ISection {
//   [key: number]: ReactNode;
// }

// export function WalletButton({ name, icon, isRecommended, ...props }: WalletButtonProps) {
//   const Icon = WalletIcon[icon];
//   return (
//     <button
//       className="flex w-full items-center justify-between rounded-lg border border-white px-4 py-2 transition-colors duration-300 hover:border-primary-foreground"
//       {...props}
//     >
//       <div className="flex items-center gap-2">
//         <Icon className="size-[42px]" />
//         <span className="text-[1rem]/[1.5rem]">{name}</span>
//       </div>
//       {isRecommended ? (
//         <span className="rounded-lg bg-primary px-2 text-center text-[0.75rem]/[1.5rem] font-light text-primary-300">
//           Recommended
//         </span>
//       ) : null}
//     </button>
//   );
// }

type TConnectWallet = {
  onClose: () => void;
  onConnected: () => void;
  setIndex: Dispatch<SetStateAction<number>>;
};

export default function ConnectWalletModal({
  onClose,
  onConnected,
  setIndex
}: TConnectWallet) {
  const router = useRouter();
  const openSelectWalletContext = useContext(OpenSelectWallet);
  const walletContext = useContext(WalletContext);
  const currentAddress = walletContext.selectedAccount?.[0]?.address;
  const currentBalance = walletContext.balance;
  const { api } = useContext(NodeContext);
  const [walletAccounts, setWalletAccounts] = useState<WalletAccount[]>([]);

  const dotsamaWallets = getWallets();

  useEffect(() => {
    if (currentAddress) {
      getFormattedBalance(currentAddress || '', api).then(balance => {
        walletContext.setBalance(balance);
      });
    }
  }, [currentAddress]);

  const onSelectAccount = async (account: WalletAccount) => {
    walletContext.selectAccount(account.address);
    onConnected();
  };

  const onSelectWallet = useCallback(
    async (walletKey: any, walletType: 'substrate' | 'evm' = 'substrate') => {
      if (api === null || !api?.registry?.chainSS58) {
        toast.error('Node is not connected');
        return;
      }
      if (walletType === 'substrate') {
        setWalletAccounts([]);
        walletContext.selectAccount('');
        // @ts-ignore
        walletContext.setWallet(getWalletBySource(walletKey), walletType);

        const accounts = await getWalletBySource(walletKey)?.getAccounts(
          api.registry.chainSS58
        );

        if (accounts && accounts?.length > 1) {
          setWalletAccounts(accounts);
          openSelectWalletContext.close();
        } else if (accounts && accounts?.length == 1) {
          onSelectAccount(accounts[0]);
          openSelectWalletContext.close();
        } else {
          openSelectWalletContext.close();
        }

        if (!accounts?.length) {
          toast.warning('No active accounts', {
            description: 'no-accounts'
          });
        }
      } else {
        console.log('EVM is not supported yet');
        onClose();
      }
    },
    [openSelectWalletContext, walletContext, api]
  );

  const onClickDotsamaWallet = useCallback(
    (wallet: Wallet) => {
      return async () => {
        if (wallet.installed) {
          onSelectWallet(wallet.extensionName);
          if (currentAddress) {
            setIndex(2);
          }
          router.refresh();
          onClose();
        }
      };
    },
    [onSelectWallet]
  );

  return (
    <AlertDialogContent className="gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[1.0625rem]/[1.5rem] font-medium">Connect wallet</h1>
        <button onClick={() => onClose()}>
          <Icons.close className="size-6 stroke-white hover:stroke-primary-foreground" />
        </button>
      </div>
      {!api ? (
        <div className="flex w-full flex-col gap-6">
          <Skeleton className="h-[58px]" />
          <Skeleton className="h-[58px]" />
          <Skeleton className="h-[58px]" />
        </div>
      ) : (
        <div className="flex w-full flex-col gap-6">
          {dotsamaWallets.map((wallet, i) => (
            <button
              className="flex w-full items-center justify-between rounded-lg border border-white px-4 py-2 transition-colors duration-300 hover:border-primary-foreground"
              key={i}
              onClick={onClickDotsamaWallet(wallet)}
            >
              <div className="flex items-center gap-2">
                <Image src={wallet.logo?.src} alt="" width={42} height={42} priority />
                <span className="text-[1rem]/[1.5rem]">{wallet.title}</span>
              </div>
              {wallet.installed ? null : (
                <Link
                  href={wallet.installUrl}
                  className="rounded-lg bg-primary px-2 text-center text-[0.75rem]/[1.5rem] font-light text-primary-300"
                  onClick={() => onClose()}
                >
                  Install
                </Link>
              )}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center py-6">
        <Link
          href={''}
          className="text-[0.75rem]/[1.5rem] font-light text-primary-foreground hover:underline"
        >
          What is wallet?
        </Link>
      </div>
    </AlertDialogContent>
  );
}
