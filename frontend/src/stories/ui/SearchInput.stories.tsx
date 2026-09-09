import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchInput } from '@/components/ui';

const meta: Meta<typeof SearchInput> = {
  title: 'GreenCycle/UI/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: 'Search recyclable materials, drop-off centers, or pickup IDs...',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {};

export const InteractiveSearch: Story = {
  render: () => {
    const [val, setVal] = useState('PET Bottle');
    return (
      <div className="max-w-md space-y-2">
        <SearchInput
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onClear={() => setVal('')}
          placeholder="Search items..."
        />
        <p className="text-xs text-content-muted">Current query: &quot;{val}&quot;</p>
      </div>
    );
  },
};
