import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function DashboardCardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('overflow-x-auto', className)}>{children}</div>;
}
