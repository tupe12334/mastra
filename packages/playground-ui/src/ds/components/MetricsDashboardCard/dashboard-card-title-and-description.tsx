import type { ReactNode } from 'react';
import { DashboardCardTitle } from './dashboard-card-title';
import { DashboardCardDescription } from './dashboard-card-description';

type PropsWithTitleDescription = {
  title: string;
  description?: string;
  children?: never;
  className?: string;
};

type PropsWithChildren = {
  title?: never;
  description?: never;
  children: ReactNode;
  className?: string;
};

export function DashboardCardTitleAndDescription(props: PropsWithTitleDescription | PropsWithChildren) {
  if (props.children) {
    return <div className={props.className}>{props.children}</div>;
  }

  const { title, description } = props as PropsWithTitleDescription;

  return (
    <div className={props.className}>
      <DashboardCardTitle>{title}</DashboardCardTitle>
      {description && <DashboardCardDescription>{description}</DashboardCardDescription>}
    </div>
  );
}
