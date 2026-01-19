import styled from '@emotion/styled';
import Grid from '@hrworks/sui-core/Grid';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 48,
});

const FormFieldContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.marko.variables.spacing.distance.large,
}));

const ButtonWrapper = styled.div(({ theme }) => ({
  marginTop: theme.marko.variables.spacing.distance.large,
  display: 'flex',
  justifyContent: 'flex-end',
}));

export const S = {
  Container,
  FormFieldContainer,
  ButtonWrapper,
} as const;
