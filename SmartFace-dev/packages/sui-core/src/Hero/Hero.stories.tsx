import type { Meta, StoryObj } from '@storybook/react';

import TextField from '../TextField';
import { Hero } from './Hero';
import { HeroTitle } from './HeroTitle';

const meta = {
  title: 'Components/Data Display/Hero',
  component: Hero,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { children: <HeroTitle subtitle="Subtitle">Title</HeroTitle> },
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBackgroundImage: Story = {
  args: {
    src: 'https://hrworks-private-images.s3-eu-west-1.amazonaws.com/10060/jobApplicationServerInfoPicture/DB74EED2D22D93EEEB8A.png',
  },
};

export const WithChildren: Story = {
  args: {
    children: (
      <>
        <HeroTitle subtitle="Subtitle">Title</HeroTitle>
        <TextField name="test" placeholder="funny" />
      </>
    ),
  },
};
