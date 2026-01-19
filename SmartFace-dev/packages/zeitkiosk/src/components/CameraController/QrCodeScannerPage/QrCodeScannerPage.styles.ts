import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

import { Title as _Title } from '../../Typography/Title';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  gap: '2.1875rem',
  [mq.isSmallDevice]: {
    gap: '1rem',
  },
});

const Title = styled(_Title)(({ theme }) => ({
  ...theme.sqwTier2Typography.headingMd,
  color: theme.sqwTier2Color.text.default,
}));

export const S = {
  Container,
  Title,
} as const;
