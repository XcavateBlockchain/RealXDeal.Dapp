import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const shellVariants = cva('grid items-center gap-10', {
  variants: {
    variant: {
      default: 'max-w-screen-[1440px] container mx-auto grid gap-8 p-[47px]'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType;
}

function Shell({ className, as: Comp = 'div', variant, ...props }: ShellProps) {
  return <Comp className={cn(shellVariants({ variant }), className)} {...props} />;
}

export { Shell, shellVariants };
