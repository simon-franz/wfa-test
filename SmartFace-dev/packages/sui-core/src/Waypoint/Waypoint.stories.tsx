import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremSentences } from '@hrworks/sui-shared/functions/stringGenerator';
import type { Meta, StoryObj } from '@storybook/react';
import times from 'lodash/times';

import List from '../List';
import ListItem from '../List/Item';
import Text from '../Text';
import { Waypoint } from './Waypoint';

const meta = {
  title: 'Components/Data Display/Waypoint',
  component: Waypoint,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Waypoint>;

export default meta;

type Story = StoryObj<typeof meta>;

const listItemCollection = times(15, () => (
  <ListItem key={getId()} title="List-Item">
    <Text>{'This is a simple List-Item' + generateLoremSentences(1)}</Text>
  </ListItem>
));

const style = {
  height: '800px',
};

export const Default: Story = {
  render: (args) => (
    <List style={style}>
      {listItemCollection}
      <ListItem title="List-Item">
        <Waypoint {...args} />
        <Text color="warning" fontSize="extraLarge">
          This is a Waypoint
        </Text>
      </ListItem>
      {listItemCollection}
      <ListItem title="List-Item">
        <Waypoint {...args} />
        <Text color="warning" fontSize="extraLarge">
          This is a Waypoint
        </Text>
      </ListItem>
      {listItemCollection}
      <ListItem title="List-Item">
        <Waypoint {...args} />
        <Text color="warning" fontSize="extraLarge">
          This is a Waypoint
        </Text>
      </ListItem>
    </List>
  ),
};
