import type { Meta } from '@storybook/react';
import type { ReactNode } from 'react';

import { ConditionalWrapper } from './ConditionalWrapper';

export default {
  title: 'Components/Utils/ConditionalWrapper',
  component: ConditionalWrapper,
} as Meta<typeof ConditionalWrapper>;

export const Default = {
  args: {
    condition: true,
    wrapper: (children: ReactNode) => (
      <div style={{ display: 'inline-block', alignSelf: 'flex-start', backgroundColor: 'red', padding: '50px' }}>
        {children}
      </div>
    ),
    children: <div style={{ display: 'inline-block', height: '200px', width: '300px', backgroundColor: 'green' }} />,
  },
};
