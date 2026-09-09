import type { Meta, StoryObj } from '@storybook/react';
import { ReportCard } from '@/components/reports/ReportCard';

const meta: Meta<typeof ReportCard> = {
  title: 'GreenCycle/Reports/ReportCard',
  component: ReportCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    id: { control: 'text' },
    title: { control: 'text' },
    issueType: { control: 'text' },
    location: { control: 'text' },
    submittedAt: { control: 'text' },
    status: {
      control: 'select',
      options: ['SUBMITTED', 'VERIFIED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'],
    },
    upvotes: { control: 'number' },
    commentsCount: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof ReportCard>;

export const Default: Story = {
  args: {
    id: 'RPT-2026-081',
    title: 'Illegal Plastic Dumping near Canal Embankment',
    issueType: 'Illegal Dumping',
    location: 'Wellawatte Canal Bank, Marine Drive, Colombo 06',
    submittedAt: '2 hours ago',
    status: 'IN_PROGRESS',
    imageUrl: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=600&q=80',
    upvotes: 24,
    commentsCount: 6,
    onUpvote: () => alert('Upvoted report #RPT-2026-081'),
    onView: () => alert('Viewing report details & photos'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export const WithoutImage: Story = {
  args: {
    id: 'RPT-2026-074',
    title: 'Missed Municipal Garbage Truck on Circular Road',
    issueType: 'Missed Collection',
    location: 'Circular Road, Dehiwala-Mount Lavinia',
    submittedAt: 'Yesterday at 4:15 PM',
    status: 'VERIFIED',
    upvotes: 11,
    commentsCount: 3,
    onUpvote: () => alert('Upvoted report'),
    onView: () => alert('Viewing report details'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export const ResolvedCleanup: Story = {
  args: {
    id: 'RPT-2026-062',
    title: 'Clogged Stormwater Drain with Plastic Bottles & Leaves',
    issueType: 'Drainage Hazard',
    location: 'Thunmulla Junction, Colombo 04',
    submittedAt: '3 days ago',
    status: 'RESOLVED',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    upvotes: 48,
    commentsCount: 12,
    onView: () => alert('Viewing resolution proof'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};
