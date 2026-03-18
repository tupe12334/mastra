import type { Meta, StoryObj } from '@storybook/react-vite';
import { MetricsCard } from './dashboard-card';
import { MetricsCardComposite } from './dashboard-card-composite';

const meta: Meta<typeof MetricsCard> = {
  title: 'Metrics/MetricsCard',
  component: MetricsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MetricsCard>;

export const Default: Story = {
  render: () => (
    <MetricsCard>
      <MetricsCard.TopBar>
        <MetricsCard.TitleAndDescription title="Token Usage by Agent" description="Breakdown of token usage per agent." />
        <MetricsCard.Summary value="12,450" label="Total tokens" />
      </MetricsCard.TopBar>
      <MetricsCard.Content>
        <p className="text-ui-sm text-neutral3">Card content goes here</p>
      </MetricsCard.Content>
    </MetricsCard>
  ),
};

export const Loading: Story = {
  render: () => (
    <MetricsCard>
      <MetricsCard.TopBar>
        <MetricsCard.TitleAndDescription title="Token Usage by Agent" description="Breakdown of token usage per agent." />
        <MetricsCard.Summary value="12,450" label="Total tokens" />
      </MetricsCard.TopBar>
      <MetricsCard.Loading />
    </MetricsCard>
  ),
};

export const Error: Story = {
  render: () => (
    <MetricsCard>
      <MetricsCard.TopBar>
        <MetricsCard.TitleAndDescription title="Token Usage by Agent" description="Breakdown of token usage per agent." />
        <MetricsCard.Summary value="—" label="Total tokens" />
      </MetricsCard.TopBar>
      <MetricsCard.Error message="Failed to load token usage data" />
    </MetricsCard>
  ),
};

export const Composite: Story = {
  render: () => (
    <MetricsCardComposite
      title="Token Usage by Agent"
      description="Breakdown of token usage per agent."
      summary="12,450"
      summaryLabel="Total tokens"
    >
      <p className="text-ui-sm text-neutral3">Card content goes here</p>
    </MetricsCardComposite>
  ),
};
