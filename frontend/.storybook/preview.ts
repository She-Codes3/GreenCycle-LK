import type { Preview } from '@storybook/react';
import '../src/styles/index.css';
import 'leaflet/dist/leaflet.css';

const customViewports = {
  desktop: {
    name: 'Desktop (1440px)',
    styles: {
      width: '1440px',
      height: '900px',
    },
    type: 'desktop',
  },
  tablet: {
    name: 'Tablet (1024px)',
    styles: {
      width: '1024px',
      height: '768px',
    },
    type: 'tablet',
  },
  mobile: {
    name: 'Mobile (390px)',
    styles: {
      width: '390px',
      height: '844px',
    },
    type: 'mobile',
  },
};

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: customViewports,
      defaultViewport: 'desktop',
    },
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#f8faf8' },
        { name: 'surface', value: '#ffffff' },
        { name: 'muted', value: '#f4f6f4' },
        { name: 'primary-dark', value: '#0d3527' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'GreenCycle',
          [
            'Foundations',
            ['Colors', 'Typography', 'Design Tokens'],
            'UI',
            'Typography',
            'Layout',
            'Dashboard',
            'Maps',
            'Waste',
            'Collection',
            'Pickup',
            'Disposal',
            'Reports',
            'Rewards',
          ],
        ],
      },
    },
  },
};

export default preview;
