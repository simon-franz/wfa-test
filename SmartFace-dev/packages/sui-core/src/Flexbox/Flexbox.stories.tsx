import { gaps, justifyContents } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import Alert from '../Alert';
import Button from '../Button';
import { Card, CardHeader, CardTitle } from '../Card';
import FlexboxItem from '../FlexboxItem';
import type { FlexboxItemProps } from '../FlexboxItem/FlexboxItem.types';
import { Flexbox } from './Flexbox';

const meta: Meta<typeof Flexbox> = {
  title: 'Components/Layout/Flexbox',
  component: Flexbox,
  subcomponents: { FlexboxItem },
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'A flexible and responsive layout component built on CSS Flexbox.',
      description: {
        component:
          'The Flexbox component provides a modern, flexible way to create responsive layouts using CSS Flexbox properties. It offers full control over flex container behavior including direction, alignment, wrapping and spacing.',
      },
    },
  },
  argTypes: {
    fullHeight: { description: 'Please set to true to manipulate (most) Flexbox-properties via controls' },
    flexDirection: { control: 'radio', options: ['row', 'row-reverse', 'column', 'column-reverse'] },
    flexWrap: {
      control: 'radio',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      table: { defaultValue: { summary: 'wrap' } },
    },
    justifyContent: { control: 'select', options: justifyContents },
    alignItems: { control: 'radio', options: ['normal', 'stretch'] },
    alignContent: { control: 'radio', options: ['start', 'center', 'end'] },
    gap: { control: 'select', options: gaps, table: { defaultValue: { summary: 'default' } } },
    columnGap: { control: 'select', options: gaps },
    rowGap: { control: 'select', options: gaps },
  },
};

export default meta;

type Story = StoryObj<typeof Flexbox>;

export const Default: Story = {
  render: (args) => (
    <Flexbox {...args}>
      <FlexboxItem>
        <Button>Button 1</Button>
      </FlexboxItem>
      <FlexboxItem>
        <Button>Button 2</Button>
      </FlexboxItem>
      <FlexboxItem>
        <Button>Button 3</Button>
      </FlexboxItem>
      <FlexboxItem>
        <Button>Button 4</Button>
      </FlexboxItem>
      <FlexboxItem>
        <Button>Button 5</Button>
      </FlexboxItem>
      <FlexboxItem>
        <Button>Button 6</Button>
      </FlexboxItem>
      <FlexboxItem>
        <Button>Button 7</Button>
      </FlexboxItem>
      <FlexboxItem>
        <Button>Button 8</Button>
      </FlexboxItem>
      <FlexboxItem>
        <Button>Button 9</Button>
      </FlexboxItem>
    </Flexbox>
  ),
};

export const FlexboxItemAlignSelfOrder: Story = {
  render: (args: FlexboxItemProps) => {
    return (
      <Flexbox {...args}>
        <FlexboxItem alignSelf="flex-start" order={3}>
          <Button>flex-start order 3</Button>
        </FlexboxItem>
        <FlexboxItem alignSelf="center" order={2}>
          <Button>center order 2</Button>
        </FlexboxItem>
        <FlexboxItem alignSelf="flex-end" order={1}>
          <Button>flex-end order 1</Button>
        </FlexboxItem>
      </Flexbox>
    );
  },
};

export const ResponsiveLayout: Story = {
  render: (args) => {
    return (
      <Flexbox
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={{ xs: 'small', md: 'medium', lg: 'large' }}
        alignItems={{ xs: 'stretch', md: 'start' }}
        {...args}
      >
        <FlexboxItem
          flexGrow={{ xs: 0, sm: 0, md: 0, lg: 1 }}
          flexBasis={{ xs: 'auto', sm: 'auto', md: '150px', lg: '200px' }}
          flexShrink={{ xs: 0, sm: 0, md: 0, lg: 1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Panel</CardTitle>
            </CardHeader>
            <div style={{ padding: '1rem' }}>
              <Flexbox
                flexDirection={{ xs: 'row', md: 'column' }}
                gap="small"
                justifyContent={{ xs: 'space-around', md: 'start' }}
              >
                <Button size="small">Lorem Ipsum</Button>
                <Button size="small">Lorem Ipsum</Button>
                <FlexboxItem visible=">=lg">
                  <Button size="small">Lorem Ipsum</Button>
                </FlexboxItem>
              </Flexbox>
            </div>
          </Card>
        </FlexboxItem>
        <FlexboxItem
          visible={['md', 'lg', 'xl']}
          flexGrow={{ md: 1, lg: 1 }}
          flexBasis={{ md: '30%', lg: '25%' }}
          flexShrink={{ md: 2, lg: 1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Sidebar Content</CardTitle>
            </CardHeader>
            <Flexbox style={{ padding: '1rem' }}>
              <FlexboxItem>
                <Alert title="Info" text="This sidebar is hidden on mobile, but visible on larger screens." />
              </FlexboxItem>
            </Flexbox>
          </Card>
        </FlexboxItem>
        <FlexboxItem visible={['lg', 'xl']} flexBasis="100%" alignSelf="stretch">
          <Alert
            title="Additional Content"
            text="This additional content only appears on large screens and takes full width."
          />
        </FlexboxItem>
      </Flexbox>
    );
  },
};
