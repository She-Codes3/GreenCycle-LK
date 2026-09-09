import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '@/components/layout';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'GreenCycle/Layout/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  args: {
    items: [
      { label: 'Western Province', href: '#' },
      { label: 'Colombo Municipal Council', href: '#' },
      { label: 'Ward 03 - Kollupitiya' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {};
