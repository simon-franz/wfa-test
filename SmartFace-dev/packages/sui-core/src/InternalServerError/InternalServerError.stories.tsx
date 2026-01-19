import type { Meta, StoryObj } from '@storybook/react';

import { InternalServerError } from './InternalServerError';
import type { InternalServerErrorProps } from './InternalServerError.types';

const meta: Meta<typeof InternalServerError> = {
  title: 'Components/Feedback/InternalServerError',
  component: InternalServerError,
};

export default meta;
type Story = StoryObj<typeof InternalServerError>;

const INTERNAL_SERVER_ERROR_PROPS: InternalServerErrorProps = {
  title: 'Error Title',
  message: 'Something happened',
  close: () => console.log('closed'),
};

export const Default: Story = {
  args: INTERNAL_SERVER_ERROR_PROPS,
};
