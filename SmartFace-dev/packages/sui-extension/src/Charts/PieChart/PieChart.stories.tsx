import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from './PieChart';

const meta = {
  title: 'Components/Data Display/PieChart',
  component: PieChart,
  tags: ['autodocs'],
  args: {
    dataSelection: true,
    dataLabelFormat: 'percentage',
    dataLabel: true,
    data: [
      {
        name: 'php',
        value: 400,
      },
      {
        name: 'scala',
        value: 300,
      },
      {
        name: 'stylus',
        value: 558,
      },
      {
        name: 'haskell',
        value: 573,
      },
      {
        name: 'elixir',
        value: 174,
      },
    ],

    legend: {
      enabled: true,
    },
  },
} satisfies Meta<typeof PieChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
