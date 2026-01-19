import Stack from '@hrworks/sui-shared/components/Stack';
import type { Meta, StoryObj } from '@storybook/react';

import List from '../List';
import Title from '../Title';
import ListItem from './Item';
import type { ListProps } from './List.types';

const lineStyles: ListProps['lineStyle'][] = ['solid', 'dotted', 'dashed', 'none'];

const meta: Meta<typeof List> = {
  title: 'Components/Data Display/List',
  component: List,
  subcomponents: { ListItem },
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Organized Display of Related Items',
      description: {
        component:
          'Lists display a collection of related items in a structured format, supporting selection, interaction, and various styling options.',
      },
    },
  },
  argTypes: {
    lineStyle: { table: { defaultValue: { summary: 'solid' } } },
    hoverable: { table: { defaultValue: { summary: 'true' } } },
  },
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem>First list item</ListItem>
      <ListItem>Second list item</ListItem>
      <ListItem>Third list item</ListItem>
    </List>
  ),
};

export const LineStyles: Story = {
  render: (args) => (
    <Stack>
      {lineStyles.map((lineStyle) => (
        <div key={lineStyle}>
          <Title>{lineStyle}</Title>
          <List lineStyle={lineStyle} {...args}>
            <ListItem>First item</ListItem>
            <ListItem>Second item</ListItem>
            <ListItem>Third item</ListItem>
          </List>
        </div>
      ))}
    </Stack>
  ),
};

export const Interactive: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem onClick={() => alert('Clicked!')}>Clickable item</ListItem>
      <ListItem href="http://localhost:6006/?path=/docs/components-inputs-button--docs" target="_blank">
        Link item (opens in new tab)
      </ListItem>
      <ListItem>Regular item</ListItem>
    </List>
  ),
};
