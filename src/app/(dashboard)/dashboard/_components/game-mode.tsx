'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
// import Form, { useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useLiveCountdown from '@/hooks/use-live-countdown';
import { cn, formatNumber } from '@/lib/utils';
import { gameSchema, GuessInput } from '@/lib/validations/game';
import Image from 'next/image';
import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem
} from '@/components/ui/extension-carousel';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition
} from 'react';

import { getNextGameID } from '@/lib/queries';
import { submitGameAnswer } from '@/lib/extrinsic';
import { GameData } from '@/types';
import { useWalletContext, WalletContext } from '@/context/wallet-context';
import { useRouter } from 'next/navigation';
import { checkResult } from '@/app/actions';

interface GameProps {
  points: number;
  data: GameData;
  setResult: Dispatch<SetStateAction<any>>;
  setDisplay: Dispatch<SetStateAction<'start' | 'play' | 'success' | 'fail'>>;
  close: () => void;
  gameId: any;
}

export default function GameMode({
  points,
  data,
  setDisplay,
  close,
  gameId,
  setResult
}: GameProps) {
  // const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const [gameId, setGameID] = useState<any>();
  const walletContext = useContext(WalletContext);
  const selectedAddress = walletContext.selectedAccount?.[0]?.address as string;
  const { seconds } = useLiveCountdown(60);

  async function onSubmit(event: any) {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const guess = Number(formData.get('guess') as string);
    console.log(guess);
    await submitGameAnswer(selectedAddress, guess, gameId, async (data, error) => {
      if (error) {
        setResult({});
        setDisplay('fail');
        setIsLoading(false);
        router.refresh();
        console.log('error', error);
      }

      if (data) {
        const checkResultData = await checkResult({ guess, gameId, address: selectedAddress });
        setResult(checkResultData);
        setDisplay('success');
        setIsLoading(false);
        router.refresh();
        console.log('data', data);
      }
    });
  }

  useEffect(() => {
    if (seconds <= 0 && isLoading === false) {
      setDisplay('fail');
    }
  }, []);

  return (
    <div className="space-y-[44px]">
      <div className="flex items-center justify-between">
        <Button variant={'text'} onClick={close} className="p-0" disabled={isLoading}>
          <Icons.CaretLeft className="size-6" />
          Return
        </Button>
        <div className="space-x-2.5">
          <span>Pints:</span>
          <span className="text-primary-400">{formatNumber(points)}</span>
        </div>
      </div>
      <div className="inline-flex size-full items-start gap-6 rounded-lg border border-primary bg-white/[0.20] p-6 backdrop-blur">
        {/* image */}
        <div className="">
          {/* <Image
            src={'/images/Xleafgreen_property_NFT5_apartment.webp'}
            alt=""
            width={583}
            height={574}
            priority
          /> */}
          <Carousel>
            <CarouselMainContainer className="h-[474px] w-[583px]">
              {Array.from({ length: 5 }).map((_, index) => (
                <SliderMainItem key={index} className="bg-transparent">
                  <Image
                    src={data.cover_image}
                    // src={'/images/Xleafgreen_property_NFT5_apartment.webp'}
                    alt={data.type}
                    width={583}
                    height={474}
                    priority
                    className="h-full saturate-50"
                  />
                </SliderMainItem>
              ))}
            </CarouselMainContainer>
            <CarouselThumbsContainer>
              {data.images.map((image, index) => (
                <SliderThumbItem
                  key={index}
                  index={index}
                  className="size-[130px] bg-transparent"
                >
                  <Image
                    src={image}
                    alt={data.type}
                    width={130}
                    height={130}
                    className="size-full"
                    priority
                  />
                </SliderThumbItem>
              ))}
              {/* {Array.from({ length: 5 }).map((_, index) => ( */}

              {/* ))} */}
              {/* <Image
                src={'/images/Xleafgreen_property_NFT5_apartment.webp'}
                alt=""
                width={130}
                height={130}
                priority
              /> */}
            </CarouselThumbsContainer>
          </Carousel>
        </div>
        {/* data */}
        <div className="flex h-full w-full max-w-[500px] flex-col gap-6 px-4">
          <div className="space-y-[18px]">
            <h1 className="text-[0.875rem] font-medium">Property 1</h1>
            <DescriptionList title="Type" description={data.type} />
            <p>One bed luxury apartment,</p>
            <div className="flex w-full items-center">
              <DescriptionList title="Bedrooms" description={data.bedrooms} />
              <DescriptionList title="Bathrooms" description={data.bathrooms} />
            </div>
            <DescriptionList title="Size" description={data.size} />
            {/* <DescriptionList title="Town/city" description="Hertford" />
            <DescriptionList title="Post code" description="SG235TH" /> */}
          </div>
          <div className="space-y-[18px]">
            <h1 className="text-[0.875rem] font-medium">Summary</h1>
            <p>{data.summary}</p>
          </div>
          <div className="space-y-5">
            <form onSubmit={onSubmit} className="flex w-full flex-col items-start gap-6">
              <Input
                name="guess"
                type="number"
                placeholder="Enter your guess"
                className="py-5 outline-none placeholder:text-center placeholder:text-[1rem] placeholder:font-medium placeholder:opacity-50"
              />
              <Button type="submit" fullWidth disabled={isLoading}>
                Guess Now
              </Button>
            </form>
          </div>
        </div>
        {/* timer */}
        <div>
          <div className="flex size-[147px] items-center justify-center rounded-full border-[2.94px] border-primary-200 bg-primary px-[31px] py-10 shadow-time">
            <span className="font-heading text-[2.84569rem] font-bold">
              {seconds > 0 && `${seconds}`}
            </span>
          </div>
        </div>
      </div>
    </div>
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
