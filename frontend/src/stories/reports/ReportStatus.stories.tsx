import type { Meta, StoryObj } from '@storybook/react';
import { ReportStatus } from '@/components/reports/ReportStatus';

const meta: Meta<typeof ReportStatus> = {
  title: 'GreenCycle/Reports/ReportStatus',
  component: ReportStatus,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['SUBMITTED', 'VERIFIED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReportStatus>;

export const Default: Story = {
  args: {
    status: 'SUBMITTED',
    size: 'md',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <span className="w-32 text-xs text-content-muted">Submitted:</span>
        <ReportStatus status="SUBMITTED" size="sm" />
        <ReportStatus status="SUBMITTED" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-32 text-xs text-content-muted">Verified:</span>
        <ReportStatus status="VERIFIED" size="sm" />
        <ReportStatus status="VERIFIED" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-32 text-xs text-content-muted">In Progress:</span>
        <ReportStatus status="IN_PROGRESS" size="sm" />
        <ReportStatus status="IN_PROGRESS" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-32 text-xs text-content-muted">Resolved:</span>
        <ReportStatus status="RESOLVED" size="sm" />
        <ReportStatus status="RESOLVED" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-32 text-xs text-content-muted">Rejected:</span>
        <ReportStatus status="REJECTED" size="sm" />
        <ReportStatus status="REJECTED" size="md" />
      </div>
    </div>
  ),
};
