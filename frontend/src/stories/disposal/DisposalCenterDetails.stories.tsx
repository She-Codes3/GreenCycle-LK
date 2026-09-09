import type { Meta, StoryObj } from '@storybook/react';
import { DisposalCenterDetails, DisposalCenterDetailsData } from '@/components/disposal/DisposalCenterDetails';

const meta: Meta<typeof DisposalCenterDetails> = {
  title: 'GreenCycle/Disposal/DisposalCenterDetails',
  component: DisposalCenterDetails,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof DisposalCenterDetails>;

const sampleCenter: DisposalCenterDetailsData = {
  id: 'CTR-CMB-01',
  name: 'Colombo Central Recycling & Segregation Depot',
  type: 'Municipal Resource Recovery',
  address: 'Bloemendhal Road, Kotahena, Colombo 13',
  phone: '+94 11 243 2500',
  email: 'colombo.depot@greencycle.lk',
  openingHours: '07:30 AM - 05:30 PM (Mon - Sat)',
  capacityStatus: 'NORMAL',
  schedule: [
    { day: 'Monday - Friday', hours: '07:30 AM - 05:30 PM', isOpen: true },
    { day: 'Saturday', hours: '08:00 AM - 02:00 PM', isOpen: true },
    { day: 'Sunday & Public Holidays', hours: 'Closed', isOpen: false },
  ],
  acceptedWaste: ['PLASTIC', 'PAPER', 'GLASS', 'METAL', 'E_WASTE'],
  rejectedWaste: [
    'Bio-medical or clinical sharps and syringes',
    'Asbestos roof sheeting and insulation material',
    'Explosive or unvented pressurized gas cylinders',
  ],
};

export const Default: Story = {
  args: {
    center: sampleCenter,
    onDirections: () => alert('Navigating to Bloemendhal Depot'),
    onClose: () => alert('Close drawer/modal'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl bg-surface p-6 rounded-2xl border border-border shadow-card">
        <Story />
      </div>
    ),
  ],
};

export const HighCapacityAlert: Story = {
  args: {
    center: {
      ...sampleCenter,
      name: 'Orugodawatta Transfer Station & Compactor Site',
      capacityStatus: 'NEAR_CAPACITY',
      address: 'Baseline Road, Orugodawatta, Colombo 14',
    },
    onDirections: () => alert('Navigating to Orugodawatta Transfer Station'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl bg-surface p-6 rounded-2xl border border-border shadow-card">
        <Story />
      </div>
    ),
  ],
};
