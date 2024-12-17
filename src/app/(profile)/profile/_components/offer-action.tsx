'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { WalletContext } from '@/context/wallet-context';
import { handleOffer } from '@/lib/extrinsic';
import { cn } from '@/lib/utils';
import { error } from 'console';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { toast } from 'sonner';

export const HandleOffer = ({ offerId, type }: { offerId: number; type: number }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const walletContext = useContext(WalletContext);
  const selectedAddress = walletContext.selectedAccount?.[0]?.address as string;

  async function onHandleOffer() {
    setIsLoading(true);
    try {
      const offer = await handleOffer({ senderAddress: selectedAddress, offerId, type });
      if (offer.error) {
        setIsLoading(false);
        toast.warning(offer.error);
        return;
      }
      setIsLoading(false);
      toast.success(`${type === 0 ? 'Swap complete' : 'Offer rejected'}`);
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      toast.error('Error', { description: 'Could not process your request please try again' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      size={'md'}
      className={cn('border-[#FF8A00] text-[#FF8A00]', {
        'border-[#78B36E] text-[#78B36E]': type === 0
      })}
      disabled={isLoading}
      onClick={onHandleOffer}
    >
      {isLoading && <Icons.spinner className="size-4 animate-spin" aria-hidden="true" />}
      {type === 0 ? 'Accept' : 'Reject'}
    </Button>
  );
};
