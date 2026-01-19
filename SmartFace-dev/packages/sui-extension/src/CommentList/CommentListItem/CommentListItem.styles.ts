import styled from '@emotion/styled';
import { overflowBreakWord } from '@hrworks/design-system/stylePresets';

const CommentListItem = styled.li(({ theme }) => ({
  backgroundColor: theme.sqwTier2Color.surface.structure,
  borderRadius: theme.marko.variables.borderRadius.extraLarge,
  padding: 0,
}));

const CommentHeader = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  columnGap: theme.marko.variables.spacing.formGap.medium,
  paddingTop: theme.marko.variables.spacing.distance.small,
  paddingRight: theme.marko.variables.spacing.distance.medium,
  paddingBottom: theme.marko.variables.spacing.distance.extraSmall,
  paddingLeft: theme.marko.variables.spacing.distance.medium,
}));

const Signature = styled.div(({ theme }) => [
  overflowBreakWord,
  {
    ...theme.sqwTier2Typography.labelMd,
  },
]);

const TimeStamp = styled.div(({ theme }) => [
  overflowBreakWord,
  {
    ...theme.sqwTier2Typography.bodySm,
    opacity: theme.marko.variables.opacity.high,
  },
]);

const Toolbar = styled.div(({ theme }) => ({
  ...theme.sqwTier2Typography.labelMd,
  display: 'flex',
  gap: theme.marko.variables.spacing.formGap.medium,
  flexDirection: 'row',
  flexShrink: 0,
  maxWidth: '50%',
  alignItems: 'flex-start',
  justifyContent: 'right',
}));

const ToolbarChildren = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
});

const PreventBadgeBreak = styled.div({
  display: 'inline-block',
  lineHeight: 0,
  flexShrink: 0,
});

const CommentField = styled.div(({ theme }) => [
  overflowBreakWord,
  {
    padding: `${theme.marko.variables.spacing.distance.small}px ${theme.marko.variables.spacing.distance.medium}px`,
    textAlign: 'justify',
  },
]);

export const S = {
  CommentListItem,
  CommentHeader,
  Signature,
  TimeStamp,
  Toolbar,
  ToolbarChildren,
  PreventBadgeBreak,
  CommentField,
} as const;
