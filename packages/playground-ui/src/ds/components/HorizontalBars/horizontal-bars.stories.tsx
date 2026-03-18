import type { Meta, StoryObj } from '@storybook/react-vite';
import { TooltipProvider } from '../Tooltip';
import { HorizontalBars } from './horizontal-bars';

const fmt = (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v));

const singleSegment = [{ label: 'Requests', color: '#6366f1' }];

const stackedSegments = [
  { label: 'Input', color: '#3b82f6' },
  { label: 'Output', color: '#93c5fd' },
];

const singleData = [
  { name: 'chef-agent', values: [4200] },
  { name: 'eval-agent', values: [3100] },
  { name: 'search-agent', values: [1800] },
  { name: 'billing-agent', values: [900] },
  { name: 'moderation-agent', values: [400] },
];

const stackedData = [
  { name: 'chef-agent', values: [2800, 1400] },
  { name: 'eval-agent', values: [1900, 1200] },
  { name: 'search-agent', values: [1200, 600] },
  { name: 'billing-agent', values: [600, 300] },
  { name: 'moderation-agent', values: [250, 150] },
];

const meta: Meta<typeof HorizontalBars> = {
  title: 'Metrics/HorizontalBars',
  component: HorizontalBars,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HorizontalBars>;

export const LineDefault: Story = {
  render: () => (
    <div style={{ width: '30rem', height: 300 }}>
      <HorizontalBars data={singleData} segments={singleSegment} maxVal={4200} fmt={fmt} />
    </div>
  ),
};

export const LineStacked: Story = {
  render: () => (
    <TooltipProvider>
      <div style={{ width: '30rem', height: 300 }}>
        <HorizontalBars data={stackedData} segments={stackedSegments} maxVal={4200} fmt={fmt} />
      </div>
    </TooltipProvider>
  ),
};

export const ShapeDefault: Story = {
  render: () => (
    <div style={{ width: '30rem', height: 300 }}>
      <HorizontalBars variant="shape" data={singleData} segments={singleSegment} maxVal={4200} fmt={fmt} />
    </div>
  ),
};

export const ShapeStacked: Story = {
  render: () => (
    <TooltipProvider>
      <div style={{ width: '30rem', height: 300 }}>
        <HorizontalBars variant="shape" data={stackedData} segments={stackedSegments} maxVal={4200} fmt={fmt} />
      </div>
    </TooltipProvider>
  ),
};

export const Variants: Story = {
  render: () => (
    <TooltipProvider>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ width: '30rem', height: 280 }}>
          <h3 className="text-ui-md text-neutral3 mb-3">Line (default)</h3>
          <HorizontalBars data={stackedData} segments={stackedSegments} maxVal={4200} fmt={fmt} />
        </div>
        <div style={{ width: '30rem', height: 280 }}>
          <h3 className="text-ui-md text-neutral3 mb-3">Shape</h3>
          <HorizontalBars variant="shape" data={stackedData} segments={stackedSegments} maxVal={4200} fmt={fmt} />
        </div>
      </div>
    </TooltipProvider>
  ),
};
