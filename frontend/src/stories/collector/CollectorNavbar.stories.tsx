import type { Meta, StoryObj } from '@storybook/react';
import { CollectorNavbar } from '@/features/collector/components';

const meta: Meta<typeof CollectorNavbar> = {
  title: 'GreenCycle/Collector/Navbar',
  component: CollectorNavbar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CollectorNavbar>;

export const Default: Story = {
  render: () => <CollectorNavbar />,
};