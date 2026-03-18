import { cn } from '@/lib/utils';

export function DashboardCardTitle({ children, className }: { children: string; className?: string }) {
  return <h3 className={cn('text-ui-lg font-semibold text-neutral3', className)}>{children}</h3>;
}
