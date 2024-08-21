import { Card } from '@/components/cards/card';
import { Shell } from '@/components/shell';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { CircleCard, ProfileHeader } from './_components/profile-header';
import { getUnlistedNFTsForUser } from '@/lib/queries';
import { OwnedNFTCard } from '@/components/cards/owned-nft-card';
import { getCookieStorage } from '@/lib/storage';

interface ProfileNFTCardProps {
  image: string;
  nftId: number;
  owner: string;
  type: 'blue' | 'green';
  time?: any;
  isShadow?: boolean;
}

const collections = ['All', 'Blue', 'Red', 'Pink', 'Orange', 'Purple', 'Teal', 'Coral'];

const ProfileNFTCard = ({ isShadow, ...nft }: ProfileNFTCardProps) => {
  return (
    <Link
      href={`/nft/${nft.nftId}`}
      className={cn(
        'group flex w-full flex-col gap-4 rounded-lg border border-primary-300/[0.32] transition-all duration-300',
        isShadow ? 'shadow-header' : ''
      )}
    >
      <div className="relative h-[234px] w-full">
        <Image
          src={nft.image}
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
          <span className="ml-[2px]">{nft.type}</span>
        </div>
        <button className="rounded-md border border-[#DC7DA6] px-3 py-1 text-sm font-light text-[#DC7DA6] shadow-md">
          List
        </button>
      </div>
    </Link>
  );
};

export default async function Page({
  searchParams: { collection }
}: {
  searchParams: { collection: string };
}) {
  // const { address } = await getUser();
  const address = await getCookieStorage('accountKey');
  const BASE_URL = '/profile';
  const selected = collection === undefined ? 'All' : collection;

  const nfts = await getUnlistedNFTsForUser(address ? address : '');

  console.log(nfts);
  return (
    <>
      <Shell>
        <ProfileHeader />
        <Card className="mt-10 w-full gap-2" title="Gallery">
          <div className="mt-3 flex gap-3">
            <CircleCard color="#ECB278" />
            <CircleCard color="#57A0C5" />
            <CircleCard color="#57A0C5" />
            <CircleCard color="#78B36E" />
            <CircleCard color="#57A0C5" />
          </div>
        </Card>
        <section>
          <ul className="flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <li>
              <Link href="/" className="inline-block p-2 py-3 font-normal text-[#FFFFFF]">
                Nfts
              </Link>
              <span className="mx-0 inline-flex size-5 items-center justify-center rounded-md bg-[#DC7DA6] text-[10px] font-normal text-[#FFFFFF]">
                23
              </span>
            </li>
            <li>
              <Link href="/" className="inline-block p-2 py-3 font-normal text-[#FFFFFF]">
                Listed
              </Link>
              <span className="mx-0 inline-flex size-5 items-center justify-center rounded-md bg-[#DC7DA6] text-[10px] font-normal text-[#FFFFFF]">
                0
              </span>
            </li>
            <li>
              <Link href="/" className="inline-block p-2 py-3 font-normal text-[#FFFFFF]">
                Offers
              </Link>
              <span className="mx-0 inline-flex size-5 items-center justify-center rounded-md bg-[#DC7DA6] text-[10px] font-normal text-[#FFFFFF]">
                4
              </span>
            </li>
            <li className="">
              <Link href="/" className="inline-block p-2 py-3 font-normal text-[#FFFFFF]">
                Challenges{' '}
                <span className="mx-0 inline-flex size-5 items-center justify-center rounded-md bg-[#DC7DA6] text-[10px] font-normal text-[#FFFFFF]">
                  20
                </span>
              </Link>
            </li>
          </ul>
        </section>
        <div className="flex gap-3">
          {collections.map((collection: string) => {
            const active = selected === collection;
            return (
              <Button
                key={collection}
                variant={'outline'}
                size={'sm'}
                className={
                  active ? 'border-primary-300 bg-primary-300/15 text-primary-300' : ''
                }
                asChild
              >
                <Link href={`${BASE_URL}?collection=${collection}`}>{collection}</Link>
              </Button>
            );
          })}
        </div>
        <section className="flex w-full flex-col gap-8">
          <div className="grid size-full grid-cols-4 gap-[23px]">
            {nfts.map((nft: any[]) => (
              <OwnedNFTCard
                key={nft[0]}
                owner={nft[0]}
                collectionId={nft[1]}
                nftId={nft[2]}
                isShadow
              />
            ))}
          </div>
        </section>
      </Shell>
    </>
  );
}
