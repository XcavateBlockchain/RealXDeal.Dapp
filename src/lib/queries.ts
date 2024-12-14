import { collectionImage } from '@/config/site';
import { getApi } from './polkadot';
import { Collection, CollectionItem } from '@/types';

export async function getAvailableNFTs(collectionId?: number) {
  const api = await getApi();
  const result = await api.query.gameModule.collectionColor(collectionId);
  const output = result.toHuman();
  return output;
}

export async function getLeadBoards() {
  const api = await getApi();
  const result = await api.query.gameModule.leaderboard();
  const output = result.toHuman();
  return output as [];
}

export async function getNextGameID() {
  const api = await getApi();
  const result = await api.query.gameModule.gameId();
  const output = result.toHuman();
  return output;
}

export async function getCurrentRoundID() {
  const api = await getApi();
  const result = await api.query.gameModule.currentRound();
  const output = result.toHuman();
  return output;
}

export async function getGameInfo(gameId: number) {
  const api = await getApi();
  // const apiAt = await api.at(
  //   '0x163029d36e699bbb6df2e449a5015efab1168092c9df385913ca7e6f5f0b3685'
  // );

  const result = await api.query.gameModule.gameInfo(gameId);
  const output = result.toHuman();
  return output;
}

export async function getUserData(address: string) {
  const api = await getApi();
  const result = await api.query.gameModule.users(address);
  const output = result.toHuman();
  return output as any;
}

export async function getListings() {
  const api = await getApi();
  const result = await api.query.gameModule.listings();
  const output = result.toHuman();
  return output;
}

export async function getGamesExpiring(gameId: number) {
  const api = await getApi();
  const result = await api.query.gameModule.gamesExpiring(gameId);
  const output = result.toHuman();
  return output;
}

export async function getNextColorId(id: number) {
  const api = await getApi();
  const result = await api.query.gameModule.nextColorId(id);
  const output = result.toHuman();
  return output;
}

export async function getNextListingId() {
  const api = await getApi();
  const result = await api.query.gameModule.nextListingId();
  const output = result.toHuman();
  return output;
}
export async function getNextOfferId() {
  const api = await getApi();
  const result = await api.query.gameModule.nextOfferId();
  const output = result.toHuman();
  return output;
}

export async function getOffers(id: number) {
  const api = await getApi();
  const result = await api.query.gameModule.offers(id);
  const output = result.toHuman();
  return;
}

export async function getPalletVersion() {
  const api = await getApi();
  const result = await api.query.gameModule.palletVersion();
  const output = result.toHuman();
  return output;
}

export async function isRoundActive() {
  const api = await getApi();
  const result = await api.query.gameModule.roundActive();
  const output = result.toHuman();
  return output;
}

export async function getRoundChampion(id: number) {
  const api = await getApi();
  const result = await api.query.gameModule.roundChampion(id);
  const output = result.toHuman();
  return output;
}

export async function getGameProperties() {
  const api = await getApi();
  const result = await api.query.gameModule.gameProperties();
  const output = result.toHuman();
  return output;
}

export async function getCollectionColor(id: number) {
  const api = await getApi();
  const result = await api.query.gameModule.collectionColor(id);
  const output = result.toHuman();
  return output;
}

const colourTocollectionId: Record<string, number> = {
  xcyan: 3,
  xpink: 1,
  xgreen: 7,
  xpurple: 5,
  xblue: 2,
  xleafgreen: 6,
  xorange: 0,
  xcoral: 4
};

export async function getUnlistedNFTsForUser(address: string) {
  const api = await getApi();
  const data = await api.query.nfts.account.entries(address);

  const nftData = data.map(([key, exposure]) => {
    return key.args.map(k => k.toHuman());
  });

  return nftData;
  // [{collectionID: number, itemId: number},...]
  // [[address, collection_id, item_id], ...]
}

export async function getAllUnlistedNFTs() {
  const api = await getApi();
  const data = await api.query.nfts.account.entries();

  const nftData = data.map(([key, exposure]) => {
    return key.args.map(k => k.toHuman());
  });

  return nftData;
  // [{collectionID: number, itemId: number},...]
  // [[address, collection_id, item_id], ...]
}

export async function getAllListings() {
  const api = await getApi();
  const data = await api.query.gameModule.listings.entries();

  const listingData = data.map(([key, exposure]) => {
    let listingId = key.args[0].toHuman() as number;
    return { [listingId]: exposure.toHuman() };
  });

  return listingData;
  // [{listingId: {owner, collectionId, itemId}}, ...]
}

export async function getAllListingsByAddress(address?: string) {
  const api = await getApi();
  const data = await api.query.gameModule.listings.entries();

  const listingDataForAccount = data
    .filter(([key, exposure]) => {
      const listingData = exposure.toHuman() as { owner: string };
      return listingData.owner == address;
    })
    .map(([key, exposure]) => {
      let listingId = key.args[0].toHuman() as number;
      return { [listingId]: exposure.toHuman() };
    });

  return listingDataForAccount;
  // [{listingId: {owner, collectionId, itemId}}, ...]
}
export async function getAllOffersByAddress(address?: string) {
  const api = await getApi();
  const data = await api.query.gameModule.offers.entries();

  const offersDataForAccount = data
    .filter(([key, exposure]) => {
      const listingData = exposure.toHuman() as { owner: string };
      return listingData.owner == address;
    })
    .map(([key, exposure]) => {
      let listingId = key.args[0].toHuman() as number;
      return { [listingId]: exposure.toHuman() };
    });

  return offersDataForAccount;
}

/*

NFTCollection => collection id

GetNftsForUser
List Nft
Delist Nft
Make Offer
Accept Offer
Withdraw Offer
GetAllListings
GetAllListingsFor

*/

export async function getAllCollections() {
  const api = await getApi();
  const data = await api.query.gameModule.collectionColor.entries();

  return data.map(([key, exposure]) => {
    return { collectionId: key.args[0].toHuman(), name: exposure.toHuman() };
  }) as Collection[];
}

type DynamicCollection = Record<string, CollectionItem>;

export async function getCollection(): Promise<DynamicCollection> {
  const collections = await getAllCollections();
  const dynamicCollection: DynamicCollection = {};

  collections.forEach((collection: any, index) => {
    const collectionName = collection.name.toLowerCase();

    dynamicCollection[collection.collectionId.toString()] = {
      collectionName,
      collectionId: parseInt(collection.collectionId),
      nftImage: collectionImage[collectionName as keyof typeof collectionImage].nftImage
    };
  });

  return dynamicCollection;
}
