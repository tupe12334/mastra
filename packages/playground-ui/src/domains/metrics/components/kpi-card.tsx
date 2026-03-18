import { cn } from '@/index';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';

export function KpiCard({
  label,
  value,
  changePct,
  prevValue,
  lowerIsBetter,
}: {
  label: string;
  value: string;
  changePct?: number;
  prevValue?: string;
  lowerIsBetter?: boolean;
}) {
  const isGood = changePct !== undefined && (lowerIsBetter ? changePct < 0 : changePct >= 0);
  return (
    <div className="grid gap-1 min-w-[10rem]">
      <span className="text-ui-md text-neutral2 leading-relaxed">{label}</span>
      <strong className="text-header-lg text-neutral3 font-semibold">{value}</strong>
      {changePct !== undefined ? (
        <div className="flex items-center gap-1 text-sm text-neutral1 flex-wrap">
          <div className="flex items-center gap-1">
            <span className={cn('[&>svg]:w-4 [&>svg]:h-4', isGood ? 'text-green-600' : 'text-red-600')}>
              {changePct >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
            </span>
            <span className={cn(isGood ? 'text-green-600' : 'text-red-600')}>{Math.abs(changePct).toFixed(1)}%</span>
          </div>
          <div>
            vs previous <b className="text-neutral2 font-semibold">{prevValue}</b>
          </div>
        </div>
      ) : (
        <span className="text-sm text-neutral1">No previous value to compare</span>
      )}
    </div>
  );
}

/*

<div className="rounded-lg border border-border1 bg-surface2 px-4 py-3">
      <div className="flex items-end justify-between gap-2">
        <p className="text-2xl font-semibold font-mono text-icon6 leading-none">{value}</p>
      {changePct !== undefined ? (
        <div className="flex items-center gap-1 text-sm text-neutral1 flex-wrap">
          <div className="flex items-center gap-1">
            <span className={cn('[&>svg]:w-4 [&>svg]:h-4', isGood ? 'text-green-600' : 'text-red-600')}>
              {changePct >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
            </span>
            <span className={cn(isGood ? 'text-green-600' : 'text-red-600')}>{Math.abs(changePct).toFixed(1)}%</span>
          </div>
          <div>
            vs previous <b className="text-neutral2 font-semibold">{prevValue}</b>
          </div>
        </div>
      ) : (
        <span className="text-sm text-neutral1">No data for the selected period</span>
      )}
      </div>
      <div className="flex items-baseline justify-between gap-2 mt-1">
        <p className="text-xs text-icon2">{label}</p>
        {prevValue && (
          <span className="text-xs text-icon2 shrink-0">
            prev <span className="font-mono">{prevValue}</span>
          </span>
        )}
      </div>
    </div>
*/
