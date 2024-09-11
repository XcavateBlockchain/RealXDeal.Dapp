import { Card } from '@/components/cards/card';
import { collections } from '@/config/site';
import CollectionBadge from './_components/collection-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCookieStorage } from '@/lib/storage';
import { getUnlistedNFTsForUser } from '@/lib/queries';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { OwnedNFTCard } from '@/components/cards/owned-nft-card';

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

  // console.log(nfts);

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
          <TabsTrigger value="listed">Listed</TabsTrigger>
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
      </Tabs>
    </>
  );
}
