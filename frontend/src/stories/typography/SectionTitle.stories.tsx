import type { Meta, StoryObj } from '@storybook/react';
import { SectionTitle } from '@/components/typography';
import { Button } from '@/components/ui';

const meta: Meta<typeof SectionTitle> = {
  title: 'GreenCycle/Typography/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
  args: {
    children: 'Recyclable Waste Streams',
    subtitle: 'Segregation standards for municipal collection in Western Province',
  },
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    children: 'Nearby Drop-off Facilities',
    subtitle: 'Operating hours and accepted materials within 5 km',
    action: <Button variant="secondary" size="sm">View All Facilities</Button>,
  },
};
