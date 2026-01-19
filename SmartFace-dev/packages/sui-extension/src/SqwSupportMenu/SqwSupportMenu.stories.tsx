import Text from '@hrworks/sui-core/Text';
import type { Meta, StoryObj } from '@storybook/react';

import { SqwSupportMenu } from './SqwSupportMenu';

const meta = {
  title: 'Components/Inputs/SqwSupportMenu',
  component: SqwSupportMenu,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div css={{ display: 'flex', justifyContent: 'center', backgroundColor: 'gray', height: 300, width: 500 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Support',
    children: (
      <>
        <Text color="info" fullWidth href="/">
          HRworks Neuigkeiten"
        </Text>
        <Text color="info" fullWidth href="/">
          Helpcenter"
        </Text>
        <Text color="info" fullWidth href="/">
          Interaktive Touren"
        </Text>
        <Text color="info" fullWidth href="/">
          Datenschutzmodus aktivieren
        </Text>
      </>
    ),
  },
} satisfies Meta<typeof SqwSupportMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ChildrenOnly: Story = {
  args: {
    title: undefined,
  },
};
