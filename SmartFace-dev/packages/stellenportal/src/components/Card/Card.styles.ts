import styled from '@emotion/styled';

const Container = styled.div(({ theme }) => ({
  padding: `${theme.marko.variables.spacing.distance.large}px ${theme.marko.variables.spacing.distance.extraLarge}px`,
  borderRadius: theme.marko.variables.borderRadius.small,
  border: `solid 1px ${theme.sqwTier2Color.border.bold}`,
  backgroundColor: theme.stellenportal?.cardStyle?.color || theme.sqwTier2Color.surface.structure,
}));

export const S = {
  Container,
} as const;
