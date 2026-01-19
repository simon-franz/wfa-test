import type { Meta, StoryObj } from '@storybook/react';

import { OnboardingController } from './OnboardingController';

const meta: Meta<typeof OnboardingController> = {
  title: 'Components/Utils/OnboardingController',
  component: OnboardingController,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingController>;

export const Default: Story = {
  args: {},
};
