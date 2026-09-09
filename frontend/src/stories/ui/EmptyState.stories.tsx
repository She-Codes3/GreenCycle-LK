import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState, Button } from '@/components/ui';

const meta: Meta<typeof EmptyState> = {
  title: 'GreenCycle/UI/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: {
    title: 'No Active Waste Pickups',
    description: 'You have no scheduled collections pending for your Colombo residence.',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    title: 'No Illegal Dump Reports Filed',
    description: 'Your community area is clean. If you spot unsegregated or hazardous waste, file an instant report.',
    action: (
      <Button variant="primary" size="sm">
        Report Illegal Dumping
      </Button>
    ),
  },
};
