'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
// import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types';

// declare global {
//   interface Window {
//     talisman?: any;
//   }
// }

export type SubstrateContext = {
  address: string;
  points: number;
  isConnected: boolean;
  selectedAccount: InjectedAccountWithMeta | any;
  handleConnect: any;
  disconnectWallet: any;
};

const SubstrateContext = createContext<SubstrateContext>({
  address: '',
  points: 0,
  isConnected: false,
  selectedAccount: {},
  handleConnect: async () => {}, // Dummy function for handleConnect
  disconnectWallet: () => {} // Dummy function for disconnectWallet
});

export function useSubstrateContext() {
  return useContext(SubstrateContext);
}

export interface SubstrateProps {
  children?: React.ReactNode;
}

export default function SubstrateContextProvider({ children }: SubstrateProps) {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<InjectedExtension>();
  const [address, setAddress] = useState<string>('');

  if (typeof window === 'undefined') {
    console.log('Window not found');
  }

  // const handleConnect = async (walletName: 'talisman' | 'subwallet-js') => {
  //   try {
  //     const extensions = await web3Enable('RealXDeal');
  //     // console.log(extensions);
  //     const extension = extensions.find(
  //       ext => ext.name.toLowerCase() === walletName.toLowerCase()
  //     );
  //     console.log(extension);
  //     if (!extension) {
  //       alert(`Please install the ${walletName} extension.`);
  //       return;
  //     }

  //     const injected = await web3FromSource(extension.name);
  //     if (!injected) {
  //       throw new Error(`Failed to connect with ${walletName}`);
  //     }

  //     const accounts = await web3Accounts();
  //     if (accounts.length === 0) {
  //       throw new Error('No accounts found in the wallet.');
  //     }

  //     setSelectedAccount(accounts[0]);
  //     setAddress(accounts[0].address);
  //     localStorage.setItem('selectedWalletAddress', accounts[0].address);
  //     console.log('Connected with account:', accounts[0]);

  //     alert(`Connected successfully with ${walletName}`);
  //   } catch (error) {
  //     console.error('Error connecting to wallet:', error);
  //     alert(`Failed to connect the wallet: ${error}`);
  //   }
  // };

  // const disconnectWallet = () => {
  //   setAddress('');
  //   localStorage.removeItem('selectedWalletAddress');
  //   setIsConnected(false);
  //   router.refresh();
  // };

  // const onReconnect = async () => {
  //   const localStorageAddress = localStorage.getItem('selectedWalletAddress');
  //   if (localStorageAddress) {
  //     const accounts = await web3Accounts();
  //     if (accounts.length === 0) {
  //       throw new Error('No accounts found in the wallet.');
  //     }

  //     setSelectedAccount(accounts[0]);
  //     setAddress(accounts[0].address);
  //     // setAddress(localStorageAddress);
  //     setIsConnected(true);
  //   }
  // };

  const handleConnect = useCallback(async (walletName: 'talisman' | 'subwallet-js') => {
    console.log(walletName);

    const extensions = await web3Enable('RealXDeal');
    if (extensions.length === 0) {
      toast.error('No Polkadot wallet extensions found!');
      return;
    }

    console.log(extensions);
    const extension = extensions.find(value => value.name === walletName);

    if (!extension) {
      toast.error('No Polkadot wallet extensions found!');
      return;
    }
    console.log(extension.name === walletName);

    const account = (await extension.accounts.get())[0];

    setSelectedAccount(extension);
    setAddress(account.address);
    localStorage.setItem('selectedWalletAddress', account.address);
    // setIsLoading(false);
    setIsConnected(true);
  }, []);

  const disconnectWallet = () => {
    setAddress('');
    localStorage.removeItem('selectedWalletAddress');
    setIsConnected(false);
    router.refresh();
  };

  const onReconnect = async () => {
    if (typeof window !== 'undefined') {
      // Code that accesses window or localStorage
      const localStorageAddress = localStorage.getItem('selectedWalletAddress');
      if (localStorageAddress) {
        setAddress(localStorageAddress);
        setIsConnected(true);
      }
    }
    // const localStorageAddress = localStorage.getItem('selectedWalletAddress');
    // if (localStorageAddress) {
    //   setAddress(localStorageAddress);
    //   setIsConnected(true);
    // }
  };

  useEffect(() => {
    onReconnect();
  }, []);

  return (
    <SubstrateContext.Provider
      value={{
        address,
        points: 0,
        isConnected,
        selectedAccount,
        handleConnect,
        disconnectWallet
      }}
    >
      {children}
    </SubstrateContext.Provider>
  );
}
