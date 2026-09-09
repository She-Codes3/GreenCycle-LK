import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'GreenCycle/Foundations/Design Tokens',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="max-w-5xl mx-auto space-y-12 font-sans">
      <div>
        <h1 className="text-3xl font-bold text-content">GreenCycle LK Design Tokens</h1>
        <p className="text-sm text-content-secondary mt-1">
          Complete token specifications defining radius, shadows, spacing, focus states, and z-indices.
        </p>
      </div>

      {/* Border Radius */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-content uppercase tracking-wider border-b border-border pb-2">
          Border Radius
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-border bg-surface text-center">
            <div className="h-16 w-full rounded-lg bg-primary-light flex items-center justify-center font-mono text-xs text-primary font-bold mb-2">
              rounded-lg (8px)
            </div>
            <span className="text-xs font-semibold text-content">rounded-lg</span>
            <span className="text-[11px] text-content-muted block">Tags, small buttons, badges</span>
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface text-center">
            <div className="h-16 w-full rounded-xl bg-primary-light flex items-center justify-center font-mono text-xs text-primary font-bold mb-2">
              rounded-xl (12px)
            </div>
            <span className="text-xs font-semibold text-content">rounded-xl</span>
            <span className="text-[11px] text-content-muted block">Standard buttons, inputs, alerts</span>
          </div>

          <div className="p-4 rounded-2xl border border-border bg-surface text-center">
            <div className="h-16 w-full rounded-2xl bg-primary-light flex items-center justify-center font-mono text-xs text-primary font-bold mb-2">
              rounded-2xl (16px)
            </div>
            <span className="text-xs font-semibold text-content">rounded-2xl</span>
            <span className="text-[11px] text-content-muted block">Cards, modals, map surfaces</span>
          </div>

          <div className="p-4 rounded-full border border-border bg-surface text-center">
            <div className="h-16 w-full rounded-full bg-primary-light flex items-center justify-center font-mono text-xs text-primary font-bold mb-2">
              rounded-full
            </div>
            <span className="text-xs font-semibold text-content">rounded-full</span>
            <span className="text-[11px] text-content-muted block">Pills, avatars, switch toggles</span>
          </div>
        </div>
      </section>

      {/* Shadows */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-content uppercase tracking-wider border-b border-border pb-2">
          Box Shadows
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-surface shadow-card">
            <h4 className="font-bold text-sm text-content">shadow-card</h4>
            <code className="text-xs font-mono text-primary block mt-1">
              0 2px 10px rgb(15 23 42 / 0.04)
            </code>
            <p className="text-xs text-content-secondary mt-2">
              Used on standard base cards, stat containers, and list containers.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-surface shadow-elevated">
            <h4 className="font-bold text-sm text-content">shadow-elevated</h4>
            <code className="text-xs font-mono text-primary block mt-1">
              0 8px 24px rgb(15 23 42 / 0.08)
            </code>
            <p className="text-xs text-content-secondary mt-2">
              Used on modal dialogs, interactive cards on hover, and dropdown menus.
            </p>
          </div>
        </div>
      </section>

      {/* Accessibility Focus States */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-content uppercase tracking-wider border-b border-border pb-2">
          Focus States & Accessibility Ring
        </h2>
        <div className="p-6 rounded-2xl border border-border bg-surface shadow-card space-y-4">
          <p className="text-xs text-content-secondary">
            Global accessible focus outline configured in <code className="text-primary font-mono font-semibold">index.css</code>:
          </p>
          <code className="block bg-muted p-3 rounded-xl text-xs font-mono text-content">
            outline: 3px solid rgb(16 185 129 / 0.35); outline-offset: 2px;
          </code>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium focus-visible:outline"
            >
              Tab or Click to Focus Me
            </button>
            <input
              type="text"
              placeholder="Focusable Input Field"
              className="ui-input max-w-xs"
            />
          </div>
        </div>
      </section>

      {/* Z-Index Hierarchy */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-content uppercase tracking-wider border-b border-border pb-2">
          Z-Index Scale
        </h2>
        <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-card">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted text-content-secondary font-semibold border-b border-border">
              <tr>
                <th className="py-2.5 px-4">Token</th>
                <th className="py-2.5 px-4">Value</th>
                <th className="py-2.5 px-4">Usage Component</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-content-secondary">
              <tr>
                <td className="py-2 px-4 font-mono font-semibold text-content">z-base</td>
                <td className="py-2 px-4 font-mono">0</td>
                <td className="py-2 px-4">Default document flow</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-semibold text-content">z-navigation</td>
                <td className="py-2 px-4 font-mono">20</td>
                <td className="py-2 px-4">Desktop Sidebar layout</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-semibold text-content">z-map</td>
                <td className="py-2 px-4 font-mono">30</td>
                <td className="py-2 px-4">Map surface and overlay tiles</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-semibold text-content">z-dropdown</td>
                <td className="py-2 px-4 font-mono">40</td>
                <td className="py-2 px-4">Dropdown menus, select options</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-semibold text-content">z-sticky</td>
                <td className="py-2 px-4 font-mono">50</td>
                <td className="py-2 px-4">Navbar sticky header</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-semibold text-content">z-overlay</td>
                <td className="py-2 px-4 font-mono">60</td>
                <td className="py-2 px-4">Mobile menu drawer backdrop</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-semibold text-content">z-modal</td>
                <td className="py-2 px-4 font-mono">70</td>
                <td className="py-2 px-4">Modals, dialog popups, confirmation alerts</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-semibold text-content">z-toast</td>
                <td className="py-2 px-4 font-mono">80</td>
                <td className="py-2 px-4">Floating notifications, tooltips</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  ),
};
