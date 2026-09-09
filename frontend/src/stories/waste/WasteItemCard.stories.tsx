import type { Meta, StoryObj } from '@storybook/react';
import { WasteItemCard } from '@/components/waste/WasteItemCard';

const meta: Meta<typeof WasteItemCard> = {
  title: 'GreenCycle/Waste/WasteItemCard',
  component: WasteItemCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    name: { control: 'text' },
    category: {
      control: 'select',
      options: ['ORGANIC', 'PLASTIC', 'PAPER', 'GLASS', 'METAL', 'E_WASTE', 'HAZARDOUS'],
    },
    icon: { control: 'text' },
    points: { control: 'number' },
    preparationTip: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof WasteItemCard>;

export const Default: Story = {
  args: {
    name: 'PET Drinking Bottles',
    category: 'PLASTIC',
    icon: '🍾',
    points: 15,
    preparationTip: 'Rinse thoroughly with clean water, remove caps, and flatten before drop-off.',
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export const EWasteItem: Story = {
  args: {
    name: 'Old Electric Rice Cooker',
    category: 'E_WASTE',
    icon: '🔌',
    points: 75,
    preparationTip: 'Ensure cord is wound neatly. Remove any inner non-electrical pot if damaged.',
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export const WithImage: Story = {
  args: {
    name: 'Corrugated Cardboard Cartons',
    category: 'PAPER',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80',
    points: 25,
    preparationTip: 'Flatten all boxes completely and tie in bundles with coir string.',
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export const SriLankanCommonItemsGrid: Story = {
  render: () => {
    const items = [
      {
        name: 'King Coconut Shells (Thambili)',
        category: 'ORGANIC',
        icon: '🥥',
        points: 10,
        tip: 'Chop in halves for municipal compost collection to accelerate decomposition.',
      },
      {
        name: 'Arrack & Beer Glass Bottles',
        category: 'GLASS',
        icon: '🍶',
        points: 30,
        tip: 'Return intact bottles to regional depot or rinse and segregate by color.',
      },
      {
        name: 'Siddhalepa & Medicine Blister Packs',
        category: 'HAZARDOUS',
        icon: '💊',
        points: 40,
        tip: 'Keep separate from routine municipal waste. Deposit at central pharmacy hubs.',
      },
      {
        name: 'High-Density Polythene Grocery Bags',
        category: 'PLASTIC',
        icon: '🛍️',
        points: 20,
        tip: 'Wash away vegetable residues, dry under sun, and pack into reusable bags.',
      },
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl">
        {items.map((item, idx) => (
          <WasteItemCard
            key={idx}
            name={item.name}
            category={item.category}
            icon={item.icon}
            points={item.points}
            preparationTip={item.tip}
          />
        ))}
      </div>
    );
  },
};
