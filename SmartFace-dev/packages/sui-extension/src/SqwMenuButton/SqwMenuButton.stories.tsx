import Badge from '@hrworks/sui-core/Badge';
import { StreamlineIcon } from '@hrworks/sui-core/StreamlineIcon';
import type { Meta, StoryObj } from '@storybook/react';

import { SqwMenuButton } from './SqwMenuButton';

const meta = {
  title: 'Components/Inputs/SqwMenuButton',
  component: SqwMenuButton,
  tags: ['autodocs'],
  args: {
    text: 'Zu erledigen',
    badge: <Badge color="warning">0</Badge>,
    icon: <StreamlineIcon name="list-to-do" />,
    onClick: () => console.log('Clicked'),
  },
} satisfies Meta<typeof SqwMenuButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
