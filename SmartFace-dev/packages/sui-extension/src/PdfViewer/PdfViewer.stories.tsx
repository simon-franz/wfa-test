import type { Meta, StoryObj } from '@storybook/react';

import { PdfViewer } from './PdfViewer';

const meta = {
  title: 'Components/Media/PdfViewer',
  component: PdfViewer,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof PdfViewer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: 'https://d9yw7530xbzu.cloudfront.net/assets/HelloWorld.pdf',
  },
};

export const MultiplePages: Story = {
  args: {
    url: 'https://d9yw7530xbzu.cloudfront.net/assets/V15DetectUserManual.pdf',
  },
};
