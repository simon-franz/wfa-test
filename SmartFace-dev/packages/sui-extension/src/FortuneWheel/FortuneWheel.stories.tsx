import { faker } from '@faker-js/faker';
import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import Image from '@hrworks/sui-core/Image';
import { colors } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import { FortuneWheel } from '../FortuneWheel/FortuneWheel';
import FortuneWheelItem from '../FortuneWheel/FortuneWheelItem/FortuneWheelItem';
import type { FortuneWheelProps } from './FortuneWheel.types';

const fortuneWheelColors: Required<FortuneWheelProps>['color'][] = ['random', 'alternating', ...colors];

const meta: Meta<typeof FortuneWheel> = {
  title: 'Components/Data Display/FortuneWheel',
  component: FortuneWheel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'An interactive spinning wheel component for random selection or gamification',
      description: {
        component:
          'The FortuneWheel is a customizable, interactive spinning wheel component that randomly selects an item from a set of options. It supports various sizes, color patterns, and can display text and media content in each segment.',
      },
    },
  },
  args: {
    color: 'alternating',
    maxSize: 'medium',
  },
  argTypes: {
    color: { table: { defaultValue: { summary: 'alternating' } } },
    maxSize: { table: { defaultValue: { summary: 'medium' } } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <FortuneWheel {...args}>
      <FortuneWheelItem id="Jinx" text="Jinx" />
      <FortuneWheelItem id="Bob" text="Bob" />
      <FortuneWheelItem id="Frodo" text="Frodo" />
      <FortuneWheelItem id="Dingus" text="Dingus" />
      <FortuneWheelItem id="Robin" text="Robin" />
      <FortuneWheelItem id="Rick" text="Rick Astley" />
    </FortuneWheel>
  ),
};

export const WithVariousMedia: Story = {
  render: (args) => (
    <FortuneWheel {...args}>
      <FortuneWheelItem text="Text Only" />
      <FortuneWheelItem text="With Icon" media={<FontAwesomeIcon name="user" />} />
      <FortuneWheelItem text="Normal Image" media={<Image src="https://placedog.net/100/100" alt="placedog" />} />
      <FortuneWheelItem text="Tall Image" media={<Image src="https://placedog.net/100/500" alt="placedog" />} />
      <FortuneWheelItem text="Wide Image" media={<Image src="https://placedog.net/500/100" alt="placedog" />} />
    </FortuneWheel>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <>
      {fortuneWheelColors.map((color) => (
        <FortuneWheel {...args} color={color} key={color} maxSize="extraSmall">
          <FortuneWheelItem text={`${color}`} />
          <FortuneWheelItem text={`${color}`} />
          <FortuneWheelItem text={`${color}`} />
          <FortuneWheelItem text={`${color}`} />
        </FortuneWheel>
      ))}
    </>
  ),
};

export const ManyItems: Story = {
  render: (args) => (
    <FortuneWheel {...args}>
      {faker.helpers.multiple(
        () => (
          <FortuneWheelItem key={faker.person.fullName()} text={faker.person.firstName()} />
        ),
        { count: 30 },
      )}
    </FortuneWheel>
  ),
};
