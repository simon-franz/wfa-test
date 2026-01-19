import Stack from '@hrworks/sui-shared/components/Stack';
import { generateLoremParagraphs } from '@hrworks/sui-shared/functions/stringGenerator';
import { colors, overflowBehaviours, sizes, textAligns } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import Text from '../Text';
import Title from '../Title';

const meta: Meta<typeof Text> = {
  title: 'Components/Data Display/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'A flexible component for rendering text content',
      description: {
        component:
          'The Text-component allows us to display text in various forms like different colors, sizes and styles.',
      },
    },
  },
  argTypes: {
    textAlign: { control: 'radio', options: textAligns },
    variant: { table: { defaultValue: { summary: 'default' } } },
    fontSize: { table: { defaultValue: { summary: 'medium' } } },
    fontWeight: { table: { defaultValue: { summary: 'normal' } } },
    overflowBehaviour: { table: { defaultValue: { summary: 'break' } } },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'Hello World',
  },
};

export const Colors: Story = {
  render: (args) => (
    <Stack>
      {colors.map((color) => (
        <Text key={color} color={color} {...args}>
          {color}
        </Text>
      ))}
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack>
      {sizes.map((size) => (
        <Text key={size} fontSize={size} {...args}>
          {size}
        </Text>
      ))}
    </Stack>
  ),
};

export const OverflowBehaviours: Story = {
  render: (args) => (
    <Stack>
      {overflowBehaviours.map((overflowBehaviour) => (
        <Text key={overflowBehaviour} overflowBehaviour={overflowBehaviour} {...args}>
          <Title>{overflowBehaviour}:</Title>
          {generateLoremParagraphs(2)}
        </Text>
      ))}
    </Stack>
  ),
};

export const ResponsiveAlign: Story = {
  args: { children: 'Hello World', fullWidth: true, textAlign: { xs: 'start', md: 'center', xl: 'end' } },
};
