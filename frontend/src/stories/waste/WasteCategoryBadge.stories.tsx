import type { Meta, StoryObj } from '@storybook/react';
import { WasteCategoryBadge } from '@/components/waste';

const meta: Meta<typeof WasteCategoryBadge> = {
  title: 'GreenCycle/Waste/WasteCategoryBadge',
  component: WasteCategoryBadge,
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'select',
      options: ['ORGANIC', 'PLASTIC', 'PAPER', 'GLASS', 'METAL', 'E_WASTE', 'HAZARDOUS', 'OTHER'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    showIcon: { control: 'boolean' },
  },
  args: {
    category: 'PLASTIC',
    size: 'md',
    showIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof WasteCategoryBadge>;

export const Default: Story = {};

export const AllCategories: Story = {
  render: () => (
    <div className="flex items-center gap-2.5 flex-wrap">
      <WasteCategoryBadge category="ORGANIC" />
      <WasteCategoryBadge category="PLASTIC" />
      <WasteCategoryBadge category="PAPER" />
      <WasteCategoryBadge category="GLASS" />
      <WasteCategoryBadge category="METAL" />
      <WasteCategoryBadge category="E_WASTE" />
      <WasteCategoryBadge category="HAZARDOUS" />
      <WasteCategoryBadge category="OTHER" />
    </div>
  ),
};
