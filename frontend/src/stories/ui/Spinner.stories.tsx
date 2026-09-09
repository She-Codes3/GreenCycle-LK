import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@/components/ui';

const meta: Meta<typeof Spinner> = {
  title: 'GreenCycle/UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'white', 'muted'],
    },
  },
  args: {
    size: 'md',
    variant: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const SizesAndVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <Spinner size="sm" variant="primary" />
        <Spinner size="md" variant="primary" />
        <Spinner size="lg" variant="primary" />
      </div>
      <div className="flex items-center gap-3 bg-primary p-3 rounded-xl">
        <Spinner size="sm" variant="white" />
        <Spinner size="md" variant="white" />
        <Spinner size="lg" variant="white" />
      </div>
      <div className="flex items-center gap-3">
        <Spinner size="md" variant="secondary" />
        <Spinner size="md" variant="muted" />
      </div>
    </div>
  ),
};
