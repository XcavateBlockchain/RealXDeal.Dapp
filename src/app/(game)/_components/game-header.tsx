'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { WalletContext } from '@/context/wallet-context';
import WalletConnect from '@/components/wallet-connect/wallet-connect';

type GameHeaderProps = {
  points: any;
  open: boolean;
  closeModalNavigationPath?: string;
};

export default function GameHeader({
  points,
  open = false,
  closeModalNavigationPath = '/'
}: GameHeaderProps) {
  const router = useRouter();
  const [walletModal, showModal] = useState(open);

  useEffect(() => {
    showModal(open);
  }, [open]);

  return (
    <div className="container mx-auto flex w-full max-w-screen-2xl items-center justify-between border-b border-border px-4 py-2 lg:px-[50px] xl:px-[100px]">
      {!walletModal ? <WalletConnect /> : null}
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
      {walletModal ? (
        <WalletConnect open={walletModal} />
      ) : (
        <div className="space-x-2 text-[1.0625rem]/[1.5rem] font-light">
          <span>Points:</span>
          <span className="text-primary-400">{points}X</span>
        </div>
      )}
    </div>
  );
}
