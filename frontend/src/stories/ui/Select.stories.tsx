import type { Meta, StoryObj } from '@storybook/react';
import { Select, FormField } from '@/components/ui';

const meta: Meta<typeof Select> = {
  title: 'GreenCycle/UI/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    success: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: 'Choose municipal jurisdiction...',
    options: [
      { label: 'Colombo Municipal Council (CMC)', value: 'cmc' },
      { label: 'Dehiwala-Mount Lavinia (DMMC)', value: 'dmmc' },
      { label: 'Sri Jayawardenepura Kotte (KMC)', value: 'kmc' },
      { label: 'Kandy Municipal Council', value: 'kandy' },
      { label: 'Galle Municipal Council', value: 'galle' },
    ],
    error: false,
    success: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithFormField: Story = {
  render: () => (
    <div className="max-w-md">
      <FormField
        label="Waste Classification"
        htmlFor="waste-select"
        required
        helperText="Required for driver equipment assignment"
      >
        <Select
          id="waste-select"
          placeholder="Select waste stream category..."
          options={[
            { label: 'Organic / Compostable Kitchen Waste', value: 'ORGANIC' },
            { label: 'Rigid Plastics (PET / HDPE)', value: 'PLASTIC' },
            { label: 'Paper & Cardboard Bundles', value: 'PAPER' },
            { label: 'Electronic & Battery E-Waste', value: 'E_WASTE' },
            { label: 'Hazardous Chemical / Medical', value: 'HAZARDOUS' },
          ]}
        />
      </FormField>
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    error: true,
  },
};
