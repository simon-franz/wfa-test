import type { Meta, StoryObj } from '@storybook/react';

import Badge from '../Badge';
import Button from '../Button';
import FontAwesomeIcon from '../FontAwesomeIcon';
import TextField from '../TextField';
import { Section } from './Section';

const meta = {
  title: 'Components/Layout/Section',
  component: Section,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    title: 'This is a Title',
    children: 'This is a child',
  },
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SectionWithIcon: Story = {
  args: { titleChildren: <FontAwesomeIcon name="circle-info" variant="solid" /> },
};
export const SectionWithBadge: Story = {
  args: { titleChildren: <Badge>A badge</Badge> },
};
export const SectionWithTextfield: Story = {
  args: { children: <TextField name="Vorname" label="Vorname" /> },
};

export const SectionWithButton: Story = {
  args: { titleChildren: <Button>Button</Button> },
};
export const SectionWithToggableIconBreak: Story = {
  args: { titleChildren: <FontAwesomeIcon name="circle-info" variant="solid" /> },
};
