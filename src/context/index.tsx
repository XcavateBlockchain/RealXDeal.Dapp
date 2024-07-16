'use client';

import React, { useEffect } from 'react';
import { WalletContextProvider } from '@/providers/wallet-provider';
import { useRouter } from 'next/navigation';
import { ApiPromise, WsProvider } from '@polkadot/api';
import ApiSingleton from '@archisinal/contracts/dist/test/shared/api_singleton';
import { WalletContextInterface } from '@/context/wallet-context';

type TProps = {
  children: React.ReactNode;
};

export interface NodeContextInterface {
  nativeCurrency: string;
  subscanUrl: string;
  api: ApiPromise | null;
}

export function WalletProvider({ children }: TProps) {
  return <WalletContextProvider>{children}</WalletContextProvider>;
}

export const NodeContext = React.createContext<NodeContextInterface>({
  nativeCurrency: '',
  subscanUrl: '',
  api: null
});

export function NodeSocketProvider({ children }: TProps) {
  const [api, setApi] = React.useState<ApiPromise | null>(null);
  const [nativeCurrency, setNativeCurrency] = React.useState<string>('');
  const [subscanUrl, setSubscanUrl] = React.useState<string>('');
  const connect = async () => {
    const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_RPC!);

    const api = await ApiPromise.create({
      provider: wsProvider
    });

    await ApiSingleton.initWithApi(api);

    setApi(api);
    setNativeCurrency(api.registry.chainTokens[0]);
    if (api.registry.chainTokens[0] === 'SBY') {
      setSubscanUrl('https://shibuya.subscan.io/');
    } else if (api.registry.chainTokens[0] === 'ASTR') {
      setSubscanUrl('https://astar.subscan.io/');
    } else {
      setSubscanUrl('https://subscan.io/');
    }

    console.log('Connected to node: ' + process.env.NEXT_PUBLIC_RPC);
  };

  const disconnect = async () => {
    await ApiSingleton.disconnect();
    console.log('Disconnected from node: ' + process.env.NEXT_PUBLIC_RPC);
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_RPC) {
      console.error('Node wss:// URL is not set.');
      return;
    }

    connect();
    return () => {
      disconnect();
    };
  }, []);

  return (
    <NodeContext.Provider value={{ nativeCurrency, subscanUrl, api }}>
      {children}
    </NodeContext.Provider>
  );
}
