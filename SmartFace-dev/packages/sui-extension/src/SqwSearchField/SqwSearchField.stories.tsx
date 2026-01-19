import type { Meta, StoryObj } from '@storybook/react';

import { SqwSearchField } from './SqwSearchField';

const meta = {
  title: 'Components/Inputs/SqwSearchField',
  component: SqwSearchField,
  tags: ['autodocs'],
  args: {
    name: 'SearchField',
    label: 'Suche',
  },
} satisfies Meta<typeof SqwSearchField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
