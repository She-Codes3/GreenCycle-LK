import type { Meta, StoryObj } from '@storybook/react';
import { SidebarItem } from '@/components/layout';

const meta: Meta<typeof SidebarItem> = {
  title: 'GreenCycle/Layout/SidebarItem',
  component: SidebarItem,
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
    label: { control: 'text' },
    badge: { control: 'text' },
  },
  args: {
    label: 'Live Truck Tracking',
    icon: <span>🚛</span>,
    active: false,
    badge: 'Live',
  },
};

export default meta;
type Story = StoryObj<typeof SidebarItem>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-xs p-4 bg-surface border border-border rounded-xl">
      <SidebarItem {...args} />
    </div>
  ),
};

export const ActiveState: Story = {
  render: () => (
    <div className="max-w-xs p-4 bg-surface border border-border rounded-xl space-y-1">
      <SidebarItem label="Dashboard Overview" icon={<span>📊</span>} active />
      <SidebarItem label="Live Truck Tracking" icon={<span>🚛</span>} badge="2 Live" />
    </div>
  ),
};
