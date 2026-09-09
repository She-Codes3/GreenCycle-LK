import type { Meta, StoryObj } from '@storybook/react';
import { Textarea, FormField } from '@/components/ui';

const meta: Meta<typeof Textarea> = {
  title: 'GreenCycle/UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    success: { control: 'boolean' },
    showCount: { control: 'boolean' },
    maxLength: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: 'Describe the waste items, estimated weight, or specific pickup instructions...',
    showCount: true,
    maxLength: 200,
    rows: 4,
    error: false,
    success: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithFormField: Story = {
  render: () => (
    <div className="max-w-md">
      <FormField
        label="Dumping Report Details"
        htmlFor="details-input"
        required
        helperText="Include landmark details or nearby street names in Colombo."
      >
        <Textarea
          id="details-input"
          placeholder="Pile of plastic containers and coconut husks dumped near the canal bank..."
          showCount
          maxLength={300}
        />
      </FormField>
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    defaultValue: 'Too short',
    error: true,
  },
};
