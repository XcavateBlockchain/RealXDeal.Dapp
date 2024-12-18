'use client';

import { Icons } from '@/components/icons';
import { cn, formatAddress } from '@/lib/utils';
import IdentIcon from '../wallet-connect/identicon';
type LeadProps = {
  index: any;
  user: any;
  points: any;
  winner?: boolean;
};
export function LeadBoardCard({ user, index, points, winner }: LeadProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between rounded-lg p-2',
        winner && 'bg-[#495770]/[0.32] backdrop-blur-[2px]'
      )}
    >
      <div className="flex items-center gap-6">
        {winner ? (
          <Icons.goldMedal className="size-6" />
        ) : (
          <span className="text-[0.875rem] text-primary-foreground">{index}</span>
        )}
        <div className="flex items-center gap-2">
          <IdentIcon address={user} size={24} theme="beachball" />
          <span className="text-[0.875rem] text-primary-foreground">
            {formatAddress(user)}
          </span>
        </div>
      </div>

      <span className="text-[0.875rem] text-primary-foreground">{points} PTS</span>
    </div>
  );
}
