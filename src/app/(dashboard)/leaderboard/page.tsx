import { Card } from '@/components/cards/card';
import { Shell } from '@/components/shell';
import Image from 'next/image';
import { getLeadBoards } from '@/lib/queries';
import { staleBoard } from '@/config/site';
import { LeadBoardCard } from '@/components/cards/leadboard-card';

export default async function Page() {
  const boardList = (await getLeadBoards()) ?? staleBoard;
  return (
    <Shell>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Image
            className="size-10 rounded-full"
            src="/images/user.png"
            width={40}
            height={40}
            priority
            alt="Rounded avatar"
          />
          <p className="ml-3">Deal Real Dev</p>
          <span className="me-2 rounded-xl bg-[#DC7DA63D] px-2.5 py-0.5 text-xs text-white shadow-none">
            1Ay00011DY...
          </span>
        </div>
        <p className="mt-2">
          Points : <span className="text-[#ECB278]">4,000</span>
        </p>
      </div>
      <Card title="Top players">
        {/* <ScrollArea className="h-[280px] w-full pl-3"> */}
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
        {/* </ScrollArea> */}
      </Card>
    </Shell>
  );
}
