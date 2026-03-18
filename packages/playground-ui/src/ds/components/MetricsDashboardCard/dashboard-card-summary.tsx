import { cn } from '@/lib/utils';

export function DashboardCardSummary({
  value,
  label,
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn('grid justify-end content-start text-right', className)}>
      <span className="text-ui-lg font-semibold text-neutral4">{value}</span>
      {label && <span className="text-ui-sm text-neutral2">{label}</span>}
    </div>
  );
}
