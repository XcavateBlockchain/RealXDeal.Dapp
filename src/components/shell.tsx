import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const shellVariants = cva('grid gap-6', {
  variants: {
    variant: {
      // default: 'max-w-screen-[1440px] container mx-auto grid gap-8 p-[47px]'
      default:
        'container mx-auto w-full max-w-screen-2xl gap-10 pt-10 mb-20 lg:px-[50px] xl:px-[100px]'
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
