import styled from '@emotion/styled';
import Button from '@hrworks/sui-core/Button';
import _Section, { S as SectionStyles } from '@hrworks/sui-core/Section';
import _TextField from '@hrworks/sui-core/TextField';

const Container = styled.div(({ theme }) => ({
  backgroundColor: theme.stellenportal?.style?.backgroundColor || theme.sqwTier2Color.surface.sunken,
  border: `1px solid ${theme.sqwTier2Color.border.bold}`,
  borderRadius: theme.marko.variables.borderRadius.small,
  padding: theme.marko.variables.spacing.distance.extraLarge,
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.marko.variables.spacing.distance.extraLarge,
  width: '90%',
  margin: '20px auto',
  zIndex: 1,
}));

const InputContainer = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  gap: theme.marko.variables.spacing.distance.large,
  width: 'min(510px, 100%)',
  margin: 'auto',
}));

const TextField = styled(_TextField)({
  flex: 1,
});

const Section = styled(_Section)({
  [`${SectionStyles.SectionToggle}`]: {
    ':hover': {
      backgroundColor: 'unset',
    },
  },
});

const SectionContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const ResetButton = styled(Button)({
  alignSelf: 'flex-end',
});

export const S = {
  Container,
  InputContainer,
  TextField,
  Section,
  SectionContainer,
  ResetButton,
} as const;
