import styled from '@emotion/styled';

const Card = styled.div(({ theme }) => ({
  borderRadius: theme.marko.variables.borderRadius.small,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: '1rem',
}));

export const S = {
  Card,
} as const;
