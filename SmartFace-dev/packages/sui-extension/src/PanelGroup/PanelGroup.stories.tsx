import Image from '@hrworks/sui-core/Image';
import type { Direction } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import { PanelGroup } from './PanelGroup';
import { PanelGroupItem } from './PanelGroupItem/PanelGroupItem';
import { PanelResizeHandle } from './PanelResizeHandle/PanelResizeHandle';

const directions: Direction[] = ['horizontal', 'vertical'];

const meta: Meta<typeof PanelGroup> = {
  title: 'Components/Data Display/PanelGroup',
  component: PanelGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'React component for resizable panel group layouts',
      description: {
        component:
          'Component that orchestrates resizable panels, empowering users to customize their digital workspace with elegant drag-and-drop simplicity.',
      },
    },
  },
  argTypes: {
    // It's actually a Responsive-Attribute-Generic not recognized by Storybook
    direction: {
      control: 'radio',
      options: directions,
    },
  },
};

export default meta;

type Story = StoryObj<typeof PanelGroup>;

export const Default: Story = {
  render: (args) => {
    return (
      <PanelGroup {...args}>
        <PanelGroupItem>
          <Image src="https://picsum.photos/1600/900?random=1" alt="Slide Image 1" />
        </PanelGroupItem>
        <PanelResizeHandle />
        <PanelGroupItem>
          <Image src="https://picsum.photos/1600/900?random=2" alt="Slide Image 2" />
        </PanelGroupItem>
      </PanelGroup>
    );
  },
};
