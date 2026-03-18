import { MetricsCardComposite } from '@/ds/components/MetricsDashboardCard/dashboard-card-composite';
import { HorizontalBars } from '@/ds/components/HorizontalBars';
import { CHART_COLORS, formatCompact } from './metrics-utils';
import { Tabs, TabList, Tab, TabContent } from '@/ds/components/Tabs';
import { useTraceVolumeMetrics } from '../hooks/use-trace-volume-metrics';
import type { VolumeRow } from '../hooks/use-trace-volume-metrics';

function VolumeBars({ data }: { data: VolumeRow[] }) {
  return (
    <HorizontalBars
      data={data.map(d => ({ name: d.name, values: [d.completed, d.errors] }))}
      segments={[
        { label: 'Completed', color: CHART_COLORS.greenDark },
        { label: 'Errors', color: CHART_COLORS.redDark },
      ]}
      maxVal={Math.max(...data.map(d => d.completed + d.errors))}
      fmt={formatCompact}
      variant="shape"
    />
  );
}

export function TracesVolumeCard() {
  const { data, isLoading } = useTraceVolumeMetrics();

  const total = data?.agentData.reduce((s, d) => s + d.completed + d.errors, 0) ?? 0;

  return (
    <MetricsCardComposite
      title="Trace Volume"
      description="Runs and call counts."
      summary={data ? formatCompact(total) : '—'}
      summaryLabel="Total runs"
      isLoading={isLoading}
    >
      {!data || (data.agentData.length === 0 && data.workflowData.length === 0 && data.toolData.length === 0) ? (
        <p className="text-muted text-xs py-4">No trace volume data available</p>
      ) : (
        <Tabs defaultTab="agents" className="grid grid-rows-[auto_1fr] overflow-y-auto h-full">
          <TabList>
            <Tab value="agents" size="smaller">Agents</Tab>
            <Tab value="workflows" size="smaller">Workflows</Tab>
            <Tab value="tools" size="smaller">Tools</Tab>
          </TabList>
          <TabContent value="agents">
            {data.agentData.length > 0 ? (
              <VolumeBars data={data.agentData} />
            ) : (
              <p className="text-muted text-xs py-4">No agent data</p>
            )}
          </TabContent>
          <TabContent value="workflows">
            {data.workflowData.length > 0 ? (
              <VolumeBars data={data.workflowData} />
            ) : (
              <p className="text-muted text-xs py-4">No workflow data</p>
            )}
          </TabContent>
          <TabContent value="tools">
            {data.toolData.length > 0 ? (
              <VolumeBars data={data.toolData} />
            ) : (
              <p className="text-muted text-xs py-4">No tool data</p>
            )}
          </TabContent>
        </Tabs>
      )}
    </MetricsCardComposite>
  );
}
