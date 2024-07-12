import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { BaseButton, BaseButtonProps } from './base-button';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex items-center justify-center gap-2 rounded-lg font-heading font-medium',
  {
    variants: {
      variant: {
        default:
          'bg-primary-300 text-foreground transition-colors  hover:bg-primary-300/85 disabled:pointer-events-none disabled:bg-[#CCCCCC] disabled:opacity-50',
        secondary:
          'bg-primary-200 text-foreground transition-colors  hover:bg-primary-200/85 disabled:pointer-events-none disabled:opacity-50',
        warning:
          'bg-primary-400 text-foreground transition-colors  hover:bg-primary-400/85 disabled:pointer-events-none disabled:opacity-50',
        outline:
          'border border-[#CCCCCC80] font-sans font-light text-[#CCCCCC80] hover:border-primary-300 hover:text-primary-300',
        text: 'rounded-none border-transparent bg-none text-[1.5rem]/[1.5rem] font-light text-primary-300 hover:text-primary-300/65'
      },
      size: {
        default: 'px-6 py-[18px] text-[1rem]/[1.2rem]',
        lg: 'px-[45px] py-4 text-[1rem]',
        md: 'px-6 py-2 text-[0.75rem]/[1.1875rem]',
        sm: 'p-2 text-[0.875rem]/[1.5rem] font-light',
        icon: 'size-10'
      },
      fullWidth: {
        true: 'w-full'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

// export interface ButtonProps extends BaseButtonProps, VariantProps<typeof buttonVariants> {}

// const Button = ({ variant, size, fullWidth, className, ...props }: ButtonProps) => {
//   return (
//     <BaseButton
//       className={cn(buttonVariants({ variant, size, fullWidth, className }))}
//       {...props}
//     />
//   );
// };

// Button.displayName = 'Button';

// export { Button, buttonVariants, BaseButton };

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
