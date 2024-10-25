import { cn } from '@/lib/utils';
import { Icons } from '../icons';
import Image from 'next/image';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  orientation?: 'vertical' | 'horizontal';
  description?: string;
}

export function Card({
  className,
  orientation = 'horizontal',
  title,
  description,
  children,
  ...props
}: CardProps) {
  return (
    <section
      className={cn(
        'flex w-full flex-col items-start gap-8 rounded-lg border border-border bg-card px-4 py-6 shadow-header',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'flex w-full gap-[18px]',
          orientation === 'vertical' ? 'flex-col' : 'flex-row justify-between'
        )}
      >
        <h2 className="text-[17px]/[21px] font-medium">{title}</h2>
        {description ? (
          <p className="text-[0.875rem]/[1.5rem] font-light">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

interface CardWithoutHeadingProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardWithoutHeading({
  className,
  children,
  ...props
}: CardWithoutHeadingProps) {
  return (
    <section
      className={cn(
        'flex w-full items-start gap-8 rounded-lg border border-border bg-black/[0.20] px-4 py-6 shadow-header backdrop-blur',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

type TaskCardProps = {
  type: string;
  title: string;
  description: string;
};

export function TaskCard({ title, description }: TaskCardProps) {
  return (
    <div className="flex flex-col items-start justify-start gap-4 rounded-lg bg-[#3E4F6D] px-6 py-10 backdrop-blur">
      <dt className="flex items-start gap-2">
        <Icons.xLogo className="size-6" />{' '}
        <span className="font-heading text-[0.875rem]/[1.543m] font-medium">{title}</span>
      </dt>
      <dd className="text-[0.875rem]/[1.5rem] font-light">{description}</dd>
    </div>
  );
}

export const NFTCard = ({ image, noOfNfts }: { image: string; noOfNfts: number }) => {
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
