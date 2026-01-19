import styled from '@emotion/styled';
import IconButton from '@hrworks/sui-core/IconButton';
import { Document } from 'react-pdf';

const PdfViewerWrapper = styled.div<{
  fullHeight?: boolean;
}>(({ fullHeight, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.sqwTier2Color.surface.structure,
  height: fullHeight ? '100%' : 500,
}));

const ToolBar = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  backgroundColor: theme.sqwTier2Color.background.neutral.subtle.default,
  padding: theme.marko.variables.spacing.distance.extraSmall,
  height: 65,
}));

const DownloadButton = styled(IconButton)(({ theme }) => ({
  margin: theme.marko.variables.spacing.distance.large,
}));

const PageCount = styled.div(({ theme }) => ({
  color: theme.sqwTier2Color.text.subtlest,
}));

const OuterDiv = styled.div({
  display: 'flex',
  justifyContent: 'center',
  overflowY: 'auto',
  position: 'relative',
  flex: 1,
});

const StyledDocument = styled(Document)({
  position: 'absolute',
});

const Page = styled.div(({ theme }) => ({
  margin: `${theme.marko.variables.spacing.distance.large}px 0`,
}));

export const S = {
  PdfViewerWrapper,
  ToolBar,
  DownloadButton,
  PageCount,
  OuterDiv,
  StyledDocument,
  Page,
} as const;
