import type { Meta, StoryObj } from '@storybook/react';
import { DashboardGrid, StatCard } from '@/components/dashboard';

const meta: Meta<typeof DashboardGrid> = {
  title: 'GreenCycle/Dashboard/DashboardGrid',
  component: DashboardGrid,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4],
    },
  },
  args: {
    columns: 4,
  },
};

export default meta;
type Story = StoryObj<typeof DashboardGrid>;

export const Default: Story = {
  render: (args) => (
    <DashboardGrid {...args}>
      <StatCard title="Total Pickups" value="128" unit="done" icon={<span>🚛</span>} />
      <StatCard title="Active Trucks" value="14" unit="online" icon={<span>📍</span>} />
      <StatCard title="Resolved Dumps" value="98%" unit="rate" icon={<span>🧹</span>} />
      <StatCard title="GreenPoints Pool" value="48,200" unit="pts" icon={<span>🌱</span>} />
    </DashboardGrid>
  ),
};
