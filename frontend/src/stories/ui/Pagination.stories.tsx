import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from '@/components/ui';

const meta: Meta<typeof Pagination> = {
  title: 'GreenCycle/UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    showSummary: { control: 'boolean' },
  },
  args: {
    currentPage: 1,
    totalPages: 8,
    totalItems: 80,
    pageSize: 10,
    showSummary: true,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.currentPage || 1);
    return (
      <div className="max-w-xl">
        <Pagination {...args} currentPage={page} onPageChange={setPage} />
      </div>
    );
  },
};
