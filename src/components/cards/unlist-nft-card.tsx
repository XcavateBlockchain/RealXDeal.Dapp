'use client';

import { collection } from '@/config/site';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '../ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '../ui/alert-dialog';
import React, { useContext, useState, useTransition } from 'react';
import { Icons } from '../icons';
import { delistNFT } from '@/lib/extrinsic';
import { toast } from 'sonner';
import { WalletContext } from '@/context/wallet-context';
import { useRouter } from 'next/navigation';

interface NFTCardProps {
  listingId: string;
  collectionId: keyof typeof collection;
  nftId: string;
  owner: string;
  isShadow?: boolean;
}

type Collection = {
  collectionName: string;
  collectionId: number;
  nftImage: string;
};

export function DeListNFTCard({ isShadow, ...nft }: NFTCardProps) {
  const router = useRouter();
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const walletContext = useContext(WalletContext);
  const selectedAddress = walletContext.selectedAccount?.[0]?.address as string;
  const metadata = collection[nft.collectionId] as Collection;

  async function onListNFT() {
    setIsLoading(true);
    try {
      await delistNFT(selectedAddress, parseInt(nft.listingId));
      toast.success('NFT un-listed successfully!');
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      toast.error('Error', { description: 'Could not process your request please try again' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div
        className={cn(
          'group flex w-full flex-col gap-4 rounded-lg border border-primary-300/[0.32] transition-all duration-300',
          isShadow ? 'shadow-header' : ''
        )}
      >
        <div className="relative h-[234px] w-full">
          <Image
            src={metadata.nftImage}
            alt="nft"
            width={264}
            height={234}
            className="absolute top-0 h-[234px] w-full rounded-t-lg object-cover"
            priority
          />
        </div>

        <div className="flex justify-between gap-2.5 px-[17px] pb-[17px]">
          <div className="space-x-1 text-[0.9rem] font-light">
            <span className="group-hover:text-primary-300">#{nft.nftId}</span> |{' '}
            <span className="ml-[2px]">{metadata.collectionName}</span>
          </div>
          <Button variant={'card'} size={'nft'} onClick={onListNFT} disabled={isLoading}>
            {isLoading && <Icons.spinner className="size-4 animate-spin" aria-hidden="true" />}
            Un-List
          </Button>
        </div>
      </div>
    </>
  );
}
