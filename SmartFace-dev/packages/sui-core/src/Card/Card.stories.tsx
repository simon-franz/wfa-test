import Stack from '@hrworks/sui-shared/components/Stack';
import type { Meta, StoryObj } from '@storybook/react';

import Button from '../Button';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '../Card';
import FontAwesomeIcon from '../FontAwesomeIcon';

const meta: Meta<typeof Card> = {
  title: 'Components/Data Display/Card',
  component: Card,
  subcomponents: { CardBody, CardFooter, CardHeader, CardTitle },
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Flexible Content Container',
      description: {
        component:
          'Cards are flexible containers that display content in a structured format with optional headers, bodies, and footers. They provide a clean way to group related information and actions.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card-Header with Card-Title</CardTitle>
      </CardHeader>
      <CardBody>Card-Body</CardBody>
      <CardFooter>Card-Footer</CardFooter>
    </Card>
  ),
};

export const CardHeaderWithIconAndSubtitle: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle subtitle="Subtitle" icon={<FontAwesomeIcon name="lock" />}>
          Card-Title with Icon
        </CardTitle>
      </CardHeader>
    </Card>
  ),
};
export const CardBodyWithChildren: Story = {
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <Button color="success">Success</Button>
      </CardBody>
    </Card>
  ),
};

export const CardHeaderWithWrapChildren: Story = {
  render: (args) => (
    <Stack>
      <Card {...args}>
        <CardHeader wrapChildren={true}>
          <CardTitle>With "wrapChildren: true"</CardTitle>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Very Long Button Text</Button>
        </CardHeader>
      </Card>
      <Card {...args}>
        <CardHeader wrapChildren={false}>
          <CardTitle>With "wrapChildren: false"</CardTitle>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Very Long Button Text</Button>
        </CardHeader>
      </Card>
    </Stack>
  ),
};
