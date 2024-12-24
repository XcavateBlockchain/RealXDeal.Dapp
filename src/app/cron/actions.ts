import { ApiPromise } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { KeyringPair } from '@polkadot/keyring/types';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { getApi } from '@/lib/polkadot';
import { Json } from '@polkadot/types';
import { fetchAllProperties } from '../actions';

interface PropertyData {
  id: string | number;
  encryptedData: any;
}

interface AddPropertyResult {
  propertyId: string | number;
  message: string;
}

const TRANSACTION_TIMEOUT = 60000; // 60 seconds

async function initializeAccount(keyring: Keyring): Promise<KeyringPair> {
  if (!process.env.ENCODED_SEED || !process.env.SUDO_ADDRESS || !process.env.PASSPHRASE) {
    throw new Error('Missing required environment variables');
  }

  const account = keyring.createFromJson({
    encoded: process.env.ENCODED_SEED,
    encoding: {
      content: ['pkcs8', 'sr25519'],
      type: ['scrypt', 'xsalsa20-poly1305'],
      version: '3'
    },
    address: process.env.SUDO_ADDRESS,
    meta: {
      genesisHash: '0x',
      name: 'XCAV-SUDO',
      whenCreated: 1702476542911
    }
  });

  account.unlock(process.env.PASSPHRASE);
  return account;
}

async function handleTransaction(
  api: ApiPromise,
  extrinsic: SubmittableExtrinsic<'promise'>,
  account: KeyringPair,
  propertyId: string | number
): Promise<AddPropertyResult> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Transaction timeout'));
    }, TRANSACTION_TIMEOUT);

    api.tx.sudo
      .sudo(extrinsic)
      .signAndSend(account, { nonce: -1 }, ({ status, events }) => {
        if (status.isInBlock || status.isFinalized) {
          clearTimeout(timeoutId);

          const propertyAddedEvent = events.find(({ event }) =>
            api.events.sudo.Sudid.is(event)
          );

          if (propertyAddedEvent) {
            resolve({
              propertyId,
              message: 'Property successfully added'
            });
          } else {
            reject(new Error('Property not added - no confirmation event found'));
          }
        } else if (status.isInvalid) {
          clearTimeout(timeoutId);
          reject(new Error('Invalid transaction'));
        }
      })
      .catch(error => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

// async function handleTransaction(
//   api: ApiPromise,
//   extrinsic: SubmittableExtrinsic<'promise'>,
//   account: KeyringPair,
//   propertyId: string | number
// ): Promise<AddPropertyResult> {
//   return new Promise(async (resolve, reject) => {
//     const timeoutId = setTimeout(() => {
//       reject(new Error('Transaction timeout'));
//     }, TRANSACTION_TIMEOUT);

//     try {
//       const accountInfo: any = await api.query.system.account(account.address);
//       const nonce = accountInfo.nonce.toNumber(); // Get nonce from accountInfo
//       await api.tx.sudo
//         .sudo(extrinsic)
//         .signAndSend(account, { nonce: nonce + 1, tip: 1000000000 }, ({ status, events }) => {
//           // Increment nonce and set a tip
//           if (status.isInBlock || status.isFinalized) {
//             clearTimeout(timeoutId);

//             const propertyAddedEvent = events.find(({ event }) =>
//               api.events.sudo.Sudid.is(event)
//             );

//             if (propertyAddedEvent) {
//               resolve({
//                 propertyId,
//                 message: 'Property successfully added'
//               });
//             } else {
//               reject(new Error('Property not added - no confirmation event found'));
//             }
//           } else if (status.isInvalid) {
//             clearTimeout(timeoutId);
//             reject(new Error('Invalid transaction'));
//           }
//         });
//     } catch (error) {
//       clearTimeout(timeoutId);
//       reject(error);
//     }
//   });
// }

export const addProperty = async (
  propertyId: string | number,
  propertyData: string
): Promise<AddPropertyResult> => {
  console.log('Adding property:', {
    id: propertyId,
    data: 'Uploading property'
  });

  try {
    const api = await getApi();
    const keyring = new Keyring({ type: 'sr25519' });
    const account = await initializeAccount(keyring);

    const newProperty = {
      id: propertyId,
      data: propertyData
    };

    console.log('Submitting to chain:', { id: propertyId });
    const extrinsic = api.tx.gameModule.addProperty(newProperty);

    return await handleTransaction(api, extrinsic, account, propertyId);
  } catch (error) {
    console.error('Error adding property:', error);
    throw error instanceof Error
      ? error
      : new Error('Unknown error occurred while adding property');
  }
};
