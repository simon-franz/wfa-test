import type { Meta, StoryObj } from '@storybook/react';

import { TreeGraph } from './TreeGraph';

const meta = {
  title: 'Components/Data Display/TreeGraph',
  component: TreeGraph,
  tags: ['autodocs'],
  render: (args) => (
    <div style={{ height: '100vh', width: '100vw' }}>
      <TreeGraph {...args} />
    </div>
  ),
  args: {
    fullHeight: true,
    showControls: true,
    showMiniMap: true,
    leafGroupingThreshold: 4,
    entries: [
      {
        title: 'Willi Bösch',
        subtitle: 'Node',
        id: 'id-8698',
        dataGuideId: 'data-guide-test',
        isExpanded: true,
        entries: [
          {
            title: 'Oliver Born',
            subtitle: 'Node',
            id: 'id-8695',
            dataGuideId: 'data-guide-test',
            isExpanded: false,
          },
          {
            title: 'Kurt Fischer',
            subtitle: 'Node',
            id: 'id-8696',
            isExpanded: true,
          },
          {
            title: 'Nino Filipovic',
            subtitle: 'Node',
            id: 'id-8697',
            isExpanded: true,
          },
        ],
      },
    ],
  },
} satisfies Meta<typeof TreeGraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
