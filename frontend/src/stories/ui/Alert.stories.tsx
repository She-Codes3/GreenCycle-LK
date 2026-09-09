import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@/components/ui';

const meta: Meta<typeof Alert> = {
  title: 'GreenCycle/UI/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
    },
    title: { control: 'text' },
  },
  args: {
    variant: 'success',
    title: 'Recycling Batch Verified',
    children: '14.5 kg of sorted plastics were successfully weighed. 145 GreenPoints credited to your account.',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Collection Delay Notice',
    children: 'Truck CMB-4521 is delayed by 25 minutes due to heavy rain along Galle Road.',
  },
};

export const ErrorState: Story = {
  args: {
    variant: 'error',
    title: 'Contaminated Waste Batch',
    children: 'Batch rejected at Colombo West transfer station: unsegregated hazardous batteries detected in paper bin.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Public Holiday Schedule Change',
    children: 'No routine curbside collection on Poya Day. Recyclables will be collected on the following working day.',
  },
};
