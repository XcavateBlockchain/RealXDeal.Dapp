import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'flex size-[90px] items-center text-balance justify-center rounded-full border-4 text-[14px]/[24px]',
  {
    variants: {
      variant: {
        xgreen: 'border-[#78B36E] bg-[#78B36E]/[0.20]  text-[#78B36E]',
        xpurple: 'border-[#9678AE] bg-[#9678AE]/[0.20]  text-[#9678AE] ',
        xorange: 'border-[#ECB278] bg-[#ECB278]/[0.20]  text-[#ECB278] ',
        xleafgreen: 'border-[#457461] bg-[#457461]/[0.20]  text-[#457461] ',
        xblue: 'border-[#3B4F74] bg-[#3B4F74]/[0.20]  text-[#3B4F74]',
        xcyan: 'border-[#57A0C5] bg-[#57A0C5]/[0.20]  text-[#57A0C5]',
        xpink: 'border-[#DC7DA6] bg-[#DC7DA6]/[0.20]  text-[#DC7DA6]',
        xcoral: 'border-[#DF8985] bg-[#DF8985]/[0.20]  text-[#DF8985]'
      },
      shadow: {
        xgreen: '#78B36E',
        xpurple: '#9678AE',
        xorange: '#ECB278 ',
        xleafgreen: '#457461',
        xblue: '#3B4F74',
        xcyan: '#57A0C5 ',
        xpink: '#DC7DA6  ',
        xcoral: '#DF8985'
      }
    },
    defaultVariants: {
      variant: 'xgreen',
      shadow: 'xgreen'
    }
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export default function CollectionBadge({ className, color, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      style={{ boxShadow: `0px 0px 8.15px 0px ${color}` }}
      {...props}
    />
  );
}
