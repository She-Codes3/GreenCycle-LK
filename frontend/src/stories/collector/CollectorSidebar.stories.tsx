import type { Meta, StoryObj } from '@storybook/react';
import { CollectorSidebar } from '@/features/collector/components';

const meta: Meta<typeof CollectorSidebar> = {
  title: 'GreenCycle/Collector/Sidebar',
  component: CollectorSidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CollectorSidebar>;

export const Dashboard: Story = {
  render: () => <div className="h-screen"><CollectorSidebar /></div>,
};

export const MonitoringActive: Story = {
  render: () => <div className="h-screen"><CollectorSidebar activeItem="monitoring" /></div>,
};