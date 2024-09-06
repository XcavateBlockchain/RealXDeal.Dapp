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

interface PlayGameProps {
  params: { mode: string };
  searchParams: {
    id: string | any;
  };
}

export default async function PlayGame({ params, searchParams }: PlayGameProps) {
  const mode = params.mode;
  const gameId = searchParams.id;
  const address = await getCookieStorage('accountKey');
  const data: any = await fetchPropertyForDisplay(139361966);

  return (
    <Shell className="py-[50px]">
      <div className="grid flex-1 grid-cols-3 gap-10">
        <div className="col-span-2 flex items-center gap-10">
          <div className="flex flex-col items-center justify-center gap-10">
            {/* <div className="flex size-[120px] items-center justify-center rounded-full border-[2.94px] border-primary-200 bg-primary px-[31px] py-10 shadow-time">
              <span className="font-heading text-[2.84569rem] font-bold">60</span>
            </div> */}
            <Countdown />

            <div className="flex size-[60px] items-center justify-center rounded-full bg-white text-primary-500">
              <span className="text-[16px]/[24px]">Map</span>
            </div>
          </div>

          <div className="flex w-[90%] flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-center gap-[18px]">
              <h1 className="text-[18px]/[23px] font-medium">{data.type}</h1>
              {/* <p className="text-[14px]/[17px] font-light">One bed luxury apartment,</p> */}
            </div>
            <GameSlider
              slides={data.images}
              options={{ loop: true }}
              // options={{ axis: 'y', align: 'start', dragFree: true, loop: true }}
            />
          </div>
        </div>

        <div className="max-w-[370x] space-y-10 rounded-lg bg-card p-4">
          <ScrollArea className="max-h-[388px] pb-0">
            <div className="space-y-[18px]">
              <DescriptionList title="Size" description={'552 sqft / 51 sqm'} />

              <DescriptionList title="Bedrooms" description={data.bedrooms} />
              <DescriptionList title="Bathrooms" description={data.bathrooms} />
            </div>
            <div className="space-y-[18px]">
              <h1 className="text-[0.875rem] font-medium">Summary</h1>
              <p className="font-light">{data.summary}</p>
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="flex w-full max-w-[60%] items-center gap-40">
        <Link href={'/dashboard'}>
          <Button variant={'text'}>
            <Icons.exit className="size-6" /> Exit
          </Button>
        </Link>
        <SubmitGuess address={address} gameId={Number(gameId)} />
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
