import { iconSets } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import Icon from './';

const meta: Meta<typeof Icon> = {
  title: 'Components/Data Display/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Icon component',
      description: {
        component: 'Icon component that can switch between different icon sets',
      },
    },
  },
  argTypes: {
    iconSet: {
      control: 'select',
      options: iconSets,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'time-field-clock',
    iconSet: 'material-design',
  },
};
