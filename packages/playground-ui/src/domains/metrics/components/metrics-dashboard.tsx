import { KpiCard } from './kpi-card';
import { ModelUsageCostCard } from './model-usage-cost-card';
import { TracesVolumeCard } from './traces-volume-card';
import { LatencyCard } from './latency-card';
import { ScoresCard } from './scores-card';
import { TokenUsageByAgentCard } from './token-usage-by-agent-card';
import { FlexSeparatedGrid } from './flex-separated-grid';
import { formatCompact } from './metrics-utils';
import { useAgentRunsKpiMetrics } from '../hooks/use-agent-runs-kpi-metrics';
import { useTotalTokensKpiMetrics } from '../hooks/use-total-tokens-kpi-metrics';
import { useAvgScoreKpiMetrics } from '../hooks/use-avg-score-kpi-metrics';

export function MetricsDashboard() {
  const { data: agentRunsKpi } = useAgentRunsKpiMetrics();
  const { data: totalTokensKpi } = useTotalTokensKpiMetrics();
  const { data: avgScoreKpi } = useAvgScoreKpiMetrics();

  return (
    <div className="grid gap-10 content-start mt-5">
      {/* KPI Summary Row */}
      <FlexSeparatedGrid>
        <KpiCard
          label="Total Agent Runs"
          value={agentRunsKpi?.value?.toLocaleString() ?? '—'}
          changePct={agentRunsKpi?.changePercent ?? undefined}
          prevValue={agentRunsKpi?.previousValue?.toLocaleString()}
        />
        <KpiCard
          label="Total Model Cost"
          value="—"
          lowerIsBetter
        />
        <KpiCard
          label="Total Tokens"
          value={totalTokensKpi?.value != null ? formatCompact(totalTokensKpi.value) : '—'}
          changePct={totalTokensKpi?.changePercent ?? undefined}
          prevValue={totalTokensKpi?.previousValue != null ? formatCompact(totalTokensKpi.previousValue) : undefined}
        />
        <KpiCard
          label="Avg Score"
          value={avgScoreKpi?.value != null ? String(avgScoreKpi.value) : '—'}
          changePct={avgScoreKpi?.changePercent ?? undefined}
          prevValue={avgScoreKpi?.previousValue != null ? String(avgScoreKpi.previousValue) : undefined}
        />
      </FlexSeparatedGrid>

      <hr className="border-none h-[2px] bg-surface5" />

      <FlexSeparatedGrid className="mb-20">
        <ModelUsageCostCard />

        <TokenUsageByAgentCard />

        <ScoresCard />

        <TracesVolumeCard />

        <LatencyCard />
      </FlexSeparatedGrid>
    </div>
  );
}
