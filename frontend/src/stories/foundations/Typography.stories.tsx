import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'GreenCycle/Foundations/Typography',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const TypographyScale: Story = {
  render: () => (
    <div className="max-w-5xl mx-auto space-y-10 font-sans">
      <div>
        <h1 className="text-3xl font-bold text-content">Typography Specimen</h1>
        <p className="text-sm text-content-secondary mt-1">
          Primary font: <strong className="text-primary font-semibold">Outfit</strong> (with Plus Jakarta Sans fallback).
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-base font-bold text-content uppercase tracking-wider border-b border-border pb-2">
          Headings Hierarchy
        </h2>

        <div className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-card">
          <div className="border-b border-border pb-4">
            <span className="text-xs font-mono text-content-muted block mb-1">
              .ui-page-title (h1 / 36px–40px Bold)
            </span>
            <h1 className="ui-page-title">Smart Waste Management in Sri Lanka</h1>
          </div>

          <div className="border-b border-border pb-4">
            <span className="text-xs font-mono text-content-muted block mb-1">
              .ui-section-title (h2 / 20px SemiBold)
            </span>
            <h2 className="ui-section-title">Upcoming Municipal Ward Schedule</h2>
          </div>

          <div className="border-b border-border pb-4">
            <span className="text-xs font-mono text-content-muted block mb-1">
              Subsection Heading (h3 / 16px SemiBold)
            </span>
            <h3 className="text-base font-semibold text-content">Recyclable Plastic Collection Zone</h3>
          </div>

          <div>
            <span className="text-xs font-mono text-content-muted block mb-1">
              Component Title (h4 / 14px Bold)
            </span>
            <h4 className="text-sm font-bold text-content">Collection Vehicle WP-CAD-4921 Details</h4>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-base font-bold text-content uppercase tracking-wider border-b border-border pb-2">
          Body & Functional Text
        </h2>

        <div className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-card">
          <div className="border-b border-border pb-4">
            <span className="text-xs font-mono text-content-muted block mb-1">
              .ui-body (16px / leading-7 / #475569)
            </span>
            <p className="ui-body">
              GreenCycle LK connects citizens with local municipal councils to streamline waste segregation at source, track collection trucks in real time, and earn redeemable GreenPoints for verified recycling efforts.
            </p>
          </div>

          <div className="border-b border-border pb-4">
            <span className="text-xs font-mono text-content-muted block mb-1">
              .ui-caption (14px / leading-5 / #94a3b8)
            </span>
            <p className="ui-caption">
              Last updated: September 09, 2026 at 1:45 PM • GPS location verified by Colombo Municipal Council.
            </p>
          </div>

          <div>
            <span className="text-xs font-mono text-content-muted block mb-1">
              .ui-field-label (14px / font-medium / #0f172a)
            </span>
            <label className="text-sm font-medium text-content">
              Pickup Street Address <span className="text-red-600">*</span>
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-base font-bold text-content uppercase tracking-wider border-b border-border pb-2">
          Font Weights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-border bg-surface text-center">
            <span className="text-3xl font-normal text-content block mb-1">Aa</span>
            <span className="text-xs font-semibold text-content">Regular (400)</span>
            <span className="text-[11px] text-content-muted block">Body text, descriptions</span>
          </div>
          <div className="p-4 rounded-xl border border-border bg-surface text-center">
            <span className="text-3xl font-medium text-content block mb-1">Aa</span>
            <span className="text-xs font-semibold text-content">Medium (500)</span>
            <span className="text-[11px] text-content-muted block">Buttons, labels, nav links</span>
          </div>
          <div className="p-4 rounded-xl border border-border bg-surface text-center">
            <span className="text-3xl font-semibold text-content block mb-1">Aa</span>
            <span className="text-xs font-semibold text-content">SemiBold (600)</span>
            <span className="text-[11px] text-content-muted block">Section titles, stat values</span>
          </div>
          <div className="p-4 rounded-xl border border-border bg-surface text-center">
            <span className="text-3xl font-bold text-content block mb-1">Aa</span>
            <span className="text-xs font-semibold text-content">Bold (700)</span>
            <span className="text-[11px] text-content-muted block">Page titles, metric hero</span>
          </div>
        </div>
      </section>
    </div>
  ),
};
