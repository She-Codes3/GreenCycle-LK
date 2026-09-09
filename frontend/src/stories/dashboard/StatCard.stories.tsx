import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from '@/components/dashboard';

const meta: Meta<typeof StatCard> = {
  title: 'GreenCycle/Dashboard/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
  },
  args: {
    title: 'Recycled This Month',
    value: '128.4',
    unit: 'kg',
    icon: <span>♻️</span>,
    change: { value: 14.2, isPositive: true, label: 'vs last month' },
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const NegativeTrend: Story = {
  args: {
    title: 'Landfill Waste Diverted',
    value: '42.1',
    unit: 'kg',
    icon: <span>🗑️</span>,
    change: { value: 8.5, isPositive: false, label: 'vs previous period' },
  },
};

export const MetricGridOverview: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
      <StatCard
        title="Recycled This Month"
        value="128.4"
        unit="kg"
        icon={<span>♻️</span>}
        change={{ value: 14.2, isPositive: true, label: 'vs last month' }}
      />
      <StatCard
        title="GreenPoints"
        value="2,450"
        unit="pts"
        icon={<span>🌱</span>}
        change={{ value: 250, isPositive: true, label: 'earned this week' }}
      />
      <StatCard
        title="Pickups Completed"
        value="18"
        icon={<span>🚛</span>}
        change={{ value: '100%', label: 'on-time rate' }}
      />
      <StatCard
        title="CO2 Offset"
        value="64.2"
        unit="kg"
        icon={<span>🌍</span>}
        description="Equivalent to 3 planted trees"
      />
    </div>
  ),
};
