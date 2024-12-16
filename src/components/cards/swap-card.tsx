import { useState } from 'react';
import { collection } from '@/config/site';
import { CollectionItem } from '@/types';
import Image from 'next/image';
import { Button } from '../ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '../ui/alert-dialog';
import { Icons } from '../icons';
import { makeOffer } from '@/lib/extrinsic';
import { toast } from 'sonner';
import { useWalletContext } from '@/context/wallet-context';
import { useRouter } from 'next/navigation';

interface NFTCardProps {
  collectionId: keyof typeof collection;
  nftId: string;
  swapId: string;
  metadata: CollectionItem;
}

export default function SwapCard({ metadata, swapId, ...nft }: NFTCardProps) {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const walletContext = useWalletContext();
  const selectedAddress = walletContext.selectedAccount?.[0]?.address as string;

  async function handleMakeOffer() {
    setIsLoading(true);
    try {
      const result: any = await makeOffer(selectedAddress, {
        listingId: parseInt(swapId),
        collectionId: parseInt(nft.collectionId),
        itemId: parseInt(nft.nftId)
      });
      if (result.error) {
        toast.error(`${result.error}`);
        setIsLoading(false);
        setShowDialog(false);
        return;
      }
      setShowDialog(true);
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
      <div className="group flex w-full flex-col gap-3 rounded-lg border border-primary-300/[0.32] transition-all duration-300">
        <div className="relative h-[194px] w-full">
          <Image
            src={metadata.nftImage}
            alt="nft"
            width={194}
            height={172}
            className="absolute top-0 h-[194px] w-full rounded-t-lg object-cover"
            priority
          />
        </div>

        <div className="flex items-center justify-between px-3 pb-3">
          <div className="space-x-1 text-[0.9rem] font-light">
            <span className="group-hover:text-primary-300">#{nft.nftId}</span> |{' '}
            <span className="ml-[2px]">{metadata.collectionName}</span>
          </div>
          <Button variant={'card'} size={'nft'} onClick={handleMakeOffer} disabled={isLoading}>
            {isLoading && <Icons.spinner className="size-4 animate-spin" aria-hidden="true" />}
            Swap
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
            <h2 className="text-[17px]/[24px] font-medium">Swap offer sent</h2>
            <p className="text-center text-[17px]/[24px] font-light">
              Your offer has been sent to the owner of this NFT wait for it’s approval
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
