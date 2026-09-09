import type { Meta, StoryObj } from '@storybook/react';
import { Page, Container, Section } from '@/components/layout';

const meta: Meta<typeof Page> = {
  title: 'GreenCycle/Layout/Page',
  component: Page,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Page>;

export const Default: Story = {
  render: () => (
    <Page className="p-6">
      <Container size="lg">
        <Section spacing="sm" background="surface" className="p-6 rounded-2xl border border-border">
          <h2 className="text-xl font-bold text-content">GreenCycle LK Main Page Shell</h2>
          <p className="text-sm text-content-secondary mt-1">
            Standard full-height background canvas consuming <code className="text-primary font-mono font-semibold">ui-page</code>.
          </p>
        </Section>
      </Container>
    </Page>
  ),
};
