'use client';

import { Shell } from '@/components/shell';
import { Button } from '@/components/ui/button';
import { useGameContext } from '@/context/game-context';
import { cn, getRandomCollection } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Result() {
  const router = useRouter();
  const { result: data } = useGameContext();
  const nft = getRandomCollection();

  if (!Result) {
    useEffect(() => {
      router.push('/dashboard');
    });
  }

  return (
    <Shell>
      <div className="flex flex-col items-center justify-center space-y-3">
        <p>Your Guess: ${data?.guess ?? 0}</p>

        <div
          className={cn(
            'h-[280px] w-[239px] rounded-[10px] border-2 bg-white/[0.20]',
            data.won === 'true' ? 'border-[#024C67]' : 'border-[#FF3131]'
          )}
        >
          <Image
            src={data.won === 'true' ? `${nft.nftImage}` : '/images/green_reaper.jpg'}
            alt=""
            width={239}
            height={280}
            className="pointer-events-none h-full rounded-[10px]"
            priority
          />
        </div>
        <p>Actual price: {data.realPrice}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-2 text-center">
          <h1
            className={cn(
              'text-[1.375rem] font-semibold',
              data.won === 'true' ? 'text-[#5BFF32]' : 'text-[#FF3131]'
            )}
          >
            {data.won === 'true' ? 'Great guess!!' : data.won === 'Bad guess!!'}
          </h1>
          {data.won === 'true' ? (
            <p className="text-[1.0625rem] font-light">
              You have won this property NFT and have gained +{data.points} points{' '}
            </p>
          ) : (
            <p className="text-[1.0625rem] font-light">
              You were really! really!! off and have lost -{data.points} points{' '}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button asChild size={'sm'} className="text-[17px]/[24px] font-light">
          <Link href={'/dashboard'}>Play again</Link>
        </Button>
        <Button
          variant={'outline'}
          size={'sm'}
          className="border-white text-[17px]/[24px] font-light text-white"
          asChild
        >
          <Link href={'/leaderboard'}>Leaderboard</Link>
        </Button>
        <Button
          variant={'outline'}
          size={'sm'}
          className="border-white text-[17px]/[24px] font-light text-white"
        >
          Share
        </Button>
      </div>
    </Shell>
  );
}
