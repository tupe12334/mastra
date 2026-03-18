import { MetricsCardComposite } from '@/ds/components/MetricsDashboardCard/dashboard-card-composite';
import { DashboardLineChart } from './dashboard-line-chart';
import { CHART_COLORS } from './metrics-utils';
import { Tabs, TabList, Tab, TabContent } from '@/ds/components/Tabs';
import { useLatencyMetrics } from '../hooks/use-latency-metrics';
import type { LatencyPoint } from '../hooks/use-latency-metrics';

const latencySeries = [
  {
    dataKey: 'p50',
    label: 'p50',
    color: CHART_COLORS.blue,
    aggregate: (data: Record<string, unknown>[]) => ({
      value: data.length > 0 ? `${Math.round(data.reduce((s, d) => s + (d.p50 as number), 0) / data.length)}` : '0',
      suffix: 'avg ms',
    }),
  },
  {
    dataKey: 'p95',
    label: 'p95',
    color: CHART_COLORS.yellow,
    aggregate: (data: Record<string, unknown>[]) => ({
      value: data.length > 0 ? `${Math.round(data.reduce((s, d) => s + (d.p95 as number), 0) / data.length)}` : '0',
      suffix: 'avg ms',
    }),
  },
];

function LatencyChart({ data }: { data: LatencyPoint[] }) {
  if (data.length === 0) {
    return <p className="text-muted text-xs py-4">No latency data</p>;
  }
  return <DashboardLineChart data={data} series={latencySeries} />;
}

export function LatencyCard() {
  const { data, isLoading } = useLatencyMetrics();

  const avgP50 =
    data && data.agentData.length > 0
      ? `${Math.round(data.agentData.reduce((s, d) => s + d.p50, 0) / data.agentData.length)}ms`
      : '—';

  return (
    <MetricsCardComposite title="Latency" description="Hourly p50 and p95 latency." summary={avgP50} summaryLabel="Avg p50" isLoading={isLoading}>
      {!data ? (
        <p className="text-muted text-xs py-4">No latency data available</p>
      ) : (
        <Tabs defaultTab="agents" className="overflow-visible">
          <TabList>
            <Tab value="agents" size="smaller">
              Agents
            </Tab>
            <Tab value="workflows" size="smaller">
              Workflows
            </Tab>
            <Tab value="tools" size="smaller">
              Tools
            </Tab>
          </TabList>
          <TabContent value="agents">
            <LatencyChart data={data.agentData} />
          </TabContent>
          <TabContent value="workflows">
            <LatencyChart data={data.workflowData} />
          </TabContent>
          <TabContent value="tools">
            <LatencyChart data={data.toolData} />
          </TabContent>
        </Tabs>
      )}
    </MetricsCardComposite>
  );
}
