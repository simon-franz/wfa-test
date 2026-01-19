import type { Meta, StoryObj } from '@storybook/react';

import { WorkflowGraph } from './WorkflowGraph';

const meta = {
  title: 'Components/Data Display/WorkflowGraph',
  component: WorkflowGraph,
  tags: ['autodocs'],
  args: {
    // Write default props here
  },
} satisfies Meta<typeof WorkflowGraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nodes: [],
    edges: [],
  },
};

export const Custom: Story = {
  args: {
    nodes: [],
    edges: [],
  },
};
