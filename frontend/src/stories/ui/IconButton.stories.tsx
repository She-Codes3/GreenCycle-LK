import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@/components/ui';

const meta: Meta<typeof IconButton> = {
  title: 'GreenCycle/UI/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rounded: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    'aria-label': 'Refresh map route',
    variant: 'secondary',
    size: 'md',
    rounded: false,
    loading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: <span>🔄</span>,
  },
};

export const Circular: Story = {
  args: {
    rounded: true,
    variant: 'primary',
    icon: <span>📍</span>,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton aria-label="Primary" variant="primary">
        <span>🌱</span>
      </IconButton>
      <IconButton aria-label="Secondary" variant="secondary">
        <span>⭐</span>
      </IconButton>
      <IconButton aria-label="Outline" variant="outline">
        <span>🔍</span>
      </IconButton>
      <IconButton aria-label="Ghost" variant="ghost">
        <span>🔔</span>
      </IconButton>
      <IconButton aria-label="Danger" variant="danger">
        <span>🗑️</span>
      </IconButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton aria-label="Small" size="sm"><span>📍</span></IconButton>
      <IconButton aria-label="Medium" size="md"><span>📍</span></IconButton>
      <IconButton aria-label="Large" size="lg"><span>📍</span></IconButton>
    </div>
  ),
};
