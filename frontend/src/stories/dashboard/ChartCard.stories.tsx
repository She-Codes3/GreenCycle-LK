import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChartCard } from '@/components/dashboard';

const meta: Meta<typeof ChartCard> = {
  title: 'GreenCycle/Dashboard/ChartCard',
  component: ChartCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChartCard>;

export const Default: Story = {
  render: () => {
    const [period, setPeriod] = useState('Weekly');
    return (
      <div className="max-w-2xl">
        <ChartCard
          title="Recycling Diversion Trend"
          subtitle="Total weight diverted from Karadiyana and Meethotamulla landfills"
          periods={['Daily', 'Weekly', 'Monthly']}
          selectedPeriod={period}
          onPeriodChange={setPeriod}
        >
          <div className="h-48 rounded-xl bg-muted/40 border border-dashed border-border flex items-center justify-center text-xs text-content-muted">
            [Diversion Volume Chart: {period} Aggregation • 480 kg Recycled]
          </div>
        </ChartCard>
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <div className="max-w-2xl">
      <ChartCard
        title="Waste Stream Distribution"
        subtitle="Loading telemetry metrics..."
        loading
      />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="max-w-2xl">
      <ChartCard
        title="Commercial Waste Audits"
        subtitle="No audits recorded for this quarter"
        empty
      />
    </div>
  ),
};
