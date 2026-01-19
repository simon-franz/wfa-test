import type { Meta, StoryObj } from '@storybook/react';

import LineChart from '../LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Components/Data Display/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Data Trend Visualization',
      description: {
        component:
          'LineChart displays data series as continuous lines, ideal for visualizing trends, changes, and relationships between data points over a time period.',
      },
    },
  },
  args: {
    data: [
      {
        name: 'iceland',
        value: [-125, 240, -280, 175, 145, -150, 250, 145, -260, 15, 155, 160],
      },
      {
        name: 'netherlands',
        value: [145, 230, -265, 190, -155, 175, 235, 155, -55, 25, 175, 180],
      },
    ],
  },
  argTypes: {
    tooltip: {
      control: 'radio',
      options: [true, false, 'shared'],
    },
    dataLabel: {
      control: 'radio',
      options: [true, false, 'intelligent'],
      table: {
        defaultValue: { summary: 'intelligent' },
      },
    },
    radix: {
      table: { defaultValue: { summary: ',' } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof LineChart>;

export const Default: Story = {
  args: {
    tooltip: true,
    tooltipPostfix: '%',
    dataLabel: true,
    dataHover: true,
    legend: {
      interactive: true,
      align: 'right',
      layout: 'proximate',
    },
    yAxis: {
      title: 'Count',
      majorTick: true,
      majorTickPostfix: '%',
    },
    xAxis: {
      title: 'Transportation',
      majorTick: true,
    },
  },
};
