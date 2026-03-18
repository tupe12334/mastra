import { useMemo } from 'react';
import { MetricsCardComposite } from '@/ds/components/MetricsDashboardCard/dashboard-card-composite';
import { MetricsDataTable } from '@/ds/components/DashboardDataTable/dashboard-data-table';
import { DashboardLineChart } from './dashboard-line-chart';
import { CHART_COLORS } from './metrics-utils';
import { Tabs, TabList, Tab, TabContent } from '@/ds/components/Tabs';
import { useScoresMetrics } from '../hooks/use-scores-metrics';

const SERIES_COLORS = [CHART_COLORS.green, CHART_COLORS.blue, CHART_COLORS.purple, CHART_COLORS.orange, CHART_COLORS.pink, CHART_COLORS.yellow];

export function ScoresCard() {
  const { data, isLoading } = useScoresMetrics();

  const series = useMemo(() => {
    if (!data?.scorerNames) return [];
    return data.scorerNames.map((name, i) => ({
      dataKey: name,
      label: name,
      color: SERIES_COLORS[i % SERIES_COLORS.length],
      aggregate: (points: Record<string, unknown>[]) => ({
        value: points.length > 0 ? (points.reduce((s, d) => s + ((d[name] as number) ?? 0), 0) / points.length).toFixed(2) : '0',
        suffix: 'avg',
      }),
    }));
  }, [data?.scorerNames]);

  return (
    <MetricsCardComposite
      title="Scores"
      description="Evaluation scorer performance."
      summary={data?.avgScore != null ? `avg ${data.avgScore}` : '—'}
      summaryLabel="Across all scorers"
      isLoading={isLoading}
    >
      {!data || data.summaryData.length === 0 ? (
        <p className="text-muted text-xs py-4">No scores data available</p>
      ) : (
        <Tabs defaultTab="over-time" className="overflow-visible">
          <TabList>
            <Tab value="over-time" size="smaller">
              Over Time
            </Tab>
            <Tab value="summary" size="smaller">
              Summary
            </Tab>
          </TabList>
          <TabContent value="over-time">
            {data.overTimeData.length > 0 ? (
              <DashboardLineChart data={data.overTimeData} series={series} yDomain={[0, 1]} />
            ) : (
              <p className="text-muted text-xs py-4">No time series data</p>
            )}
          </TabContent>
          <TabContent value="summary">
            <MetricsDataTable
              columns={[
                { label: 'Scorer', value: row => row.scorer },
                { label: 'Avg', value: row => row.avg.toFixed(2), highlight: true },
                { label: 'Min', value: row => row.min.toFixed(2) },
                { label: 'Max', value: row => row.max.toFixed(2) },
                { label: 'Count', value: row => row.count.toLocaleString() },
              ]}
              data={data.summaryData.map(row => ({ ...row, key: row.scorer }))}
            />
          </TabContent>
        </Tabs>
      )}
    </MetricsCardComposite>
  );
}
