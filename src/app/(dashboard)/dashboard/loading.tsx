import { Shell } from '@/components/shell';
import Skeleton from '@/components/skelton';

export default function Loading() {
  return (
    <Shell>
      <section className="flex w-full gap-[54px]">
        <Skeleton className="h-[165px] w-2/5" />
        <div className="flex h-[165px] w-3/5 gap-[29px]">
          <Skeleton className="h-[165px] w-[172px]" />
          <Skeleton className="h-[165px] w-[172px]" />
        </div>
      </section>
      <section className="flex items-start gap-[54px]">
        <Skeleton className="h-[461px] w-2/5" />
        <Skeleton className="h-[461px] w-3/5" />
      </section>
      <Skeleton className="h-[269px] w-full" />
    </Shell>
  );
}
