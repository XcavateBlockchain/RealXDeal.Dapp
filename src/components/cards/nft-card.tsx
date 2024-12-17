'use client';

import { cn, formatAddress } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '../ui/alert-dialog';
import { collection } from '@/config/site';
import { useWalletContext } from '@/context/wallet-context';
import React from 'react';
import { Icons } from '../icons';
import { makeOffer } from '@/lib/extrinsic';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CollectionItem } from '@/types';
import SwapCard from './swap-card';
import { getCollection } from '@/lib/queries';
import { ScrollArea } from '../ui/scroll-area';

interface NFTCardProps {
  listingId: string;
  collectionId: keyof typeof collection;
  nftId: string;
  owner: string;
  metadata: CollectionItem;
  isShadow?: boolean;
  playerNfts: any;
}

export function NFTCard({ metadata, isShadow, playerNfts, ...nft }: NFTCardProps) {
  const [showSwapDialog, setShowSwapDialog] = React.useState<boolean>(false);
  // const metadata = collection[nft.collectionId];
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

        <div className="flex flex-col gap-2.5 px-[17px] pb-[17px]">
          <div className="flex items-center justify-between">
            <div className="space-x-1 text-[0.9rem] font-light">
              <span className="group-hover:text-primary-300">#{nft.nftId}</span> |{' '}
              <span className="ml-[2px]">{metadata.collectionName}</span>
            </div>
            <Button variant={'card'} size={'nft'} onClick={() => setShowSwapDialog(true)}>
              Swap
            </Button>
          </div>

          <div className="flex items-center justify-between text-[0.9rem] font-light">
            <span>{formatAddress(nft.owner)}</span>
          </div>
        </div>
      </div>
      <AlertDialog open={showSwapDialog} onOpenChange={setShowSwapDialog}>
        <AlertDialogContent className="flex w-full max-w-5xl flex-col gap-2 rounded-lg px-6 py-6">
          <div className="relative flex items-center justify-between">
            <AlertDialogTitle>Select what to swap with</AlertDialogTitle>
            <Button
              type="button"
              variant={'text'}
              size={'icon'}
              className="group"
              onClick={() => setShowSwapDialog(false)}
            >
              <Icons.close className="size-6 group-hover:stroke-primary-300" />
            </Button>
          </div>
          <ScrollArea className="h-[550px] w-full">
            <div className="grid grid-cols-4 gap-4">
              {playerNfts.length > 0 ? (
                playerNfts.map(async (item: any[]) => {
                  const collection = await getCollection();
                  return (
                    <SwapCard
                      key={item[0]}
                      collectionId={item[1]}
                      nftId={item[2]}
                      metadata={collection[item[1]]}
                      swapId={nft.listingId}
                    />
                  );
                })
              ) : (
                <p>You do not have any card to swap</p>
              )}
            </div>
          </ScrollArea>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
