import { Card } from '@/components/cards/card';
import { NFTCard } from '@/components/cards/nft-card';
import { Shell } from '@/components/shell';
import { Button } from '@/components/ui/button';
// import { siteConfig } from '@/config/site';
import { getAllCollections, getAllListings, getCollection } from '@/lib/queries';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page({
  searchParams: { collection }
}: {
  searchParams: { collection: string };
}) {
  // const data = siteConfig.nfts.slice(1, 5);

  const BASE_URL = '/marketplace';
  const collections = await getAllCollections();
  const tabs = ['All', ...collections.map(collection =>
    collection.name.charAt(0).toUpperCase() +
    collection.name.charAt(1).toUpperCase() +
    collection.name.slice(2)
  )];
  const selected = collection === undefined ? 'All' : collection;
  const selectedCollection = collections.find(
    collection => collection.name.toLowerCase() === selected.toLowerCase());
  const nfts = await getAllListings();

  const filterNfts = selectedCollection ?
    nfts.filter((nft: any) => {
      const firstKey = Object.keys(nft)[0];
      const metadata = nft[firstKey];
      return metadata.collectionId == selectedCollection.collectionId
    }) : nfts;

  const listings = filterNfts.flatMap(item => {
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
          {tabs.map((collection: string) => {
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
          {listings.length > 0 ? await Promise.all(
            listings.map(async (listing: any) => {
              const collection = await getCollection();
              return (
                <NFTCard
                  key={listing.listingId}
                  listingId={listing.listingId}
                  owner={listing.owner}
                  collectionId={listing.collectionId}
                  nftId={listing.itemId}
                  metadata={collection[listing.collectionId]}
                  isShadow
                />
              );
            })
          ) : (<p>There are no listings.</p>)}
        </div>
      </section>
    </Shell>
  );
}
