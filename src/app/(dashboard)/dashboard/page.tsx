import StartGame from '@/app/(dashboard)/dashboard/_components/start-game';
import { Card, TaskCard } from '@/components/cards/card';
import { LeadBoardCard } from '@/components/cards/leadboard-card';
import { Shell } from '@/components/shell';
import { ScrollArea } from '@/components/ui/scroll-area';
import { staleBoard, staleUser } from '@/config/site';
import {
  getCurrentRoundID,
  getLeadBoards,
  getUnlistedNFTsForUser,
  getUserData
} from '@/lib/queries';
import { getCookieStorage } from '@/lib/storage';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default async function Dashboard() {
  const address = await getCookieStorage('accountKey');
  const boardList = (await getLeadBoards()) ?? staleBoard;
  const user = await getUserData(address ? address : '');
  const nfts = await getUnlistedNFTsForUser(address ? address : '');
  const userIndex = boardList.findIndex((list: any) => list[0] === address);
  // const activeRound = await getCurrentRoundID();

  // console.log('Round', activeRound);

  return (
    <Shell>
      <section className="flex w-full items-start gap-8">
        <div className="flex w-[55%] flex-col gap-8">
          <div className="flex w-full items-center gap-10">
            <Stats title="My points" value={user?.points ?? 0} />
            <Stats title="My ranking" value={`#${userIndex + 1}`} />
            <Stats title="My NFTs" value={nfts.length} />
            <Stats title="Championships" value={0} />
          </div>
          <Card title="NFTs Collected" className="py6 px-6">
            <div className="grid size-full grid-cols-4 gap-6">
              <CollectionCard
                image="/images/nfts/x_cyan.png"
                noOfNfts={user?.nfts?.xorange ?? 0}
                background="bg-accent-x_cyan"
                border="border-accent-x_cyan"
              />
              <CollectionCard
                image="/images/nfts/x_pink.png"
                noOfNfts={user?.nfts?.xpink ?? 0}
                background="bg-accent-x_pink"
                border="border-accent-x_pink"
              />
              <CollectionCard
                image="/images/nfts/x_orange.png"
                noOfNfts={user?.nfts?.xorange ?? 0}
                background="bg-accent-x_orange"
                border="border-accent-x_orange"
              />
              <CollectionCard
                image="/images/nfts/x_purple.png"
                noOfNfts={user?.nfts?.xpurple ?? 0}
                background="bg-accent-x_purple"
                border="border-accent-x_purple"
              />
              <CollectionCard
                image="/images/nfts/x_blue.png"
                noOfNfts={user?.nfts?.xblue ?? 0}
                background="bg-accent-x_blue"
                border="border-accent-x_blue"
              />
              <CollectionCard
                image="/images/nfts/x_green.png"
                noOfNfts={user?.nfts?.xgreen ?? 0}
                background="bg-accent-x_green"
                border="border-accent-x_green"
              />
              <CollectionCard
                image="/images/nfts/x_coral.png"
                noOfNfts={user?.nfts?.xcoral ?? 0}
                background="bg-accent-x_coral"
                border="border-accent-x_coral"
              />
              <CollectionCard
                image="/images/nfts/x_leaf_green.png"
                noOfNfts={user?.nfts?.xleafgreen ?? 0}
                background="bg-accent-x_leaf"
                border="border-accent-x_leaf"
              />
            </div>
          </Card>
        </div>
        <div className="flex w-[45%] flex-col gap-8">
          <div className="flex w-full items-center gap-[18px]">
            {/* <button className="group flex flex-col items-center justify-center gap-[6px] rounded-[6px] border border-primary-400 p-3">
              <div className="flex size-[55px] items-center justify-center rounded-full shadow-header group-hover:shadow-xl">
                <GameICons.player className="size-[38px]" />
              </div>
              <span className="text-[12px]/[18px] font-bold">Practice mode</span>
            </button> */}
            <StartGame mode={0} address={address} className="size-8" />
            <StartGame variant={'player'} mode={1} address={address} />
            <StartGame variant={'pro'} mode={2} address={address} />
          </div>
          <Card title="Top players">
            <ScrollArea className="h-[280px] w-full pl-3">
              <div className="flex w-full flex-col gap-3">
                {boardList.map((list: any, index: number) => (
                  <LeadBoardCard
                    key={index}
                    index={index + 1}
                    user={list[0]}
                    points={list[1]}
                    winner={index + 1 > 3 ? false : true}
                  />
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </section>
      <Card title="Task">
        <div className="grid w-full grid-cols-3 gap-[14px]">
          <TaskCard
            type="x"
            title="Social media"
            description="Follow, retweet, like a tweet, or create memes with a hashtag."
          />
          <TaskCard
            type="x"
            title="Social media"
            description="Follow, retweet, like a tweet, or create memes with a hashtag."
          />
          <TaskCard
            type="x"
            title="Social media"
            description="Follow, retweet, like a tweet, or create memes with a hashtag."
          />
        </div>
      </Card>
    </Shell>
  );
}

const Stats = ({ title, value }: { title: string; value: any }) => {
  return (
    <div className="flex h-[59px] w-[143px] flex-col items-center justify-center gap-2 rounded border border-white bg-[#4F6542]/[0.15] py-4">
      <span className="text-[11px]/[24px]">{title}</span>
      <span className="text-[14px]/[17px] font-semibold">{value}</span>
    </div>
  );
};

type CollectionCardProps = {
  image: string;
  noOfNfts: number;
  border: string;
  background: string;
};

const CollectionCard = ({ image, noOfNfts, border, background }: CollectionCardProps) => {
  return (
    <div
      className={cn(
        'relative flex h-[160px] w-full items-center justify-center border p-1',
        border
      )}
    >
      <div className="absolute flex h-[152px] w-full items-center justify-center p-1">
        <Image
          src={image}
          alt="nft"
          width={132}
          height={156}
          priority
          className="h-[152px] w-full object-cover"
        />
        <div className="absolute flex size-[56px] items-center justify-center rounded-full bg-primary-500">
          <div
            className={cn(
              'flex size-[38px] items-center justify-center rounded-full text-[16px]/[19px] font-medium',
              background
            )}
          >
            {noOfNfts}
          </div>
        </div>
      </div>
    </div>
  );
};
