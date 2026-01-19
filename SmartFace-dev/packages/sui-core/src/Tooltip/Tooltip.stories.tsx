import { generateLoremSentences } from '@hrworks/sui-shared/functions/stringGenerator';
import type { Meta, StoryObj } from '@storybook/react';

import Button from '../Button';
import Tooltip from '../Tooltip';

const meta = {
  title: 'Components/Data Display/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    children: <Button fullWidth>Test Button</Button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: <Button>Children</Button>, text: 'I am a tooltip text', title: 'Tooltip Title' },
};
export const LongText: Story = { args: { text: generateLoremSentences(3), placement: 'left' } };
export const Realistic: Story = { args: { text: generateLoremSentences(2), placement: 'left' } };
