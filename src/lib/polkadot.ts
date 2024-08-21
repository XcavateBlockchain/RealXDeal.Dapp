import { ApiPromise, WsProvider } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';

export async function getApi() {
  await cryptoWaitReady();
  const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_RPC);
  const api = await ApiPromise.create({ provider: wsProvider });
  return api;
}
