import { Wallet, WalletAccount } from '@subwallet/wallet-connect/types';
import React, { useContext } from 'react';

export interface WalletContextInterface {
  wallet?: Wallet;
  accounts: WalletAccount[];
  setWallet: (wallet: Wallet | undefined, walletType: 'substrate' | 'evm') => void;
  walletType: 'substrate' | 'evm';
  selectAccount: (value: string) => void;
  selectedAccount: WalletAccount[] | null;
  disconnectWallet: () => Promise<void>;
  balance: string | null;
  setBalance: (balance: string | null) => void;
  registerPlayer: boolean;
  setRegisterPlayer: (value: boolean) => void;
}

export const WalletContext = React.createContext<WalletContextInterface>({
  accounts: [],
  setWallet: (wallet, walletType: 'substrate' | 'evm') => {},
  walletType: 'substrate',
  selectedAccount: null,
  selectAccount: (v: string) => {},
  disconnectWallet: () => Promise.resolve(),
  balance: null,
  setBalance: (balance: string | null) => {},
  registerPlayer: false,
  setRegisterPlayer: () => {}
});

interface OpenSelectWalletInterface {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const OpenSelectWallet = React.createContext<OpenSelectWalletInterface>({
  isOpen: false,
  open: () => {},
  close: () => {}
});

export function useWalletContext() {
  return useContext(WalletContext);
}
