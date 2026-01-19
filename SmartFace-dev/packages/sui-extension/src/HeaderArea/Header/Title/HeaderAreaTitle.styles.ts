import styled from '@emotion/styled';
import { Title } from '@hrworks/sui-core/Title/Title';

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  alignContent: 'center',
  flexWrap: 'wrap',
  columnGap: theme.marko.variables.spacing.distance.medium,
}));

const Subtitle = styled(Title)(({ theme }) => ({
  opacity: theme.marko.variables.opacity.medium,
  fontWeight: theme.marko.typography.fontWeights.text,
}));

export const S = {
  Container,
  Subtitle,
} as const;
