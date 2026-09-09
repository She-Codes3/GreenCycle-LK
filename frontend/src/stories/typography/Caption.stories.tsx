import type { Meta, StoryObj } from '@storybook/react';
import { Caption } from '@/components/typography';

const meta: Meta<typeof Caption> = {
  title: 'GreenCycle/Typography/Caption',
  component: Caption,
  tags: ['autodocs'],
  args: {
    children: 'Last GPS telemetry sync: 12 seconds ago • Colombo Ward 04 Station',
  },
};

export default meta;
type Story = StoryObj<typeof Caption>;

export const Default: Story = {};
