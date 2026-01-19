import { colors } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import Text from '../Text';
import { Accordion } from './Accordion';
import { AccordionItem } from './Item/AccordionItem';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Layout/Accordion',
  component: Accordion,
  subcomponents: { AccordionItem },
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Interactive component that toggles visibility of content to improve information density',
      description: {
        component:
          'A flexible solution for grouping related content while maintaining a clean interface that users can navigate at their own pace.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem id="1" title="Item 1">
          <Text>An accordion item</Text>
        </AccordionItem>
        <AccordionItem id="2" title="Item 2">
          <Text>An accordion item</Text>
        </AccordionItem>
        <AccordionItem id="3" title="Item 3">
          <Text>An accordion item</Text>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const ItemColors: Story = {
  parameters: {
    controls: { exclude: ['color'] },
  },
  render: (args) => (
    <Accordion {...args}>
      {colors.map((color) => (
        <AccordionItem title={color} key={color} color={color}>
          <Text>An accordion item</Text>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};
