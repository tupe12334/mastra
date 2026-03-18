import type { ReactNode } from 'react';
import { MetricsCard } from './dashboard-card';

export function MetricsCardComposite({
  title,
  description,
  summary,
  summaryLabel,
  children,
  className,
  isLoading,
  error,
}: {
  title: string;
  description?: string;
  summary?: string;
  summaryLabel?: string;
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  error?: string;
}) {
  const content = isLoading ? (
    <MetricsCard.Loading />
  ) : error ? (
    <MetricsCard.Error message={error} />
  ) : (
    <MetricsCard.Content>{children}</MetricsCard.Content>
  );

  return (
    <MetricsCard className={className}>
      <MetricsCard.TopBar>
        <MetricsCard.TitleAndDescription title={title} description={description} />
        {summary && <MetricsCard.Summary value={summary} label={summaryLabel} />}
      </MetricsCard.TopBar>
      {content}
    </MetricsCard>
  );
}
