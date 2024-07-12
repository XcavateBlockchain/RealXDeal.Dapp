import { Icons } from '@/components/icons';
import { cn, formatAddress } from '@/lib/utils';
type LeadProps = {
  index: any;
  user: string;
  points: number;
  winner?: boolean;
};
export function LeadBoardCard({ user, index, points, winner }: LeadProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between rounded-lg p-2',
        winner && 'bg-primary-300/[0.32] backdrop-blur-[2px]'
      )}
    >
      <div className="flex items-center gap-6">
        {winner ? (
          <Icons.goldMedal className="size-6" />
        ) : (
          <span className="text-[0.875rem] text-primary-foreground">{index}</span>
        )}
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-full bg-primary-foreground" />
          <span className="text-[0.875rem] text-primary-foreground">
            {formatAddress(user)}
          </span>
        </div>
      </div>

      <span className="text-[0.875rem] text-primary-foreground">{points} PTS</span>
    </div>
  );
}
