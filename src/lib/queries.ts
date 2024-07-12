import { getApi } from './polkadot';

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
  return output;
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
  return output;
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
