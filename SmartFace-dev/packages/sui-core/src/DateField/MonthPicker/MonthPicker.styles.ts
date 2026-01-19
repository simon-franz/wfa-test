import styled from '@emotion/styled';

const Picker = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.marko.variables.spacing.distance.extraSmall,
  flex: 1,
}));

export const S = {
  Picker,
} as const;
