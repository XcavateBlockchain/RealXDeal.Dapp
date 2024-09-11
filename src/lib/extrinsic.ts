import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { getApi } from './polkadot';
import { toast } from 'sonner';
import { getGameInfo } from './queries';
import { checkResult, fetchPropertyForDisplay } from '@/app/actions';
import { getErrorMessage } from './handle-error';

export interface GameInfo {
  property: {
    id: number;
    [key: string]: any;
  };
}

function getPropertyId(gameId: number) {}

export async function playGame(
  gameType: 0 | 1 | 2,
  address: string,
  handlePropertyDisplay: (
    data: any,
    gameId: any,
    submittedAtBlockNumber: any,
    endingBlock: any
  ) => void
) {
  try {
    const api = await getApi();
    const extensions = await web3Enable('RealXDEal');
    const injected = await web3FromAddress(address);
    const extrinsic = api.tx.gameModule.playGame(gameType);
    const signer = injected.signer;

    let eventProcessed = false;
    const unsub = await extrinsic.signAndSend(
      address,
      { signer, nonce: -1 },
      async ({ status, events = [], dispatchError }) => {
        if (status.isInBlock && !eventProcessed) {
          eventProcessed = true;
          const gameStartedEvent = events.find(({ event }) =>
            api.events.gameModule.GameStarted.is(event)
          );

          if (gameStartedEvent) {
            const gameId = gameStartedEvent.event.data[1].toString();
            const endingBlock = gameStartedEvent.event.data[2].toString();
            console.log(`GameStarted event found with game_id: ${gameId}`);
            const gameInfo = (await getGameInfo(parseInt(gameId))) as unknown as GameInfo;
            // console.log('The game info is: ', gameInfo);
            // const propertyDisplay = await fetchPropertyForDisplay(
            //   Number(gameInfo.property.id)
            // );
            const header = await api.rpc.chain.getHeader(status.asInBlock);
            const submittedBlockNumber = header.number.toNumber();

            const propertyDisplay = await fetchPropertyForDisplay(139361966);
            console.log('submitted blocknumber', submittedBlockNumber);
            console.log('ending blocknumber', endingBlock);
            handlePropertyDisplay(propertyDisplay, gameId, submittedBlockNumber, endingBlock);
            // console.log(propertyDisplay);
            toast.success(status.asInBlock.toString());
            console.log(`Completed at block hash #${status.asInBlock.toString()}`);
            unsub();
          } else if (dispatchError) {
            // display a warning and prompt to retry
            toast.warning('There was an error');
            console.log(dispatchError.toHuman());
          }
        }
      }
    );
    // console.log('Transaction sent:', unsub);
  } catch (error) {
    console.error('Failed to submit guess:', error);
  }
}

// export async function submitGameAnswer(
//   address: string,
//   guess: number,
//   gameId: number,
//   handleWinResult: (data: any, error: boolean) => void
// ) {
//   try {
//     console.log('Submitting answer.....');
//     const api = await getApi();
//     const injected = await web3FromAddress(address);
//     const extrinsic = api.tx.gameModule.submitAnswer(guess, gameId);
//     const signer = injected.signer;

//     const unsub = await extrinsic.signAndSend(address, { signer }, async result => {
//       if (result.status.isInBlock) {
//         console.log(`Completed at block hash #${result.status.asInBlock.toString()}`);
//         await checkResult({ guess, gameId, address });
//         unsub();
//       } else if (result.status.isBroadcast) {
//         console.log('Broadcasting the guess...');
//       }
//     });

//     console.log('Transaction sent:', unsub);
//   } catch (error) {
//     console.error('Failed to submit guess:', error);
//   }
// }

export type GameResultType = {
  guess: any;
  gameId: number;
  price: any;
};
// export async function checkGameResult(address: string, value: GameResultType) {
//   try {
//     const api = await getApi();
//     const injected = await web3FromAddress(address);
//     const extrinsic = api.tx.gameModule.checkResult(
//       value.guess,
//       value.gameId,
//       value.price,
//       value.secret
//     );
//     const signer = injected.signer;

//     const unsub = await extrinsic.signAndSend(address, { signer }, result => {
//       if (result.status.isInBlock) {
//         console.log(`Completed at block hash #${result.status.asInBlock.toString()}`);
//       } else if (result.status.isBroadcast) {
//         console.log('Broadcasting the guess...');
//       }
//     });

//     console.log('Transaction sent:', unsub);
//   } catch (error) {
//     console.error('Failed to submit guess:', error);
//   }
// }

export async function submitGameAnswer(
  address: string,
  guess: number,
  gameId: number,
  handleWinResult: (data: any, error: boolean) => void
): Promise<void> {
  // Specify the return type as Promise<void>
  try {
    console.log('Submitting answer.....');
    const api = await getApi();
    const injected = await web3FromAddress(address);
    const extrinsic = api.tx.gameModule.submitAnswer(guess, gameId);
    const signer = injected.signer;
    let eventProcessed = false;
    const unsub = await extrinsic.signAndSend(
      address,
      { signer, nonce: -1 },
      async ({ status, events = [], dispatchError }) => {
        if (status.isFinalized && !eventProcessed) {
          eventProcessed = true;
          const answerSubmittedEvent = events.find(({ event }) =>
            api.events.gameModule.AnswerSubmitted.is(event)
          );
          if (answerSubmittedEvent) {
            console.log('ANSWER SUBMITTED EVENT RECEIVED');
            // const checkResultData = await checkResult({ guess, gameId, address });
            handleWinResult({ success: true }, false); // Call handleWinResult with the result
            unsub();
          }
        } else if (status.isBroadcast) {
          console.log('Broadcasting the guess...');
        }
      }
    );

    console.log('Transaction sent:', unsub);
  } catch (error) {
    console.error('Failed to submit guess:', error);
    handleWinResult(null, true); // Call handleWinResult with error
  }
}

export async function startGame(
  gameType: 0 | 1 | 2,
  address: string,
  handlePropertyDisplay: (data: any, gameId: any) => void
) {
  try {
    const api = await getApi();
    const extensions = await web3Enable('RealXDEal');
    const injected = await web3FromAddress(address);
    const extrinsic = api.tx.gameModule.playGame(gameType);
    const signer = injected.signer;

    let eventProcessed = false;
    const unsub = await extrinsic.signAndSend(
      address,
      { signer, nonce: -1 },
      async ({ status, events = [], dispatchError }) => {
        if (status.isInBlock && !eventProcessed) {
          eventProcessed = true;
          const gameStartedEvent = events.find(({ event }) =>
            api.events.gameModule.GameStarted.is(event)
          );

          if (gameStartedEvent) {
            const gameId = gameStartedEvent.event.data[1].toString();
            const endingBlock = gameStartedEvent.event.data[2].toString();
            console.log(`GameStarted event found with game_id: ${gameId}`);
            const gameInfo = (await getGameInfo(parseInt(gameId))) as unknown as GameInfo;
            // console.log('The game info is: ', gameInfo);
            // const propertyDisplay = await fetchPropertyForDisplay(
            //   Number(gameInfo.property.id)
            // );
            const header = await api.rpc.chain.getHeader(status.asInBlock);
            const submittedBlockNumber = header.number.toNumber();

            const propertyDisplay = await fetchPropertyForDisplay(139361966);
            console.log('submitted blocknumber', submittedBlockNumber);
            console.log('ending blocknumber', endingBlock);
            // handlePropertyDisplay(propertyDisplay, gameId, submittedBlockNumber, endingBlock);
            console.log(`Completed at block hash #${status.asInBlock.toString()}`);
            handlePropertyDisplay(
              {
                status: true,
                submittedBlockNumber,
                endingBlock,
                message: `Completed at block hash #${status.asInBlock.toString()}`
              },
              gameId
            );
            unsub();
          } else if (dispatchError) {
            // display a warning and prompt to retry
            handlePropertyDisplay(
              {
                status: false,
                message: `An error occurred please try again. ${dispatchError.toHuman()}`
              },
              null
            );
          }
        }
      }
    );
    // console.log('Transaction sent:', unsub);
  } catch (error) {
    // console.error('Failed to submit guess:', error);
    return error;
    // return handlePropertyDisplay({ status: false, message: `Failed to start game.` }, null);
  }
}

export async function listNFT(senderAddress: string, collectionId: number, nftId: number) {
  try {
    const api = await getApi();
    await web3Enable('RealXDEal');
    const injected = await web3FromAddress(senderAddress);
    const extrinsic = api.tx.gameModule.listNft(collectionId, nftId);
    const signer = injected.signer;

    const unsub = await extrinsic.signAndSend(senderAddress, { signer }, result => {
      if (result.status.isFinalized) {
        console.log(`Completed at block hash #${result.status.asInBlock.toString()}`);
      } else if (result.status.isBroadcast) {
        console.log('Broadcasting the guess...');
      }
    });

    console.log('Transaction sent:', unsub);
    return {
      data: unsub,
      error: null
    };
  } catch (error) {
    console.error('Failed to list NFT:', error);
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function delistNFT(senderAddress: string, listingId: number) {
  try {
    const api = await getApi();
    await web3Enable('RealXDEal');
    const injected = await web3FromAddress(senderAddress);
    const extrinsic = api.tx.gameModule.delistNft(listingId);
    const signer = injected.signer;

    const unsub = await extrinsic.signAndSend(senderAddress, { signer }, result => {
      if (result.status.isFinalized) {
        console.log(`Completed at block hash #${result.status.asInBlock.toString()}`);
      } else if (result.status.isBroadcast) {
        console.log('Broadcasting the guess...');
      }
    });

    // console.log('Transaction sent:', unsub);
    return {
      data: unsub,
      error: null
    };
  } catch (error) {
    console.error('Failed to de list NFT:', error);
    return { data: null, error: getErrorMessage(error) };
  }
}

type MakeOfferProps = {
  collectionId: number;
  itemId: number;
  listingId: number;
};

export async function makeOffer(senderAddress: string, { ...data }: MakeOfferProps) {
  try {
    const api = await getApi();
    await web3Enable('RealXDEal');
    const injected = await web3FromAddress(senderAddress);
    const extrinsic = api.tx.gameModule.makeOffer(
      data.listingId,
      data.collectionId,
      data.itemId
    );
    const signer = injected.signer;

    const unsub = await extrinsic.signAndSend(senderAddress, { signer }, result => {
      if (result.status.isFinalized) {
        console.log(`Completed at block hash #${result.status.asInBlock.toString()}`);
      } else if (result.status.isBroadcast) {
        console.log('Broadcasting the guess...');
      }
    });

    // console.log('Transaction sent:', unsub);
    return {
      data: unsub,
      error: null
    };
  } catch (error) {
    console.error('Failed to de list NFT:', error);
    return { data: null, error: getErrorMessage(error) };
  }
}
