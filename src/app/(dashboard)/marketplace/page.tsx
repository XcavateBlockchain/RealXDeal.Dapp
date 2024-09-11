import { Card } from '@/components/cards/card';
import { NFTCard } from '@/components/cards/nft-card';
import { Shell } from '@/components/shell';
import { Button } from '@/components/ui/button';
// import { siteConfig } from '@/config/site';
import { getAllListings } from '@/lib/queries';
import Image from 'next/image';
import Link from 'next/link';

const collections = ['All', 'Blue', 'Red', 'Pink', 'Orange', 'Purple', 'Teal', 'Coral'];

export default async function Page({
  searchParams: { collection }
}: {
  searchParams: { collection: string };
}) {
  // const data = siteConfig.nfts.slice(1, 5);

  const BASE_URL = '/marketplace';
  const selected = collection === undefined ? 'All' : collection;

  const nfts = await getAllListings();

  const listings = nfts.flatMap(item => {
    const [listingId, details] = Object.entries(item)[0];
    return [
      {
        listingId,
        ...(typeof details === 'object' && details !== null ? details : {})
      }
    ];
  });

  return (
    <Shell>
      {/* <Card title="Trending">
        <div className="grid size-full grid-cols-4 gap-[13px]">
          {data.map((nft: any) => (
            <NFTCard
              key={nft.nftId}
              nftId={nft.nftId}
              image={nft.image}
              owner={nft.owner}
              type={nft.type}
            />
          ))}
        </div>
      </Card> */}
      <section className="flex w-full gap-[120px] py-[30px]">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-lg border border-border bg-primary px-4 py-2 placeholder:text-border focus:outline-none"
        />
        <div className="flex items-center gap-[18px]">
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
                <Link href={`/marketplace?collection=${collection}`}>{collection}</Link>
              </Button>
            );
          })}
        </div>
      </section>

      <section className="flex w-full flex-col gap-8 pb-10">
        <h2 className="text-[1rem] font-medium">Listings</h2>

        <div className="grid size-full grid-cols-4 gap-[23px]">
          {listings.map((listing: any) => (
            <NFTCard
              key={listing.listingId}
              listingId={listing.listingId}
              owner={listing.owner}
              collectionId={listing.collectionId}
              nftId={listing.itemId}
              isShadow
            />
          ))}
        </div>
      </section>
    </Shell>
  );
}
