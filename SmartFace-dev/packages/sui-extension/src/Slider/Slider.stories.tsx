import PaddedStoryFrame from '@hrworks/sui-shared/components/PaddedStoryFrame';
import { colors } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Inputs/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Range Input Control',
      description: {
        component: 'The Slider component provides a way for users to select a value within a specific range.',
      },
    },
  },
  argTypes: {
    min: { table: { defaultValue: { summary: '0' } } },
    max: { table: { defaultValue: { summary: '100' } } },
    step: { table: { defaultValue: { summary: '1' } } },
    value: { table: { defaultValue: { summary: '0' } } },
    color: { table: { defaultValue: { summary: 'primary' } } },
    showTrack: { table: { defaultValue: { summary: 'true' } } },
  },
  render: function Component(args) {
    const [value, setValue] = useState(args.value || 0);

    return <Slider {...args} value={value} onValueChange={setValue} />;
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => (
    <PaddedStoryFrame>
      <Slider {...args} />
    </PaddedStoryFrame>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <>
      {colors.map((color) => (
        <div key={color}>
          <h4>{color}</h4>
          <Slider {...args} color={color} value={50} />
        </div>
      ))}
    </>
  ),
};

export const RangeVariations: Story = {
  render: function RangeVariationsComponent(args) {
    const [value1, setValue1] = useState(30);
    const [value2, setValue2] = useState(0.5);
    const [value3, setValue3] = useState(0);

    return (
      <>
        <div>
          <h4>Default (0-100, step 1)</h4>
          <div style={{ paddingBottom: 10 }}>Current value: {value1}</div>
          <Slider {...args} min={0} max={100} step={1} value={value1} onValueChange={setValue1} />
        </div>

        <div>
          <h4>Fine control (0-1, step 0.01)</h4>
          <div style={{ paddingBottom: 10 }}>Current value: {value2}</div>
          <Slider {...args} min={0} max={1} step={0.01} value={value2} onValueChange={setValue2} />
        </div>

        <div>
          <h4>Negative range (-50-50, step 5)</h4>
          <div style={{ paddingBottom: 10 }}>Current value: {value3}</div>
          <Slider {...args} min={-50} max={50} step={5} value={value3} onValueChange={setValue3} />
        </div>
      </>
    );
  },
};

export const TrackVisibility: Story = {
  render: (args) => (
    <>
      <div>
        <h4>With track (default)</h4>
        <Slider {...args} showTrack={true} value={60} />
      </div>

      <div>
        <h4>Without track</h4>
        <Slider {...args} showTrack={false} value={60} />
      </div>
    </>
  ),
};

export const WithTooltip: Story = {
  render: (args) => (
    <PaddedStoryFrame>
      <Slider {...args} showTooltip />
    </PaddedStoryFrame>
  ),
};
