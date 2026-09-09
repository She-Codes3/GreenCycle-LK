import type { Meta, StoryObj } from '@storybook/react';
import { WasteInstruction } from '@/components/waste/WasteInstruction';

const meta: Meta<typeof WasteInstruction> = {
  title: 'GreenCycle/Waste/WasteInstruction',
  component: WasteInstruction,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof WasteInstruction>;

const sampleSteps = [
  {
    stepNumber: 1,
    title: 'Segregate at Source',
    description: 'Separate biodegradable kitchen waste from dry recyclables like paper, plastics, and metals at household bins.',
    icon: '🗑️',
    dos: ['Use separate color-coded bins', 'Keep wet waste separate from paper'],
    donts: ['Do not mix broken fluorescent tubes with kitchen refuse'],
  },
  {
    stepNumber: 2,
    title: 'Rinse & Dry Recyclables',
    description: 'Rinse food containers, milk pouches, and tins to remove residual oils before storage.',
    icon: '🚿',
    dos: ['Rinse sauce bottles and yogurt cups', 'Air dry under sunlight'],
    donts: ['Do not submit greasy unwashed cardboard'],
  },
  {
    stepNumber: 3,
    title: 'Flatten & Bundle',
    description: 'Compress PET bottles, crush aluminium soda cans, and flatten corrugated cardboard boxes to save truck volume.',
    icon: '📦',
    dos: ['Tie flattened carton stacks with string', 'Crush plastic soda bottles'],
    donts: ['Do not leave bulky empty boxes unflattened'],
  },
  {
    stepNumber: 4,
    title: 'Handover on Designated Days',
    description: 'Check Colombo Municipal Council (CMC) neighborhood schedule and hand over items to authorized GreenCycle collectors.',
    icon: '🚛',
    dos: ['Place bins curbside before 7:00 AM', 'Hand hazardous batteries directly to crew'],
    donts: ['Do not dump bags by the roadside overnight'],
  },
];

export const Default: Story = {
  args: {
    title: 'Colombo Municipal Council — Household Segregation Guide',
    subtitle: 'Follow these essential steps to maximize recycling efficiency and earn GreenPoints',
    steps: sampleSteps,
  },
};

export const HazardousWasteHandling: Story = {
  args: {
    title: 'Safe Handling of Electronic & Chemical Hazards',
    subtitle: 'Strict protocols for lithium batteries, e-waste, and fluorescent bulbs',
    steps: [
      {
        stepNumber: 1,
        title: 'Tape Battery Terminals',
        description: 'Wrap transparent electrical tape over positive and negative contacts of 9V and lithium-ion cells.',
        icon: '🔋',
        dos: ['Cover exposed metallic contacts', 'Store in non-conductive plastic box'],
        donts: ['Never leave loose batteries in wet bins'],
      },
      {
        stepNumber: 2,
        title: 'Safeguard Glass Bulbs',
        description: 'Store CFL and fluorescent tube lamps in original cardboard sleeves to prevent mercury vapor leakage.',
        icon: '💡',
        dos: ['Wrap unbroken bulbs in newspaper', 'Keep away from children'],
        donts: ['Never crush or shatter fluorescent lights'],
      },
      {
        stepNumber: 3,
        title: 'Schedule E-Waste Hub Drop-off',
        description: 'Book a certified e-waste pickup slot on GreenCycle LK or deliver to the nearest registered CEA center.',
        icon: '🏭',
        dos: ['Keep cables bundled with appliances', 'Ensure device data is wiped'],
        donts: ['Never discard electronic motherboards in municipal compactors'],
      },
    ],
  },
};
