import styled from '@emotion/styled';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const Line = styled.hr(({ theme }) => ({
  height: 1,
  border: 'none',
  width: '100%',
  backgroundColor: theme.sqwTier2Color.border.bold,
}));

const TextWrapper = styled.div(({ theme }) => ({
  ...theme.sqwTier2Typography.bodySm,
  padding: `0 ${theme.marko.variables.spacing.distance.medium}px`,
  color: theme.sqwTier2Color.text.subtlest,
  whiteSpace: 'nowrap',
  textTransform: 'uppercase',
}));

export const S = {
  Container,
  Line,
  TextWrapper,
} as const;
