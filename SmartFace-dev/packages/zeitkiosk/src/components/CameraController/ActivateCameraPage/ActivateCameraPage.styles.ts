import styled from '@emotion/styled';

import { Title as _Title } from '../../Typography/Title';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1.5625rem',
  paddingTop: '15.625rem',
});

const Title = styled(_Title)(({ theme }) => ({
  ...theme.sqwTier2Typography.headingLg,
  color: theme.sqwTier2Color.text.default,
}));

export const S = { Container, Title } as const;
