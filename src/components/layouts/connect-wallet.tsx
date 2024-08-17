'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../ui/button';
import { useState } from 'react';
import { WalletIcon } from '../wallet-icon';
import { Icons } from '../icons';
import { useSubstrateContext } from '@/context/polkadot-contex';

export default function ConnectedWalletDropDown() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Popover open={showDropdown} onOpenChange={setShowDropdown}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          size={'md'}
          className="hidden shrink-0 text-foreground md:flex"
        >
          56v1W7...Rd1DvD
          <span className="sr-only">Toggle View Wallet</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="shadow-wallet mt-4 grid w-[518px] gap-6 rounded-lg p-6"
      >
        <ConnectedWalletDetails />
      </PopoverContent>
    </Popover>
  );
}

export function ConnectedWalletDetails() {
  const { isConnected, disconnectWallet } = useSubstrateContext();

  return (
    <>
      <div className="flex w-full gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold text-[#4E4E4E]">
              Summary
            </h1>
            <div className="flex gap-2">
              <WalletIcon.talismanWallet className="size-6" />{' '}
              <span>Victor (56v1W7...Rd1DvD)</span> <Icons.copy className="size-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid justify-items-start gap-2 rounded-lg border px-4 py-2">
        <dl className="flex w-full items-center justify-between">
          <dt>XCAV tokens</dt>
          <dd>0 XCAV</dd>
        </dl>
        <dl className="flex w-full items-center justify-between">
          <dt>XCAV tokens</dt>
          <dd>0 XCAV</dd>
        </dl>
        <dl className="flex w-full items-center justify-between">
          <dt>XCAV tokens</dt>
          <dd>0 XCAV</dd>
        </dl>
      </div>
      <div className="flex w-full items-center gap-4 md:justify-end md:gap-2">
        <Button className="w-full md:w-auto">CHANGE ACCOUNT</Button>
        <Button className="w-full md:w-auto" variant={'outline'} onClick={disconnectWallet}>
          DISCONNECT
        </Button>
      </div>
    </>
  );
}
