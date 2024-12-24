import { fetchPropertyForDisplay } from '@/app/actions';
import GameSlider from '@/components/game-slider';
import { Icons } from '@/components/icons';
import { Shell } from '@/components/shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import SubmitGuess, { Countdown } from './submit-guess';
import { getCookieStorage } from '@/lib/storage';
import { GameInfo } from '@/lib/extrinsic';
import { getGameInfo } from '@/lib/queries';
import { Suspense } from 'react';

interface PlayGameProps {
  params: { mode: string };
  searchParams: {
    id: string | any;
  };
}

export const maxDuration = 300;

export default async function PlayGame({ params, searchParams }: PlayGameProps) {
  const mode = params.mode;
  const gameId = searchParams.id;
  const address = await getCookieStorage('accountKey');
  const gameInfo = (await getGameInfo(Number(gameId))) as unknown as any;
  // console.log(gameInfo);
  const propertyId = Number(gameInfo.property.id.replace(/,/g, ''));
  // const data: any = await fetchPropertyForDisplay(139361966);
  const data: any = await fetchPropertyForDisplay(propertyId);

  return (
    <Shell className="py-[50px]">
      <div className="flex w-full items-center gap-[49px]">
        <div className="flex items-center gap-[139px]">
          <div className="flex flex-col items-center justify-center gap-10">
            <Countdown />
            <div className="flex size-[60px] items-center justify-center rounded-full bg-white text-primary-500">
              <span className="text-[16px]/[24px]">Map</span>
            </div>
          </div>
          <div className="flex w-[90%] flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-center gap-[18px]">
              <h1 className="text-[18px]/[23px] font-medium">{data.type}</h1>
              {/* <p>{data.address}</p> */}
            </div>
            <GameSlider
              slides={data.images}
              options={{ loop: true }}
              // options={{ axis: 'y', align: 'start', dragFree: true, loop: true }}
            />
          </div>
        </div>

        <ScrollArea className="mt-[52px] h-full max-h-[338px] w-full max-w-[370x]">
          <div className="space-y-10 rounded-lg bg-card px-6 py-4">
            <div className="space-y-[18px]">
              <DescriptionList title="Address" description={data.address} />
              <DescriptionList title="Size" description={data.size} />
              <DescriptionList title="Bedrooms" description={data.bedrooms} />
              <DescriptionList title="Bathrooms" description={data.bathrooms} />
            </div>

            <div className="space-y-[18px]">
              <h1 className="text-[0.875rem] font-medium">Summary</h1>
              <p className="font-light">{data.summary}</p>
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className="flex w-full max-w-[60%] items-center gap-40">
        <Link href={'/dashboard'}>
          <Button variant={'text'} className="font-heading">
            <Icons.exit className="size-6" /> End
          </Button>
        </Link>
        <Suspense fallback={''}>
          <SubmitGuess address={address} gameId={Number(gameId)} />
        </Suspense>
        {/* <SubmitGuess address={address} gameId={Number(gameId)} /> */}
      </div>
    </Shell>
  );
}

interface DescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: any;
}

const DescriptionList = ({ className, title, description }: DescriptionProps) => {
  return (
    <div className="flex items-center gap-1 font-sans text-[0.875rem]">
      <dt>{title}:</dt>
      <dd className={cn('font-light', className)}>{description}</dd>
    </div>
  );
};
