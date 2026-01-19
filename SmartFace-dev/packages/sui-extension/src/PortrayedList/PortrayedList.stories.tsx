import Button from '@hrworks/sui-core/Button';
import Image from '@hrworks/sui-core/Image';
import type { Meta, StoryObj } from '@storybook/react';

import { PortrayedListItem } from './ListItem/PortrayedListItem';
import { PortrayedList } from './PortrayedList';

const meta = {
  title: 'Components/Data Display/PortrayedList',
  component: PortrayedList,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof PortrayedList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <PortrayedListItem
          title="Title"
          subtitle="Subtitle"
          media={<Image src="https://placedog.net/200/200" alt="Media" corner="circular" />}
        >
          <Button>Button</Button>
          <Button>Button</Button>
        </PortrayedListItem>
        <PortrayedListItem title="Title" subtitle="Subtitle">
          <Button>Button</Button>
          <Button>Button</Button>
        </PortrayedListItem>
        <PortrayedListItem
          title="Title"
          media={<Image src="https://placedog.net/200/200" alt="Media" corner="circular" />}
        >
          <Button>Button</Button>
          <Button>Button</Button>
        </PortrayedListItem>

        <PortrayedListItem
          title="Title"
          subtitle="Subtitle"
          media={<Image src="https://placedog.net/200/200" alt="Media" corner="circular" />}
        />
      </>
    ),
  },
};
