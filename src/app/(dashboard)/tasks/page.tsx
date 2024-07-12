import { Card, CardWithoutHeading, TaskCard } from '@/components/cards/card';
import { PlayerStats } from '@/components/cards/player-stats-card';
import { Shell } from '@/components/shell';

export default function Tasks() {
  return (
    <Shell>
      <section className="flex justify-between">
        <CardWithoutHeading className="w-2/5">
          <PlayerStats title="Guesses" value={10} />
          <PlayerStats title="Correct " value={6} />
          <PlayerStats title="Failed " value={0} />
        </CardWithoutHeading>

        <CardWithoutHeading className="w-[177px] flex-col items-center px-4 py-6">
          <div className="flex items-center justify-center rounded bg-primary-300/[0.24] p-1 text-center backdrop-blur-[2px]">
            <span className="text-[0.9ren]/[1.5rem] text-primary-300">Earned points</span>
          </div>
          <span className="text-[1.5rem]/[1.5rem] font-medium text-primary-300">11,000</span>
        </CardWithoutHeading>
      </section>
      <Card
        title="Task"
        description=" Select any quest below to add on your community’s main quest board, This will
            enable your community to engage and provide continuous value."
        orientation="vertical"
      >
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
