import type { Meta, StoryObj } from '@storybook/react';
import { PageTitle } from '@/components/typography';
import { Button } from '@/components/ui';

const meta: Meta<typeof PageTitle> = {
  title: 'GreenCycle/Typography/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
  args: {
    children: "Today's collection",
    subtitle: 'Track municipal collection vehicles operating in Colombo District 03',
  },
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    children: 'Illegal Dumping Incident Reports',
    subtitle: 'Community-verified reports forwarded to Colombo Municipal Council',
    action: <Button size="sm">Submit New Report</Button>,
  },
};
