import styled from '@emotion/styled';

const Wrapper = styled.div(({ theme }) => ({
  background: theme.sqwTier2Color.surface.sunken,
  padding: theme.marko.variables.spacing.distance.extraLarge,
}));

export const S = {
  Wrapper,
} as const;
