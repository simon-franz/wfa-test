import styled from '@emotion/styled';
import _PanelGroup from '@hrworks/sui-extension/PanelGroup';

const PanelGroup = styled(_PanelGroup)({
  height: '100%',
  overflow: 'hidden',
});

const ContentContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  gap: theme.marko.variables.spacing.distance.extraLarge,
  height: '100%',
}));

const Title = styled.h1(({ theme }) => ({
  color: theme.sqwTier2Color.text.subtle,
}));

const PaddedWrapper = styled.div(({ theme }) => ({
  height: '100%',
  padding: theme.marko.variables.spacing.distance.extraLarge,
}));

const IsolatedWrapper = styled.div({
  transform: 'translateZ(0)',
});

const EditorWrapper = styled.div(({ theme }) => ({
  padding: theme.marko.variables.spacing.distance.extraLarge,
  '& .jer-collection-text-area, .jer-input-text': {
    backgroundColor: 'white',
  },
}));

export const S = {
  PanelGroup,
  ContentContainer,
  Title,
  PaddedWrapper,
  IsolatedWrapper,
  EditorWrapper,
} as const;
