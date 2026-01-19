import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../Checkbox/Checkbox';
import { BlockUI } from './BlockUI';

const meta: Meta<typeof BlockUI> = {
  title: 'Components/Feedback/BlockUI',
  component: BlockUI,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'A component that blocks user interactions.',
      description: {
        component:
          'The BlockUI component prevents all user interactions (mouse and keyboard events) with the underlying interface. Perfect for indicating loading states or preventing user actions during critical operations.',
      },
      story: {
        inline: false,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BlockUI>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
  render: (args) => {
    return (
      <>
        <BlockUI {...args} />
        <Checkbox size="large" label="BlockUI prevents Interaction" name="checkbox" />
      </>
    );
  },
};
