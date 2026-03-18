import { MetricsCardComposite } from '@/ds/components/MetricsDashboardCard/dashboard-card-composite';
import { MetricsDataTable } from '@/ds/components/DashboardDataTable/dashboard-data-table';
import { useModelUsageCostMetrics } from '../hooks/use-model-usage-cost-metrics';

export function ModelUsageCostCard() {
  const { data: rows, isLoading } = useModelUsageCostMetrics();

  return (
    <MetricsCardComposite
      title="Model Usage & Cost"
      description="Token consumption by model."
      summary="—"
      summaryLabel="Total cost"
      isLoading={isLoading}
    >
      {!rows || rows.length === 0 ? (
        <p className="text-muted text-xs py-4">No model usage data available</p>
      ) : (
        <MetricsDataTable
          columns={[
            { label: 'Model', value: row => row.model },
            { label: 'Input', value: row => row.input },
            { label: 'Output', value: row => row.output },
            { label: 'Cache Read', value: row => row.cacheRead },
            { label: 'Cache Write', value: row => row.cacheWrite },
            { label: 'Cost', value: () => '—', highlight: true },
          ]}
          data={rows.map(row => ({ ...row, key: row.model }))}
          //   className="border border-red-500"
        />
      )}
    </MetricsCardComposite>
  );
}
