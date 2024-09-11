'use client';

import { collection } from '@/config/site';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '../ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '../ui/alert-dialog';
import React, { useContext, useState } from 'react';
import { Icons } from '../icons';
import { listNFT } from '@/lib/extrinsic';
import { toast } from 'sonner';
import { WalletContext } from '@/context/wallet-context';

interface NFTCardProps {
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

export function OwnedNFTCard({ isShadow, ...nft }: NFTCardProps) {
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const walletContext = useContext(WalletContext);
  const selectedAddress = walletContext.selectedAccount?.[0]?.address as string;
  const metadata = collection[nft.collectionId] as Collection;

  async function onListNFT() {
    setIsLoading(true);
    const { data, error } = await listNFT(
      selectedAddress,
      Number(nft.collectionId),
      Number(nft.nftId)
    );
    if (error) {
      setIsLoading(false);
      toast.error(error);
      return;
    }

    if (data) {
      setIsLoading(false);
      setShowDialog(true);
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
            List
          </Button>
        </div>
      </div>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="flex w-[518px] flex-col gap-2 rounded-lg px-6 py-6">
          <AlertDialogTitle hidden>Success modal</AlertDialogTitle>
          <div className="flex items-center justify-end">
            <Button variant={'text'} size={'icon'} onClick={() => setShowDialog(false)}>
              <Icons.close className="size-6 hover:stroke-primary-300" />
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <div
              className="flex h-[320px] w-[239px] items-center justify-center rounded-[10px] bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${metadata.nftImage})` }}
            >
              <div className="size-[140px] rounded-full bg-primary-300/15"></div>
            </div>
            <h2 className="text-[17px]/[24px] font-medium">NFT listed </h2>
            <p className="text-center text-[17px]/[24px] font-light">
              The {metadata.collectionName} NFT is now available for swapping on the
              marketplace
            </p>
            <Button
              className="px-6 py-[18px] text-[16px]/[19px]"
              onClick={() => setShowDialog(false)}
            >
              Continue
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
