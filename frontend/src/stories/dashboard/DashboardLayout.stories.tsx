import type { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout, DashboardHeader, DashboardGrid, StatCard, QuickActions } from '@/components/dashboard';
import { Sidebar, SidebarItem, Navbar, UserMenu } from '@/components/layout';
import { Button } from '@/components/ui';

const meta: Meta<typeof DashboardLayout> = {
  title: 'GreenCycle/Dashboard/DashboardLayout',
  component: DashboardLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DashboardLayout>;

export const Default: Story = {
  render: () => (
    <DashboardLayout
      sidebar={
        <Sidebar>
          <SidebarItem label="Dashboard Overview" icon={<span>📊</span>} active />
          <SidebarItem label="Live Waste Trucks" icon={<span>🚛</span>} badge="2 Live" />
          <SidebarItem label="Collection Schedule" icon={<span>📅</span>} />
          <SidebarItem label="Drop-off Depots" icon={<span>📍</span>} />
          <SidebarItem label="Eco Rewards" icon={<span>🎁</span>} badge="480" />
        </Sidebar>
      }
      navbar={
        <Navbar
          actions={
            <div className="flex items-center gap-3">
              <Button size="sm" variant="secondary"><span>🔔</span></Button>
              <UserMenu user={{ name: 'Kavindu Perera', role: 'RESIDENT' }} />
            </div>
          }
        />
      }
    >
      <DashboardHeader
        userName="Kavindu Perera"
        role="RESIDENT"
        dateString="Wednesday, September 09, 2026"
      />
      <DashboardGrid columns={4}>
        <StatCard title="Recycled" value="128.4" unit="kg" icon={<span>♻️</span>} />
        <StatCard title="GreenPoints" value="480" unit="pts" icon={<span>🌱</span>} />
        <StatCard title="Pickups Done" value="18" icon={<span>🚛</span>} />
        <StatCard title="CO2 Offset" value="64.2" unit="kg" icon={<span>🌍</span>} />
      </DashboardGrid>
      <QuickActions
        actions={[
          { id: '1', label: 'Schedule Pickup', icon: <span>📅</span>, onClick: () => {} },
          { id: '2', label: 'Report Dumping', icon: <span>📸</span>, onClick: () => {} },
          { id: '3', label: 'Disposal Centers', icon: <span>📍</span>, onClick: () => {} },
          { id: '4', label: 'Redeem Points', icon: <span>🎁</span>, onClick: () => {} },
        ]}
      />
    </DashboardLayout>
  ),
};
