'use client';

import Image from 'next/image';
import { AlertDialogContent } from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { formatAddress } from '@/lib/utils';
import { LOADING_STATUS } from '@/types';
import { useContext, useState } from 'react';
import { registerPlayer } from '@/app/actions';
import { WalletContext } from '@/context/wallet-context';
import { useRouter } from 'next/navigation';

export default function RegisterPlayer({ address }: { address: string }) {
  const router = useRouter();
  const walletContext = useContext(WalletContext);
  const [status, setStatus] = useState<LOADING_STATUS>(LOADING_STATUS.IDLE);
  //   registerPlayer

  async function onRegister() {
    setStatus(LOADING_STATUS.LOADING);
    try {
      const result = await registerPlayer(address);
      if (result === null) {
        setStatus(LOADING_STATUS.ERROR);
      }
      setStatus(LOADING_STATUS.SUCCESS);
      walletContext.setRegisterPlayer(false);
    } catch (error) {
      setStatus(LOADING_STATUS.ERROR);
    }
  }

  return (
    <AlertDialogContent className="max-w-md gap-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image src={'/images/logo.svg'} width={183} height={72} alt="logo" />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-6">
        {status === LOADING_STATUS.LOADING ? (
          <span className="relative flex size-10 md:size-20">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex size-10 rounded-full bg-primary md:size-20"></span>
          </span>
        ) : (
          <div className="flex w-full items-center justify-center rounded-lg border-primary-300/50 bg-white/[0.31] p-4 text-center text-[1.0625rem]/[1.5rem] font-light text-white">
            {formatAddress(address)}
          </div>
        )}
        {status === LOADING_STATUS.LOADING ? (
          <p>Loading</p>
        ) : status === LOADING_STATUS.ERROR ? (
          <p>Something went wrong Please try aging</p>
        ) : null}
        {status === LOADING_STATUS.IDLE || status === LOADING_STATUS.ERROR ? (
          <Button onClick={onRegister}>Register</Button>
        ) : null}
      </div>
    </AlertDialogContent>
  );
}
