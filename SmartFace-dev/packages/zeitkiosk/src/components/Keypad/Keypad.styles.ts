import styled from '@emotion/styled';

const Container = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  gap: '0.625rem',
  fontSize: '2rem',
});

export const S = {
  Container,
} as const;
