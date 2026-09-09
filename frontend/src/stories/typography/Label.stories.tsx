import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@/components/typography';

const meta: Meta<typeof Label> = {
  title: 'GreenCycle/Typography/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    required: { control: 'boolean' },
  },
  args: {
    children: 'Estimated Recyclables Weight (kg)',
    required: true,
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};
