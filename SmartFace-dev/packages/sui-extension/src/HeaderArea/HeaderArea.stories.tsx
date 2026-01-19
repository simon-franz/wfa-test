import Button from '@hrworks/sui-core/Button';
import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import type { Meta, StoryObj } from '@storybook/react';

import { HeaderArea } from './HeaderArea';

const icon = <FontAwesomeIcon name="bug" />;

const meta = {
  title: 'Components/Layout/HeaderArea',
  component: HeaderArea,
  tags: ['autodocs'],
  args: {
    header: {
      title: 'HeaderArea-Title',
      subtitle: 'This is a subtitle',
      titleChildren: icon,
      subtitleChildren: icon,
    },
    toolbarChildren: [
      <Grid key="1">
        <GridItem>
          <Button>Test 1</Button>
        </GridItem>
        <GridItem>
          <Button>Test 2</Button>
        </GridItem>
        <GridItem>
          <Button>Test 3</Button>
        </GridItem>
      </Grid>,
    ],
  },
} satisfies Meta<typeof HeaderArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
