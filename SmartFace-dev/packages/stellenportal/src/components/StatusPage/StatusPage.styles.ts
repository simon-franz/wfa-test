import styled from '@emotion/styled';

const Container = styled.div({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Content = styled.div(({ theme }) => ({
  maxWidth: 'min(90%, 870px)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.marko.variables.spacing.distance.medium,
}));

const typoBaseStyle = {
  margin: 0,
  padding: 0,
};

const Title = styled.h1(({ theme }) => [
  typoBaseStyle,
  {
    ...theme.sqwTier2Typography.display,
  },
]);

const SubTitle = styled.div(({ theme }) => [
  typoBaseStyle,
  {
    ...theme.sqwTier2Typography.headingMdSemibold,
  },
]);

const ButtonWrapper = styled.div(({ theme }) => ({
  marginTop: theme.marko.variables.spacing.distance.medium,
}));

export const S = {
  Container,
  Content,
  Title,
  SubTitle,
  ButtonWrapper,
} as const;
