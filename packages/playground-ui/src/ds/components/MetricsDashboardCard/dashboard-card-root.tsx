import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function DashboardCardRoot({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'grid grid-rows-[4rem_20rem] gap-2 min-w-[20rem] md:min-w-[22rem] lg:min-w-[24rem] xl:min-w-[26rem] 2xl:min-w-[28rem]',
        className,
      )}
    >
      {children}
    </div>
  );
}
