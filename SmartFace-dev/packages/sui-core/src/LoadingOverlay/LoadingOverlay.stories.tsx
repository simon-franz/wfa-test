import { generateLoremSentences } from '@hrworks/sui-shared/functions/stringGenerator';
import type { Meta, StoryObj } from '@storybook/react';

import Button from '../Button';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '../Card';
import Text from '../Text';
import { LoadingOverlay } from './LoadingOverlay';

const meta = {
  title: 'Components/Feedback/LoadingOverlay',
  component: LoadingOverlay,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof LoadingOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: true,
    children: (
      <Card>
        <CardHeader>
          <CardTitle subtitle="This Card needs a looooong time to load">Loading Card</CardTitle>
        </CardHeader>
        <CardBody>
          <Text>{generateLoremSentences(8)}</Text>
        </CardBody>
        <CardFooter>
          <Button color="success">Is this really loading?</Button>
        </CardFooter>
      </Card>
    ),
  },
};
