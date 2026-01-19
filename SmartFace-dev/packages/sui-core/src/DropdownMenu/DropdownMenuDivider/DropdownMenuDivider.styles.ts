import styled from '@emotion/styled';

const Divider = styled.hr(({ theme }) => ({
  margin: `${theme.marko.variables.spacing.distance.extraSmall}px 0 `,
  borderColor: theme.sqwTier2Color.border.bold,
  borderStyle: 'solid',
  borderBottom: 0,
}));

export const S = {
  Divider,
} as const;
