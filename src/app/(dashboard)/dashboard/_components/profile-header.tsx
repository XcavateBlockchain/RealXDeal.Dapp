'use client';

// import ConnectWallet from '@/components/layouts/connect-wallet';
import WalletConnect from '@/components/wallet-connect/wallet-connect';
import { useSubstrateContext } from '@/context/polkadot-contex';
import { WalletContext } from '@/context/wallet-context';
import { formatAddress } from '@/lib/formaters';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import { useContext } from 'react';

export default function ProfileHeader({ points }: { points: number }) {
  const walletContext = useContext(WalletContext);
  const selectedAddress = walletContext.selectedAccount?.[0]?.address;

  return (
    <div className="flex w-full items-center justify-between pb-5">
      <div className="flex items-center gap-[17px]">
        <Image
          src={'/images/profile.jpeg'}
          alt="profile"
          width={53}
          height={53}
          className="rounded-full border-4 border-primary-400 shadow-profile"
          priority
        />
        <div>
          <span className="rounded-3xl bg-[#DC7DA6]/[0.25] px-2 py-[2px] text-[0.875rem]/[0.025rem] font-extralight">
            {formatAddress(selectedAddress)}
          </span>
        </div>
      </div>
      {selectedAddress ? (
        <div className="space-x-2 text-[1.0625rem]/[1.5rem] font-light">
          <span>Points:</span>
          <span className="text-primary-400">{points}X</span>
        </div>
      ) : (
        <WalletConnect open={selectedAddress ? false : true} />
      )}
    </div>
  );
}
