import type { Meta, StoryObj } from '@storybook/react';

import { BarChart } from './BarChart';

const tooltipOptions = [true, false, 'shared'];

const meta = {
  title: 'Components/Data Display/BarChart',
  component: BarChart,
  parameters: {
    docs: {
      subtitle: 'Interactive component for comparing and analyzing data across categories ',
      description: {
        component:
          'A chart component that visually represents and compares categorical data through rectangular bars of varying heights or lengths, allowing viewers to quickly identify patterns, trends, and differences across categories.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    dataLabel: true,
    legend: {
      enabled: true,
    },
    yAxis: {
      title: 'Count',
    },
    xAxis: {
      title: 'Transportation',
      majorTick: true,
      type: 'datetime',
      pointStart: '2023-05-01',
      pointIntervalUnit: 'quarter',
    },
    data: [
      {
        name: 'japan',
        value: [137, 79, 105, 40, 41],
      },
      {
        name: 'france',
        value: [248, 236, 105, 95, 297],
      },
      {
        name: 'us',
        value: [52, 151, 219, 76, 248],
      },
      {
        name: 'germany',
        value: [97, 222, 208, 96, 234],
      },
      {
        name: 'norway',
        value: [135, 248, 272, 181, 142],
      },
    ],
  },
  argTypes: {
    tooltip: { options: tooltipOptions },
  },
} satisfies Meta<typeof BarChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
