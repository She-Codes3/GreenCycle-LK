import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SidebarItem } from '@/components/layout';

const meta: Meta<typeof Sidebar> = {
  title: 'GreenCycle/Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
    <div className="h-[600px] border border-border rounded-2xl overflow-hidden shadow-card max-w-xs">
      <Sidebar
        footer={
          <div className="text-xs text-content-muted flex items-center justify-between">
            <span>Colombo CMC v0.1</span>
            <span className="text-emerald-700 font-semibold">● Online</span>
          </div>
        }
      >
        <SidebarItem label="Dashboard Overview" icon={<span>📊</span>} active />
        <SidebarItem label="Live Truck Tracking" icon={<span>🚛</span>} badge="2 Live" />
        <SidebarItem label="Waste Schedule" icon={<span>📅</span>} />
        <SidebarItem label="Request Pickup" icon={<span>📦</span>} />
        <SidebarItem label="Disposal Centers" icon={<span>📍</span>} />
        <SidebarItem label="Report Dumping" icon={<span>📸</span>} badge="New" />
        <SidebarItem label="GreenPoints Rewards" icon={<span>🎁</span>} badge="480" />
      </Sidebar>
    </div>
  ),
};
