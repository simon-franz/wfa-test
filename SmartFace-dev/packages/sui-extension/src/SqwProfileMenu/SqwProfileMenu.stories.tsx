import Button from '@hrworks/sui-core/Button';
import Image from '@hrworks/sui-core/Image';
import Text from '@hrworks/sui-core/Text';
import type { Meta, StoryObj } from '@storybook/react';

import { SqwProfileMenu } from './SqwProfileMenu';

const meta = {
  title: 'Components/Inputs/SqwProfileMenu',
  component: SqwProfileMenu,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div css={{ display: 'flex', justifyContent: 'center', height: 300, width: 500 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    username: 'Lord Farquaad',
    email: 'lord.farquaad@farfaraway.com',
    portrait: <Image corner="circular" src="http://place.dog/500/500" />,
    onPortraitAction: () => {
      alert('This will open a modal in production');
    },
    children: (
      <>
        <Text href="/" color="info" fullWidth>
          Mein Profil
        </Text>
        <Text href="/" color="info" fullWidth>
          Feedback geben
        </Text>
        <Button corner="pill" fullWidth>
          Abmelden
        </Button>
      </>
    ),
  },
} satisfies Meta<typeof SqwProfileMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const UsernameOnly: Story = {
  args: {
    email: undefined,
  },
};
