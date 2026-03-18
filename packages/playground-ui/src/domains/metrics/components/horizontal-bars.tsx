import { Tooltip, TooltipTrigger, TooltipContent } from '@/ds/components/Tooltip';
import { ScrollArea } from '@/ds/components/ScrollArea/scroll-area';
import { cn } from '@/lib/utils';

type Segment = { label: string; color: string };

export function HorizontalBars({
  data,
  segments,
  maxVal,
  fmt,
  className,
}: {
  data: Array<{ name: string; values: number[] }>;
  segments: Segment[];
  maxVal: number;
  fmt: (v: number) => string;
  className?: string;
}) {
  const sorted = [...data].sort((a, b) => {
    const totalB = b.values.reduce((s, v) => s + v, 0);
    const totalA = a.values.reduce((s, v) => s + v, 0);
    return totalB - totalA;
  });

  const isStacked = segments.length > 1;

  return (
    <ScrollArea className={cn('w-full h-full', className)} orientation="vertical">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 flex items-center gap-4">
          {segments.map(seg => (
            <div key={seg.label} className="flex items-center gap-2">
              <div className="h-0.5 w-3 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="text-ui-xs text-neutral3 uppercase">{seg.label}</span>
            </div>
          ))}
        </div>
        {isStacked && <span className="shrink-0 text-ui-xs text-neutral2 uppercase">Total</span>}
      </div>
      <div className="grid gap-2">
        {sorted.map((d, i) => {
          const total = d.values.reduce((s, v) => s + v, 0);
          const opacity = Math.max(0.3, 1 - i * 0.1);

          return (
            <div key={d.name}>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-ui-md text-neutral3">{d.name}</span>
                <span className="text-ui-md text-neutral4 tabular-nums">{fmt(total)}</span>
              </div>
              <div className="relative h-1 w-full border-b border-dotted border-white/10">
                <div className="absolute inset-0 pr-20">
                  <div className="relative h-full">
                    {segments.map((seg, si) => {
                      const val = d.values[si] ?? 0;
                      const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
                      const left = d.values.slice(0, si).reduce((s, v) => s + (maxVal > 0 ? (v / maxVal) * 100 : 0), 0);

                      if (isStacked) {
                        return (
                          <Tooltip key={seg.label}>
                            <TooltipTrigger asChild>
                              <div
                                className={`absolute inset-y-0 cursor-default ${si === 0 ? 'rounded-l' : ''} ${si === segments.length - 1 ? 'rounded-r' : ''}`}
                                style={{
                                  left: `${left}%`,
                                  width: `${pct}%`,
                                  backgroundColor: seg.color,
                                  opacity,
                                }}
                              />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="font-mono">
                              {fmt(val)} {seg.label.toLowerCase()}
                            </TooltipContent>
                          </Tooltip>
                        );
                      }

                      return (
                        <div
                          key={seg.label}
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: seg.color, opacity }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
