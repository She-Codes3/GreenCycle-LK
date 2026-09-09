import type { Meta, StoryObj } from '@storybook/react';
import { WasteCategoryCard } from '@/components/waste';

const meta: Meta<typeof WasteCategoryCard> = {
  title: 'GreenCycle/Waste/WasteCategoryCard',
  component: WasteCategoryCard,
  tags: ['autodocs'],
  args: {
    category: 'PLASTIC',
    title: 'Recyclable Plastics (PET & HDPE)',
    description: 'Beverage water bottles, milk jugs, shampoo bottles, and clean packaging containers.',
    isRecyclable: true,
    guidelines: [
      'Rinse out all liquid and dairy residue',
      'Remove non-recyclable colored caps',
      'Compress bottles to save bag volume',
    ],
  },
};

export default meta;
type Story = StoryObj<typeof WasteCategoryCard>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <WasteCategoryCard {...args} />
    </div>
  ),
};

export const OrganicCompost: Story = {
  render: () => (
    <div className="max-w-sm">
      <WasteCategoryCard
        category="ORGANIC"
        title="Biodegradable Organic Waste"
        description="Vegetable trimmings, fruit peels, tea leaves, and garden cuttings for composting."
        isRecyclable={true}
        guidelines={[
          'Do not mix with plastic wrappers',
          'Drain excess curry gravies and liquids',
          'Keep dry until curbside collection day',
        ]}
      />
    </div>
  ),
};

export const HazardousSpecial: Story = {
  render: () => (
    <div className="max-w-sm">
      <WasteCategoryCard
        category="HAZARDOUS"
        title="Hazardous & Medical Waste"
        description="Batteries, fluorescent tubes, pesticide bottles, and expired pharmaceuticals."
        isRecyclable={false}
        guidelines={[
          'Must be wrapped securely in sealed containers',
          'Deliver only to designated CEA drop-off centers',
          'Do not incinerate or bury in backyard soil',
        ]}
      />
    </div>
  ),
};
