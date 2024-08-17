'use client';

import { WalletContext } from '@/context/wallet-context';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import WalletConnect from '../wallet-connect/wallet-connect';

export default function DashboardSiteHeader() {
  const walletContext = useContext(WalletContext);
  const selectedAddress = walletContext.selectedAccount?.[0]?.address;
  return (
    <div className="container mx-auto flex w-full max-w-screen-2xl items-center justify-between border-b border-border px-4 py-2 lg:px-[50px] xl:px-[100px]">
      <Link href={'/'}>
        <Image
          src={'/images/logo.svg'}
          alt="logo"
          width={183}
          height={50}
          className="hidden lg:block"
          priority
        />
        <Image
          src={'/images/logo.svg'}
          alt="logo"
          width={114}
          height={45}
          className="block lg:hidden"
          priority
        />
      </Link>
      <WalletConnect open={selectedAddress ? false : true} />
    </div>
  );
}
