import styled from '@emotion/styled';

import type { StackProps } from './Stack.types';

const Stack = styled.div<StackProps>(({ direction = 'horizontal' }) => ({
  display: 'flex',
  gap: '2.2rem',
  ...(direction === 'horizontal' && {
    alignItems: 'center',
  }),
  ...(direction === 'vertical' && {
    flexDirection: 'column',
  }),
}));

export const S = {
  Stack,
} as const;
