import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'GreenCycle/Foundations/Colors',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

interface ColorSwatchProps {
  name: string;
  hex: string;
  variable: string;
  usage: string;
  textDark?: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, hex, variable, usage, textDark }) => (
  <div className="rounded-2xl border border-border bg-surface p-4 shadow-card flex flex-col gap-3">
    <div
      className="h-20 w-full rounded-xl flex items-end justify-end p-2 border border-black/5"
      style={{ backgroundColor: hex }}
    >
      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded shadow-sm ${textDark ? 'bg-black/10 text-content' : 'bg-black/30 text-white'}`}>
        {hex}
      </span>
    </div>
    <div>
      <h4 className="font-bold text-sm text-content">{name}</h4>
      <code className="text-xs text-primary font-mono block mt-0.5">{variable}</code>
      <p className="text-xs text-content-secondary mt-1">{usage}</p>
    </div>
  </div>
);

export const Palette: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto space-y-10 font-sans">
      <div>
        <h1 className="text-3xl font-bold text-content">GreenCycle LK Color System</h1>
        <p className="text-sm text-content-secondary mt-1">
          Curated eco-friendly color palette adhering to WCAG AA accessibility standards.
        </p>
      </div>

      {/* Primary Brand */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-content border-b border-border pb-2">
          Primary Brand Colors (Forest Greens)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ColorSwatch
            name="Primary"
            hex="#134e39"
            variable="--color-primary / bg-primary"
            usage="Primary CTA buttons, sidebar navigation headers, key brand marks"
          />
          <ColorSwatch
            name="Primary Dark"
            hex="#0d3527"
            variable="--color-primary-dark / bg-primary-dark"
            usage="Button hover states, dark card gradients, header contrast"
          />
          <ColorSwatch
            name="Primary Light"
            hex="#e6f2ed"
            variable="--color-primary-light / bg-primary-light"
            usage="Active link backgrounds, subtle eco highlights, icon containers"
            textDark
          />
        </div>
      </section>

      {/* Secondary Accent */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-content border-b border-border pb-2">
          Secondary Accent Colors (Emerald Glow)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorSwatch
            name="Secondary"
            hex="#10b981"
            variable="--color-secondary / bg-secondary"
            usage="Active highlights, success indicators, eco points, live tracking beacons"
          />
          <ColorSwatch
            name="Secondary Dark"
            hex="#059669"
            variable="--color-secondary-dark / bg-secondary-dark"
            usage="Secondary button hover states, interactive card hover borders"
          />
        </div>
      </section>

      {/* Canvas & Surface */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-content border-b border-border pb-2">
          Neutral Surfaces & Borders
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <ColorSwatch
            name="Canvas"
            hex="#f8faf8"
            variable="--color-canvas / bg-canvas"
            usage="Root application page background, PWA layout backdrop"
            textDark
          />
          <ColorSwatch
            name="Surface"
            hex="#ffffff"
            variable="--color-surface / bg-surface"
            usage="Card backgrounds, modal sheets, dropdown popovers"
            textDark
          />
          <ColorSwatch
            name="Muted"
            hex="#f4f6f4"
            variable="--color-muted / bg-muted"
            usage="Input background, scrollbar track, table header stripes"
            textDark
          />
          <ColorSwatch
            name="Border"
            hex="#e2e6e2"
            variable="--color-border / border-border"
            usage="Standard card dividers, component borders, subtle outlines"
            textDark
          />
        </div>
      </section>

      {/* Content & Typography */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-content border-b border-border pb-2">
          Content & Typography
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ColorSwatch
            name="Content"
            hex="#0f172a"
            variable="--color-content / text-content"
            usage="Primary headings, titles, high-contrast labels, active icons"
          />
          <ColorSwatch
            name="Secondary Content"
            hex="#475569"
            variable="--color-content-secondary / text-content-secondary"
            usage="Body text, input field descriptions, table data rows"
          />
          <ColorSwatch
            name="Muted Content"
            hex="#94a3b8"
            variable="--color-content-muted / text-content-muted"
            usage="Captions, timestamps, disabled placeholder text"
          />
        </div>
      </section>

      {/* Waste Stream Colors */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-content border-b border-border pb-2">
          Waste Stream Colors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <ColorSwatch
            name="Organic Stream"
            hex="#15803d"
            variable="stream-organic"
            usage="Food waste, compostable yard waste, garden greens"
          />
          <ColorSwatch
            name="Paper & Cardboard"
            hex="#0284c7"
            variable="stream-paper"
            usage="Cardboard boxes, newspaper, office paper"
          />
          <ColorSwatch
            name="Plastic Stream"
            hex="#ea580c"
            variable="stream-plastic"
            usage="PET bottles, HDPE containers, rigid plastics"
          />
          <ColorSwatch
            name="Hazardous / E-Waste"
            hex="#dc2626"
            variable="stream-hazardous"
            usage="Batteries, chemicals, medical waste, electronic scrap"
          />
          <ColorSwatch
            name="Pending Collection"
            hex="#f59e0b"
            variable="stream-pending"
            usage="Pending schedule, warnings, awaiting municipal dispatch"
          />
        </div>
      </section>
    </div>
  ),
};
