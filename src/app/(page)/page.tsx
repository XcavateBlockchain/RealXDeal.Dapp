import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TeamSection } from './_components/team';
import { HowToPlay } from './_components/how-to-play';
import Link from 'next/link';
import { FeatureCard } from './_components/features';

export default function Home() {
  return (
    <>
      <section className="container mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-[91px] px-[10px] pb-[150px] pt-[100px] sm:flex-row sm:px-[100px]">
        <div className="flex w-full flex-col items-start gap-6 px-4 sm:max-w-[610px] md:px-0">
          <div className="flex flex-col items-start gap-4">
            <h1 className="font-heading text-[1.2rem]/[1.5rem] font-medium sm:text-[2rem]/[2.5rem] md:text-[2.5rem]/[3rem]">
              Think you are good at guessing real estate prices?
            </h1>
            <p className="text-[1rem]/[1.5rem] font-light">
              Are you willing to stake your tokens on it? Guess correct property prices and win
              NFTs.
            </p>
          </div>
          <Button className="hidden sm:block">
            <Link href={'/dashboard'}>PLAY NOW</Link>
          </Button>
        </div>
        <div className="flex flex-col">
          <Image
            src={'/images/hero.png'}
            alt="real-x-deal"
            width={538}
            height={538}
            priority
          />

          <Button className="block sm:hidden mt-4">
            <Link href={'/dashboard'}>PLAY NOW</Link>
          </Button>
        </div>
      </section>
      <section className="container mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-10 px-[10px] sm:px-[100px] pb-[150px] pt-[4px] sm:pt-[100px]">
        <div className="sm:w-[25%] w-full  text-center font-heading text-[1.3rem]/[1.9rem] font-medium">
          <h2>Fun way to learn about real estate.</h2>
        </div>
        <div className="sm:grid sm:grid-cols-4 sm:gap-5 flex flex-row overflow-x-auto  snap-x snap-mandatory">
  <div className="snap-center flex-shrink-0 w-full sm:w-auto">
    <FeatureCard title="Win valuable NFTs" />
  </div>
  <div className="snap-center flex-shrink-0 w-full sm:w-auto">
    <FeatureCard title="Real-time Leaderboards" />
  </div>
  <div className="snap-center flex-shrink-0 w-full sm:w-auto">
    <FeatureCard title="Earn tokens" />
  </div>
  <div className="snap-center flex-shrink-0 w-full sm:w-auto">
    <FeatureCard title="Trade your NFTs " />
  </div>
</div>
      </section>
      
      <HowToPlay />
      <section className="container mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-10 px-[10px] sm:px-[100px] pb-[150px] sm:pt[10px] sm:pt-[100px]">
        <div className="sm:w-[32%] w-full flex-col items-center gap-4 text-center">
          <h3 className="font-heading text-[1.3rem]/[1.8rem] font-medium">
            Experience Property Gaming at Its Finest!
          </h3>
          <p className="text-[1rem]/[1.5rem] font-light">The world of property guessing.</p>
        </div>
        <Image src={'/images/game-demo.png'} alt="demo" width={1086} height={629} priority />
      </section>
      <TeamSection />
      <section className="sm:h-[555px] h-full w-full bg-[url('/images/play-now.svg')] bg-cover bg-center bg-no-repeat pt-[20px] sm:pt-[100px]">
        <div className="container mx-auto flex w-full max-w-screen-2xl flex-col items-start justify-start gap-6 px-[20px] sm:px-[100px] py-6">
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-[1.5rem]/[2rem] sm:text-[2.5rem]/[3rem] font-medium">Get started now.</h3>
            <p className="text-[1rem]/[1.5rem]">Ready to Start Guessing?</p>
          </div>
          <Button asChild>
            <Link href={'/dashboard'}>PLAY NOW</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
