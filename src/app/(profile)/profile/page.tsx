import { Card } from '@/components/cards/card';
import CollectionBadge from './_components/collection-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCookieStorage } from '@/lib/storage';
import {
  getAllCollections,
  getAllListingsByAddress,
  getAllOffersByAddress,
  getCollection,
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
  const collections = await getAllCollections();
  const tabs = ['All', ...collections.map(collection =>
    collection.name.charAt(0).toUpperCase() +
    collection.name.charAt(1).toUpperCase() +
    collection.name.slice(2)
  )];
  const BASE_URL = '/profile';
  const selected = collection === undefined ? 'All' : collection;
  const selectedCollection = collections.find(
    collection => collection.name.toLowerCase() === selected.toLowerCase());
  const nfts = await getUnlistedNFTsForUser(address ? address : '');
  const filterNfts = selectedCollection ?
    nfts.filter(nft => nft[1] == selectedCollection.collectionId) :
    nfts;
    
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

  // console.log(offers);

  return (
    <>
      <Card className="mt-10 w-full gap-10" title="Gallery">
        <div className="flex w-full items-center justify-between">
          {collections.map((collection: any) => {
            return (
              <CollectionBadge
                key={collection.name}
                variant={collection.name.toLowerCase()}
                color={collection.name}
              >
                {collection.name}
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
              {/* {nfts.map(async (nft: any[]) => { 
                  const collection = await  getCollection();

                  // console.log(dynamicCollection);
                return(
                <OwnedNFTCard
                  key={nft[0]}
                  owner={nft[0]}
                  collectionId={nft[1]}
                  nftId={nft[2]}
                  metadata={collection}
                  isShadow
                />
              )})} */}
              {await Promise.all(
                filterNfts.map(async (nft: any[]) => {
                  const collection = await getCollection();
                  return (
                    <OwnedNFTCard
                      key={nft[0]}
                      owner={nft[0]}
                      collectionId={nft[1]}
                      nftId={nft[2]}
                      metadata={collection[nft[1]]}
                      isShadow
                    />
                  );
                })
              )}
            </div>
          </section>
        </TabsContent>
        <TabsContent value="listed_nft">
          <section className="flex w-full flex-col space-y-10 py-10">
            <div className="grid size-full grid-cols-4 gap-[23px]">
              {await Promise.all(
                listings.map(async (listing: any) => {
                  const collection = await getCollection();
                  return (
                    <DeListNFTCard
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
              )}
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
