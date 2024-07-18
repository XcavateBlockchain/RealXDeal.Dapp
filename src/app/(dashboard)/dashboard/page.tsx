import { Shell } from '@/components/shell';
import UserStats from './_components/user-stats';
import { Card, CardWithoutHeading, TaskCard } from '@/components/cards/card';
import { getLeadBoards, getUser, getUserData } from '@/lib/queries';
import { getCookieStorage } from '@/lib/storage';
import { LeadBoardCard } from '@/components/cards/leadboard-card';
import Image from 'next/image';
import ProfileHeader from './_components/profile-header';
import { PlayerStats } from '@/components/cards/player-stats-card';
import LiveGamePlay from './_components/live-game-container';
import { staleBoard, staleUser } from '@/config/site';

export default async function Page() {
  const { address } = await getUser();
  const boardList = (await getLeadBoards()) ?? staleBoard;
  const user = (await getUserData(address ? address : '')) ?? staleUser;

  return (
    <Shell>
      {/* <UserStats /> */}
      <ProfileHeader points={user?.points} />
      <section className="flex w-full items-end gap-[54px]">
        <CardWithoutHeading className="w-2/5">
          <PlayerStats title="Guesses" value={Number(user?.wins) + Number(user?.losses)} />
          <PlayerStats title="Correct " value={user?.wins} />
          <PlayerStats title="Failed " value={user?.losses} />
        </CardWithoutHeading>
        <div className="flex w-3/5 items-start gap-[29px]">
          <div className="flex w-[172px] items-end justify-center rounded-lg border border-primary-400 bg-primary-400/[0.24] p-2.5">
            <LiveGamePlay type={0} points={user?.points} />
          </div>
          <div className="flex w-[172px] items-end justify-center rounded-lg border border-primary-200 bg-primary-200/[0.24] p-2.5">
            <LiveGamePlay type={1} points={user?.points} />
          </div>
        </div>
      </section>
      <section className="flex items-start gap-[54px]">
        <Card className="h-full w-2/5" title="Top 5 players">
          <div className="flex w-full flex-col gap-3">
            {boardList.map((list: any, index: number) => (
              <LeadBoardCard
                key={index}
                index={index + 1}
                user={list[0]}
                points={Number(list[1])}
                winner={index + 1 > 3 ? false : true}
              />
            ))}
          </div>
        </Card>

        <Card className="w-3/5" title="NFTs Collected">
          <div className="grid size-full grid-cols-4 gap-2">
            <CollectionCard image="/images/nfts/x_orange.png" noOfNfts={user?.nfts?.xorange} />
            <CollectionCard image="/images/nfts/x_pink.png" noOfNfts={user?.nfts?.xpink} />
            <CollectionCard image="/images/nfts/x_blue.png" noOfNfts={user?.nfts?.xblue} />
            <CollectionCard image="/images/nfts/x_cyan.png" noOfNfts={user?.nfts?.xorange} />
            <CollectionCard image="/images/nfts/x_coral.png" noOfNfts={user?.nfts?.xcoral} />
            <CollectionCard image="/images/nfts/x_purple.png" noOfNfts={user?.nfts?.xpurple} />
            <CollectionCard
              image="/images/nfts/x_leaf_green.png"
              noOfNfts={user?.nfts?.xleafgreen}
            />
            <CollectionCard image="/images/nfts/x_green.png" noOfNfts={user?.nfts?.xgreen} />
          </div>
        </Card>
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

const CollectionCard = ({ image, noOfNfts }: { image: string; noOfNfts: number }) => {
  return (
    <div className="relative w-full border border-primary-200 p-[6px]">
      <Image
        src={image}
        alt="nft"
        width={132}
        height={152}
        priority
        className="h-[152px] w-full"
      />{' '}
      <div className="absolute bottom-0 left-[53px] flex items-center justify-center rounded-t bg-primary-200 px-2">
        <span className="text-[1rem]/[1.2rem] font-light">{noOfNfts}</span>
      </div>
    </div>
  );
};
