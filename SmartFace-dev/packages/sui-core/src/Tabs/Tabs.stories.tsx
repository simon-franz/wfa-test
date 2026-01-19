import { colors } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import Tabs from '../Tabs';
import { Tab } from '../Tabs/Tab/Tab';
import { TabList } from '../Tabs/TabList/TabList';
import { TabPanel } from '../Tabs/TabPanel/TabPanel';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  subcomponents: { TabList, Tab, TabPanel },
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Navigation Tab Component',
      description: {
        component: 'Tabs allow users to switch between different content panels.',
      },
    },
  },
  argTypes: {
    contentGap: { table: { defaultValue: { summary: 'default' } } },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs defaultSelectedItemId="1" {...args}>
      <TabList>
        <Tab id="1">This is the first Tab</Tab>
        <Tab id="2">This is the second Tab</Tab>
        <Tab id="3">This is the third Tab</Tab>
      </TabList>
      <TabPanel id="1">This is the TabPanel of the first Tab.</TabPanel>
      <TabPanel id="2">This is the TabPanel of the second Tab</TabPanel>
      <TabPanel id="3">This is the TabPanel of the third Tab</TabPanel>
    </Tabs>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <Tabs defaultSelectedItemId="primary" {...args}>
      <TabList>
        {colors.map((color) => (
          <Tab key={color} id={color} color={color}>
            {color}
          </Tab>
        ))}
      </TabList>
      {colors.map((color) => (
        <TabPanel key={`panel-${color}`} id={color} color={color}>
          This is the TabPanel for the {color} color.
        </TabPanel>
      ))}
    </Tabs>
  ),
};
