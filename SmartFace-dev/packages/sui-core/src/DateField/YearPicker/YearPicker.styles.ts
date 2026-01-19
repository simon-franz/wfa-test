import styled from '@emotion/styled';

const Picker = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.marko.variables.spacing.distance.extraSmall,
}));

export const S = {
  Picker,
} as const;
