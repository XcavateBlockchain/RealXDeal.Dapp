'use client';

import { useEffect, useState } from 'react';
import { WalletContext } from '@/context/wallet-context';
import Image from 'next/image';
import Link from 'next/link';
import WalletConnect from '../wallet-connect/wallet-connect';
import { useRouter } from 'next/navigation';

type HeaderProps = {
  open: boolean;
  closeModalNavigationPath?: string;
};

export default function DashboardSiteHeader({
  open = false,
  closeModalNavigationPath = '/'
}: HeaderProps) {
  const router = useRouter();
  const [walletModal, showModal] = useState(open);

  useEffect(() => {
    showModal(open);
  }, [open]);

  // useEffect(() => {
  //   if (open === true)
  //   router.push(closeModalNavigationPath);
  // });

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
      <WalletConnect open={walletModal} />
    </div>
  );
}
