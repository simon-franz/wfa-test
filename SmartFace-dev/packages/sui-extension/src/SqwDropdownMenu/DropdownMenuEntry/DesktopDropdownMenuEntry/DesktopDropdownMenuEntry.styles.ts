import styled from '@emotion/styled';
import { shouldForwardProp } from '@hrworks/design-system/emotionUtils';
import Button from '@hrworks/sui-core/Button';

type EntryProps = {
  sublistOpen: boolean;
  focus: boolean;
  submenu: boolean;
};

const Entry = styled.div<EntryProps>(({ theme, sublistOpen, focus, submenu }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  borderRadius: 6,
  ...(submenu && {
    paddingRight: 38,
  }),
  ...(focus && {
    backgroundColor: theme.sqwTier2Color.background.brand.subtle.hovered,
  }),
  ...(sublistOpen && {
    backgroundColor: theme.sqwTier2Color.background.brand.subtle.pressed,
  }),
}));

const EntryButton = styled(Button, {
  shouldForwardProp,
})<{
  $hasOnClick: boolean;
}>(({ theme, href, $hasOnClick }) => ({
  ...theme.sqwTier2Typography.bodyMd,
  width: '100%',
  color: theme.sqwTier2Color.text.default,
  padding: `${theme.marko.variables.spacing.distance.extraSmall}px ${theme.marko.variables.spacing.distance.small}px`,
  textAlign: 'start',
  justifyContent: 'space-between',
  ...(href == undefined &&
    !$hasOnClick && {
      cursor: 'default',
    }),
}));

const LeftContent = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.marko.variables.spacing.distance.small,
}));

const IconContainer = styled.span(({ theme }) => ({
  display: 'flex',
  pointerEvents: 'none',
  position: 'absolute',
  right: theme.marko.variables.spacing.distance.small,
}));

export const S = {
  Entry,
  EntryButton,
  LeftContent,
  IconContainer,
} as const;
