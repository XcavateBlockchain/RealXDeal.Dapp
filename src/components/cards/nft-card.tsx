import { cn, formatAddress } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { collection } from '@/config/site';

interface NFTCardProps {
  listingId: string;
  collectionId: keyof typeof collection;
  nftId: string;
  owner: string;
  isShadow?: boolean;
}

export function NFTCard({ isShadow, ...nft }: NFTCardProps) {
  const metadata = collection[nft.collectionId];
  return (
    <div
      // href={`/nft/${nft.nftId}`}
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
          <Button variant={'card'} size={'nft'}>
            Swap
          </Button>
        </div>

        <div className="flex items-center justify-between text-[0.9rem] font-light">
          <span>{formatAddress(nft.owner)}</span>
        </div>
      </div>
    </div>
  );
}
