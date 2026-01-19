import styled from '@emotion/styled';

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: theme.sqwTier2Color.surface.sunken,
}));

export const S = {
  Container,
} as const;
