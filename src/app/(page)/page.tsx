import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TeamSection } from './_components/team';
import { HowToPlay } from './_components/how-to-play';
import Link from 'next/link';
import { FeatureCard } from './_components/features';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function Home() {
  return (
    <>
      <section className="container mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-10 px-4 pb-[150px] pt-[50px] lg:flex-row lg:gap-[91px] lg:px-[100px] lg:pt-[100px]">
        <div className="flex w-full flex-col items-start gap-6 lg:max-w-[610px]">
          <div className="flex w-full flex-col items-start gap-8">
            <h1 className="font-heading text-[24px]/[32px] font-medium md:text-[2.5rem]/[3rem]">
              Think you are good at guessing real estate prices?
            </h1>
            <p className="font-sans text-[16px]/[24px] font-light tracking-wide md:text-[1rem]/[1.5rem]">
              Are you willing to stake your reputation on it? guess correct property prices and
              win NFTs.
            </p>
          </div>
          <Button className="hidden lg:flex">
            <Link href={'/dashboard'}>PLAY NOW</Link>
          </Button>
        </div>
        <div className="">
          <Image
            src={'/images/hero.png'}
            alt="real-x-deal"
            width={538}
            height={538}
            priority
          />
        </div>
        <Button className="lg:hidden" fullWidth>
          <Link href={'/dashboard'}>PLAY NOW</Link>
        </Button>
      </section>
      <section className="container mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-10 px-4 pb-[150px] pt-[50px] lg:px-[100px] lg:pt-[100px]">
        <div className="w-full text-center font-heading text-[18px]/[24px] font-medium md:text-[1.3rem]/[1.9rem] lg:w-[25%]">
          <h2>Fun way to learn about real estate.</h2>
        </div>
        <ScrollArea className="w-96 whitespace-nowrap lg:w-auto">
          <div className="flex w-max items-center space-x-5 p-4 lg:p-0">
            <FeatureCard title="Win valuable NFTs" />
            <FeatureCard title="Real-time Leaderboards" />
            <FeatureCard title="Earn points" />
            <FeatureCard title="Trade your NFTs " />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
      <HowToPlay />
      <section className="container mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-10 px-4 pb-[150px] pt-[50px] lg:px-[100px] lg:pt-[100px]">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h3 className="font-heading text-[1.3rem]/[1.8rem] font-medium">
            Experience Property Gaming at Its Finest!
          </h3>
          <p className="text-[1rem]/[1.5rem] font-light">The world of property guessing.</p>
        </div>
        <Image src={'/images/game-demo.png'} alt="demo" width={1086} height={629} priority />
      </section>
      <TeamSection />
      <section className="h-full w-full bg-[url('/images/play-now.svg')] bg-cover bg-center bg-no-repeat pt-[100px] lg:h-[555px]">
        <div className="container mx-auto flex w-full max-w-screen-2xl flex-col items-start justify-start gap-6 px-4 py-6 lg:px-[100px]">
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-[18px]/[24px] font-medium lg:text-[2.5rem]/[3rem]">
              Get started now.
            </h3>
            <p className="text-[10px]/[12px] lg:text-[1rem]/[1.5rem]">
              Ready to Start Guessing?
            </p>
          </div>
          <Button asChild>
            <Link href={'/dashboard'}>PLAY NOW</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
