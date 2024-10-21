import { Card } from '@/components/cards/card';
import { collections } from '@/config/site';
import CollectionBadge from './_components/collection-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCookieStorage } from '@/lib/storage';
import {
  getAllListingsByAddress,
  getAllOffersByAddress,
  getUnlistedNFTsForUser
} from '@/lib/queries';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { OwnedNFTCard } from '@/components/cards/owned-nft-card';
import { DeListNFTCard } from '@/components/cards/unlist-nft-card';
import { ReceivedOffersTable } from './_components/recived-offers-table';

export default async function Page({
  searchParams: { collection }
}: {
  searchParams: { collection: string };
}) {
  // const { address } = await getUser();
  const address = await getCookieStorage('accountKey');
  const tabs = ['All', 'Blue', 'Red', 'Pink', 'Orange', 'Purple', 'Teal', 'Coral'];
  const BASE_URL = '/profile';
  const selected = collection === undefined ? 'All' : collection;

  const nfts = await getUnlistedNFTsForUser(address ? address : '');
  const listed = await getAllListingsByAddress(address);
  const listings = listed.flatMap(item => {
    const [listingId, details] = Object.entries(item)[0];
    return [
      {
        listingId,
        ...(typeof details === 'object' && details !== null ? details : {})
      }
    ];
  });

  const offers = await getAllOffersByAddress(address);

  console.log(offers);

  return (
    <>
      <Card className="mt-10 w-full gap-10" title="Gallery">
        <div className="flex w-full items-center justify-between">
          {collections.map((collection: any) => {
            return (
              <CollectionBadge
                key={collection.collectionName}
                variant={collection.collectionName}
                color={collection.collectionName}
              >
                {collection.collectionName}
              </CollectionBadge>
            );
          })}
        </div>
      </Card>

      <Tabs defaultValue="nfts">
        <TabsList>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
          <TabsTrigger value="listed_nft">Listed</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
        </TabsList>
        <TabsContent value={'nfts'}>
          <section className="flex w-full flex-col space-y-10 py-10">
            <div className="flex gap-3">
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
                    <Link href={`${BASE_URL}?collection=${collection}`}>{collection}</Link>
                  </Button>
                );
              })}
            </div>
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
        </TabsContent>
        <TabsContent value="listed_nft">
          <section className="flex w-full flex-col space-y-10 py-10">
            <div className="grid size-full grid-cols-4 gap-[23px]">
              {listings.map((listing: any) => (
                <DeListNFTCard
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
        </TabsContent>
        <TabsContent value="offers">
          <section className="flex w-full flex-col space-y-10 py-10">
            <Tabs defaultValue="received_offers">
              <TabsList variant={'pill'}>
                <TabsTrigger variant={'pill'} value="received_offers">
                  Received offers
                </TabsTrigger>
                <TabsTrigger variant={'pill'} value="sent_offers">
                  Sent offers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="received_offers">
                <ReceivedOffersTable />
              </TabsContent>
            </Tabs>
          </section>
        </TabsContent>
      </Tabs>
    </>
  );
}
