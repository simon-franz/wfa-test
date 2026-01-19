import type { Meta, StoryObj } from '@storybook/react';

import Iframe from '../Iframe';
import { SizeHandler } from './SizeHandler';

const meta = {
  title: 'Components/Utils/SizeHandler',
  component: SizeHandler,
  tags: ['autodocs'],
} satisfies Meta<typeof SizeHandler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    height: 400,
    children: <Iframe src="https://d9yw7530xbzu.cloudfront.net/assets/V15DetectUserManual.pdf" fullHeight={true} />,
  },
};
