import styled from '@emotion/styled';
import Flexbox from '@hrworks/sui-core/Flexbox';
import Text from '@hrworks/sui-core/Text';
import Title from '@hrworks/sui-core/Title';

const Container = styled(Flexbox)({
  padding: '40px 20px',
  maxWidth: 600,
  margin: '0 auto',
});

const HeaderSection = styled.div({
  textAlign: 'center',
  width: '100%',
});

const ButtonSection = styled.div({
  width: '100%',
  maxWidth: 400,
});

const SectionTitle = styled(Title)({
  textAlign: 'center',
  marginTop: 32,
  marginBottom: 16,
});

const InstructionsContainer = styled.div(({ theme }) => ({
  padding: theme.marko.variables.spacing.distance.large,
  backgroundColor: theme.sqwTier2Color.background.neutral.subtle.default,
  border: `1px solid ${theme.sqwTier2Color.border.subtle}`,
  width: '100%',
}));

const InstructionItem = styled(Text)({
  marginBottom: 8,
  '&:last-child': {
    marginBottom: 0,
  },
});

const NoteText = styled(Text)({
  marginTop: 16,
});

export const S = {
  Container,
  HeaderSection,
  ButtonSection,
  SectionTitle,
  InstructionsContainer,
  InstructionItem,
  NoteText,
} as const;
