'use server';

import '@polkadot/api-augment';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  GetCommandOutput
} from '@aws-sdk/lib-dynamodb';
import sharp from 'sharp';
import { createCanvas } from 'canvas';
import { getApi } from '@/lib/polkadot';
import Keyring from '@polkadot/keyring';
import { GameInfo, GameResultType } from '@/lib/extrinsic';
import { getGameInfo, getUserData } from '@/lib/queries';

const client = new DynamoDBClient({
  region: 'eu-west-2', // specify your region
  credentials: {
    accessKeyId: process.env.DYNAMO_ACCESS_KEY!,
    secretAccessKey: process.env.DYNAMO_SECRET_KEY!
  }
});

const docClient = DynamoDBDocumentClient.from(client);

const checkerboardSize = 2.5;

async function fetchImage(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  return response.arrayBuffer();
}

async function applyCheckerboardOverlay(imageBuffer: ArrayBuffer) {
  const originalImage = sharp(imageBuffer);
  const { width, height } = await originalImage.metadata();

  const canvas = createCanvas(width!, height!);
  const ctx = canvas.getContext('2d');

  for (let y = 0; y < height!; y += checkerboardSize) {
    for (let x = 0; x < width!; x += checkerboardSize) {
      if ((x / checkerboardSize + y / checkerboardSize) % 2 === 0) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x, y, checkerboardSize, checkerboardSize);
      }
    }
  }

  const checkerboardBuffer = canvas.toBuffer();

  const processedImage = await originalImage
    .composite([{ input: checkerboardBuffer, blend: 'over' }])
    .flop()
    .greyscale()
    .jpeg()
    .toBuffer();

  return processedImage.toString('base64');
}

export async function fetchPropertyData(id: number) {
  try {
    const res = await docClient.send(
      new GetCommand({
        TableName: 'realXDeal',
        Key: {
          id
        }
      })
    );
    return res.Item;
  } catch (error) {
    console.log('Error fetching property:', error);
  }
}

export async function fetchAllProperties() {
  try {
    const res: any = await docClient.send(
      new ScanCommand({
        TableName: 'realXDeal'
      })
    );
    return res.Items;
  } catch (error) {
    console.log('Error fetching all properties:', error);
  }
}

export async function fetchPropertyForDisplay(id: number) {
  console.log('Logging on the server');

  const data = await fetchPropertyData(id);
  if (data) {
    const displayData = await processPropertyData(data);
    return displayData;
  } else {
    return undefined;
  }
}

async function processPropertyData(propertyData: Record<string, any>) {
  const {
    mainImageSrc,
    images,
    summary,
    location,
    bedrooms,
    bathrooms,
    displaySize,
    propertySubType,
    displayAddress
  } = propertyData;

  try {
    const processedMainImage = await processImage(mainImageSrc);
    const processedImages = await Promise.all(
      images.map((img: any) => {
        return processImage(img.srcUrl);
      })
    );

    return {
      cover_image: processedMainImage,
      type: propertySubType,
      location,
      summary,
      bedrooms,
      bathrooms,
      size: displaySize,
      images: processedImages,
      address: displayAddress
    };
  } catch (error) {
    console.log('Error: ', error);
  }
}

export async function processImage(imageUrl: string) {
  const imageBuffer = await fetchImage(imageUrl);
  const imageString = await applyCheckerboardOverlay(imageBuffer);
  return `data:image/jpeg;base64,${imageString}`;
}

export async function checkResult(data: {
  guess: number;
  gameId: number;
  address: string;
}): Promise<{ points: string; won: string; nftReceived: string; realPrice: any } | null> {
  console.log('Checking result for game:', data.gameId);

  try {
    const gameInfo = (await getGameInfo(data.gameId)) as unknown as any;
    const propertyId = Number(gameInfo.property.id.replace(/,/g, ''));

    // const propertyData = await fetchPropertyData(139361966);
    const propertyData = await fetchPropertyData(propertyId);

    if (!propertyData) {
      throw new Error(`Property data not found for game ${data.gameId}`);
    }

    const realPrice = propertyData.price;
    const secret = {
      scheme: 'aes-256-cbc',
      keyBase64: propertyData.key,
      ivBase64: propertyData.iv
    };

    const api = await getApi();
    const keyring = new Keyring({ type: 'sr25519' });
    const account = keyring.createFromJson({
      encoded: process.env.ENCODED_SEED!,
      encoding: {
        content: ['pkcs8', 'sr25519'],
        type: ['scrypt', 'xsalsa20-poly1305'],
        version: '3'
      },
      address: process.env.SUDO_ADDRESS!,
      meta: {
        genesisHash: '0x',
        name: 'XCAV-SUDO',
        whenCreated: 1702476542911
      }
    });

    account.unlock(process.env.PASSPHRASE!);

    const extrinsic = api.tx.gameModule.checkResult(
      data.guess,
      data.gameId,
      realPrice,
      JSON.stringify(secret)
    );

    console.log(`Real Price: ${realPrice}, Guess: ${data.guess}, Game ID: ${data.gameId}`);

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Transaction timeout'));
      }, 60000); // 60 seconds timeout

      api.tx.sudo
        .sudo(extrinsic)
        .signAndSend(account, ({ status, events }) => {
          if (status.isInBlock) {
            clearTimeout(timeoutId);

            const resultCheckedEvent = events.find(({ event }) =>
              api.events.gameModule.ResultChecked.is(event)
            );

            if (resultCheckedEvent) {
              const points = resultCheckedEvent.event.data[2].toString();
              const won = resultCheckedEvent.event.data[3].toString();
              const nftReceived = resultCheckedEvent.event.data[4].toString();
              resolve({ points, won, nftReceived, realPrice });
            } else {
              reject(new Error('ResultChecked event not found'));
            }
          }
        })
        .catch(error => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  } catch (error) {
    console.error('Error in checkResult:', error);
    throw error;
  }
}

export const registerPlayer = async (address: string) => {
  try {
    const api = await getApi();
    const keyring = new Keyring({ type: 'sr25519' });
    const account = keyring.createFromJson({
      encoded: process.env.ENCODED_SEED!,
      encoding: {
        content: ['pkcs8', 'sr25519'],
        type: ['scrypt', 'xsalsa20-poly1305'],
        version: '3'
      },
      address: process.env.SUDO_ADDRESS!,
      meta: {
        genesisHash: '0x',
        name: 'XCAV-SUDO',
        whenCreated: 1702476542911
      }
    });

    account.unlock(process.env.PASSPHRASE!);

    const extrinsic = api.tx.gameModule.registerUser(address);

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Transaction timeout'));
      }, 60000); // 60 seconds timeout

      extrinsic
        .signAndSend(account, ({ status, events }) => {
          if (status.isInBlock) {
            clearTimeout(timeoutId);

            const registeredEvent = events.find(({ event }) =>
              api.events.gameModule.NewPlayerRegistered.is(event)
            );

            if (registeredEvent) {
              resolve({
                address,
                registered: true,
                message: 'Player successfully registered'
              });
            } else {
              reject(new Error('Player not registered'));
            }
          }
        })
        .catch(error => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  } catch (error) {
    console.error('Error registering player:', error);
    throw error;
  }
};
