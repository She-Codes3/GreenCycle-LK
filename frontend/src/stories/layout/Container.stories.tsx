import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '@/components/layout';

const meta: Meta<typeof Container> = {
  title: 'GreenCycle/Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
  },
  args: {
    size: 'lg',
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <div className="p-6 bg-surface border border-dashed border-primary rounded-2xl text-center">
        <span className="text-sm font-bold text-primary">Responsive Container ({args.size})</span>
        <p className="text-xs text-content-secondary mt-1">Consumes ui-container with responsive padding (px-4 sm:px-6 lg:px-8)</p>
      </div>
    </Container>
  ),
};
