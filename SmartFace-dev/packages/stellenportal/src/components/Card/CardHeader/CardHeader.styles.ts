import styled from '@emotion/styled';

const Container = styled.div(({ theme }) => ({
  marginBottom: theme.marko.variables.spacing.distance.medium,
}));

export const S = {
  Container,
} as const;
