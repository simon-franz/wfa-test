import styled from '@emotion/styled';

const Container = styled.div({
  padding: 32,
});

const ColumnLayout = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.marko.variables.spacing.distance.large,
}));

export const S = {
  Container,
  ColumnLayout,
} as const;
