import type { Meta, StoryObj } from '@storybook/react';
import { MapLegend } from '@/components/maps';

const meta: Meta<typeof MapLegend> = {
  title: 'GreenCycle/Maps/MapLegend',
  component: MapLegend,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MapLegend>;

export const Default: Story = {
  render: () => (
    <div className="p-8 bg-muted/40 relative min-h-[220px]">
      <MapLegend position="top-left" />
    </div>
  ),
};
