import type { Meta, StoryObj } from '@storybook/react';
import { Input, FormField } from '@/components/ui';

const meta: Meta<typeof Input> = {
  title: 'GreenCycle/UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    success: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    placeholder: 'Enter Colombo address or postal code...',
    error: false,
    success: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    placeholder: 'Search collection routes...',
    leftIcon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
};

export const ErrorState: Story = {
  args: {
    defaultValue: 'Invalid Colombo Ward 999',
    error: true,
  },
};

export const SuccessState: Story = {
  args: {
    defaultValue: 'Colombo 03 - Kollupitiya Ward 4',
    success: true,
  },
};

export const DisabledState: Story = {
  args: {
    defaultValue: 'Automated GPS Coordinates: [6.9271, 79.8612]',
    disabled: true,
  },
};

export const WithHelperText: Story = {
  render: () => (
    <div className="max-w-md">
      <FormField
        label="Disposal Facility Contact"
        htmlFor="phone-input"
        required
        helperText="Enter standard Sri Lanka mobile or landline (+94)"
      >
        <Input id="phone-input" placeholder="+94 77 123 4567" />
      </FormField>
    </div>
  ),
};

export const AllStatesOverview: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <FormField label="Standard Input" htmlFor="def-input">
        <Input id="def-input" placeholder="Default state..." />
      </FormField>

      <FormField label="Validated Success Input" htmlFor="succ-input" success="Ward zone verified!">
        <Input id="succ-input" defaultValue="Colombo 07 - Cinnamon Gardens" success />
      </FormField>

      <FormField label="Validation Error Input" htmlFor="err-input" error="Street address cannot be empty.">
        <Input id="err-input" defaultValue="" error />
      </FormField>

      <FormField label="Disabled System Field" htmlFor="dis-input">
        <Input id="dis-input" defaultValue="Collector ID: CL-CMB-89" disabled />
      </FormField>
    </div>
  ),
};
