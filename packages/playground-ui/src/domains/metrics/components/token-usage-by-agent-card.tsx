import { MetricsCardComposite } from '@/ds/components/MetricsDashboardCard/dashboard-card-composite';
import { HorizontalBars } from './horizontal-bars';
import { CHART_COLORS, formatCompact } from './metrics-utils';
import { Tabs, TabList, Tab, TabContent } from '@/ds/components/Tabs';
import { useTokenUsageByAgentMetrics } from '../hooks/use-token-usage-by-agent-metrics';

export function TokenUsageByAgentCard() {
  const { data, isLoading } = useTokenUsageByAgentMetrics();

  const totalTokens = data?.reduce((s, d) => s + d.total, 0) ?? 0;

  return (
    <MetricsCardComposite
      title="Token Usage by Agent"
      description="Token consumption grouped by agent."
      summary={data ? formatCompact(totalTokens) : '—'}
      summaryLabel="Total tokens"
      isLoading={isLoading}
    >
      {!data || data.length === 0 ? (
        <p className="text-muted text-xs py-4">No token usage data available</p>
      ) : (
        <Tabs defaultTab="tokens" className="grid grid-rows-[auto_1fr] overflow-y-auto h-full ">
          <TabList>
            <Tab value="tokens" size="smaller">
              Tokens
            </Tab>
            <Tab value="cost" size="smaller">
              Cost
            </Tab>
          </TabList>
          <TabContent value="tokens">
            <HorizontalBars
              data={data.map(d => ({ name: d.name, values: [d.input, d.output] }))}
              segments={[
                { label: 'Input', color: CHART_COLORS.blueDark },
                { label: 'Output', color: CHART_COLORS.blueLight },
              ]}
              maxVal={Math.max(...data.map(d => d.input + d.output))}
              fmt={formatCompact}
              // className="border border-red-500"
            />
          </TabContent>
          <TabContent value="cost">
            <p className="text-muted text-xs py-4">Cost data not available</p>
          </TabContent>
        </Tabs>
      )}
    </MetricsCardComposite>
  );
}
