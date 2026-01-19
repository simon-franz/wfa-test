import { gaps } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import Alert from '../Alert';
import Grid from '../Grid';
import GridItem from '../GridItem';

const meta: Meta<typeof Grid> = {
  title: 'Components/Layout/Grid',
  component: Grid,
  subcomponents: { GridItem },
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Responsive 12-column grid system for flexible layouts with customizable gaps and breakpoints',
      description: {
        component:
          'A powerful grid layout component that provides a 12-column responsive system. Supports flexible gap sizing, responsive breakpoints, and works seamlessly with GridItem components for precise control over layout, sizing, offset, and visibility across different screen sizes.',
      },
    },
  },
  argTypes: {
    gap: { control: 'select', options: gaps, table: { defaultValue: { summary: 'medium' } } },
    columnGap: { control: 'select', options: gaps },
    rowGap: { control: 'select', options: gaps },
    size: {
      control: 'select',
      options: ['default', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      table: { defaultValue: { summary: 'default' } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  render: (args) => {
    return (
      <Grid {...args}>
        <GridItem>
          <Alert title="Default Size" />
        </GridItem>
        <GridItem size={1}>
          <Alert title="Size 1" />
        </GridItem>
        <GridItem size={2}>
          <Alert title="Size 2" />
        </GridItem>
        <GridItem size={3}>
          <Alert title="Size 3" />
        </GridItem>
        <GridItem size={4}>
          <Alert title="Size 4" />
        </GridItem>
        <GridItem size={5}>
          <Alert title="Size 5" />
        </GridItem>
        <GridItem size={6}>
          <Alert title="Size 6" />
        </GridItem>
        <GridItem size={7}>
          <Alert title="Size 7" />
        </GridItem>
        <GridItem size={8}>
          <Alert title="Size 8" />
        </GridItem>
        <GridItem size={9}>
          <Alert title="Size 9" />
        </GridItem>
        <GridItem size={10}>
          <Alert title="Size 10" />
        </GridItem>
        <GridItem size={11}>
          <Alert title="Size 11" />
        </GridItem>
        <GridItem size={12}>
          <Alert title="Size 12" />
        </GridItem>
      </Grid>
    );
  },
};

export const ResponsiveGaps: Story = {
  args: {
    gap: { xs: 'extraSmall', sm: 'small', md: 'medium', lg: 'large', xl: 'extraLarge' },
  },
  render: (args) => {
    return (
      <Grid size={3} {...args}>
        <GridItem>
          <Alert text="Size 3" />
        </GridItem>
        <GridItem>
          <Alert text="Size 3" />
        </GridItem>
        <GridItem>
          <Alert text="Size 3" />
        </GridItem>
        <GridItem>
          <Alert text="Size 3" />
        </GridItem>
        <GridItem>
          <Alert text="Size 3" />
        </GridItem>
        <GridItem>
          <Alert text="Size 3" />
        </GridItem>
        <GridItem>
          <Alert text="Size 3" />
        </GridItem>
        <GridItem>
          <Alert text="Size 3" />
        </GridItem>
        <GridItem>
          <Alert text="Size 3" />
        </GridItem>
      </Grid>
    );
  },
};

export const ResponsiveGridItemSize: Story = {
  render: (args) => {
    return (
      <Grid {...args}>
        <GridItem size={4}>
          <Alert title="Size 4" />
        </GridItem>
        <GridItem size={{ sm: 6, lg: 'default', xl: 12 }}>
          <Alert title="Object-Breakpoints" text="xs: unset, sm: 6, md: unset, lg: 'default', xl: 12" />
        </GridItem>
      </Grid>
    );
  },
};

export const ResponsiveGridItemVisibility: Story = {
  render: (args) => {
    return (
      <Grid {...args}>
        <GridItem size={4}>
          <Alert title="Size 4" />
        </GridItem>
        <GridItem visible={['xs', 'md', 'lg']}>
          <Alert title="Breakpoint-Array" text="xs - md - lg" />
        </GridItem>
        <GridItem visible={['lg', 'xl']}>
          <Alert title="Breakpoint-Array" text="lg - xl" />
        </GridItem>
        <GridItem visible="<=lg">
          <Alert title="Range Breakpoint" text="<=lg" />
        </GridItem>
        <GridItem visible="lg">
          <Alert title="Single Breakpoint" text="lg" />
        </GridItem>
        <GridItem visible=">=lg">
          <Alert title="Range Breakpoint" text=">=lg" />
        </GridItem>
      </Grid>
    );
  },
};

export const ResponsiveGridItemOffset: Story = {
  render: (args) => {
    return (
      <Grid {...args}>
        <GridItem size={3} offset={3}>
          <Alert title="Size 3 - Offset 3" />
        </GridItem>
        <GridItem size={3}>
          <Alert title="Size 3" />
        </GridItem>
        <GridItem size={3} offset={9}>
          <Alert title="Size 3 - Offset 9" />
        </GridItem>
        <GridItem size={12}>
          <Alert title="Size 12" />
        </GridItem>
        <GridItem size={12} offset={0}>
          <Alert title="Size 11 - Offset 0" />
        </GridItem>
        <GridItem size={3}>
          <Alert title="Size 3" />
        </GridItem>
        <GridItem size={3} offset={{ xs: 1, sm: 3, md: 0, lg: 9 }}>
          <Alert title="Size 3 - Offset Responsive xs: 1, sm: 3, md: 0, lg: 9" />
        </GridItem>
      </Grid>
    );
  },
};
