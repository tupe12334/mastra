import { DashboardCardRoot } from './dashboard-card-root';
import { DashboardCardTopBar } from './dashboard-card-top-bar';
import { DashboardCardTitleAndDescription } from './dashboard-card-title-and-description';
import { DashboardCardTitle } from './dashboard-card-title';
import { DashboardCardDescription } from './dashboard-card-description';
import { DashboardCardSummary } from './dashboard-card-summary';
import { DashboardCardLoading } from './dashboard-card-loading';
import { DashboardCardError } from './dashboard-card-error';
import { DashboardCardContent } from './dashboard-card-content';

export const MetricsCard = Object.assign(DashboardCardRoot, {
  TopBar: DashboardCardTopBar,
  TitleAndDescription: DashboardCardTitleAndDescription,
  Title: DashboardCardTitle,
  Description: DashboardCardDescription,
  Summary: DashboardCardSummary,
  Loading: DashboardCardLoading,
  Error: DashboardCardError,
  Content: DashboardCardContent,
});
