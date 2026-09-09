import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, Card } from '@/components/ui';

const meta: Meta<typeof Skeleton> = {
  title: 'GreenCycle/UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  render: () => (
    <div className="max-w-md space-y-2">
      <Skeleton variant="text" width="80%" height={20} />
      <Skeleton variant="text" width="100%" height={14} />
      <Skeleton variant="text" width="60%" height={14} />
    </div>
  ),
};

export const CardSkeleton: Story = {
  name: 'Card',
  render: () => (
    <Card className="max-w-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={60} height={20} />
      </div>
      <Skeleton variant="text" width="75%" height={18} />
      <Skeleton variant="text" width="100%" height={12} />
      <Skeleton variant="text" width="50%" height={12} />
      <div className="pt-2 border-t border-border flex justify-end">
        <Skeleton variant="rectangular" width={80} height={32} />
      </div>
    </Card>
  ),
};

export const TableSkeleton: Story = {
  name: 'Table',
  render: () => (
    <div className="max-w-2xl rounded-2xl border border-border bg-surface p-4 space-y-3 shadow-card">
      <div className="flex justify-between border-b border-border pb-2">
        <Skeleton variant="text" width="20%" height={14} />
        <Skeleton variant="text" width="25%" height={14} />
        <Skeleton variant="text" width="20%" height={14} />
        <Skeleton variant="text" width="15%" height={14} />
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex justify-between items-center py-2">
          <Skeleton variant="text" width="22%" height={12} />
          <Skeleton variant="text" width="28%" height={12} />
          <Skeleton variant="rectangular" width={60} height={18} />
          <Skeleton variant="text" width="12%" height={12} />
        </div>
      ))}
    </div>
  ),
};

export const DashboardSkeleton: Story = {
  name: 'Dashboard',
  render: () => (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1.5 w-1/3">
          <Skeleton variant="text" width="100%" height={24} />
          <Skeleton variant="text" width="60%" height={12} />
        </div>
        <Skeleton variant="rectangular" width={120} height={36} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-4 space-y-3">
            <div className="flex justify-between">
              <Skeleton variant="text" width="50%" height={12} />
              <Skeleton variant="circular" width={28} height={28} />
            </div>
            <Skeleton variant="text" width="70%" height={28} />
            <Skeleton variant="text" width="40%" height={10} />
          </Card>
        ))}
      </div>
    </div>
  ),
};
