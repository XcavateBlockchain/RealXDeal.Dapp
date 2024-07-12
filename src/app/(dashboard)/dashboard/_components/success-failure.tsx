import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface GameProps {
  close: () => void;
}

export function GuessPass({ close }: GameProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-[100px]">
      <div className="space-x-[15px]">
        <span>points</span>
        <span className="text-primary-400">1500</span>
      </div>

      <div className="inline-flex w-[512px] flex-col items-center justify-center gap-6 rounded-lg bg-[#172234] px-6 pb-10 pt-6 backdrop-blur">
        <div className="h-[320px] w-[239px] rounded-[10px] bg-white/[0.20]">
          <Image
            src={'/images/Xpurple_property_NFT12_apartment.webp'}
            alt=""
            width={239}
            height={320}
            className="h-full rounded-[10px]"
            priority
          />
        </div>

        <div className="flex w-full max-w-[307px] flex-col items-center justify-center gap-2 text-center">
          <h1 className="text-[1.375rem] font-semibold">Great guess!!</h1>
          <p className="text-[1.0625rem] font-light">
            You have won this property NFT and have gained +10 points{' '}
          </p>
        </div>
        <Button onClick={close}>Continue</Button>
      </div>
    </div>
  );
}
export function GuessFail({ close }: GameProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-[100px]">
      <div className="space-x-[15px]">
        <span>points</span>
        <span className="text-primary-400">1500</span>
      </div>

      <div className="inline-flex w-[512px] flex-col items-center justify-center gap-6 rounded-lg bg-[#172234] px-6 pb-10 pt-6 backdrop-blur">
        <div className="h-[320px] w-[239px] rounded-[10px] bg-white/[0.20]"></div>

        <div className="flex w-full max-w-[307px] flex-col items-center justify-center gap-2 text-center">
          <h1 className="text-[1.375rem] font-semibold">Sorry wrong guess</h1>
          <p className="text-[1.0625rem] font-light">You have lost -10 points</p>
        </div>
        <Button onClick={close}>Continue</Button>
      </div>
    </div>
  );
}
