import styled from '@emotion/styled';
import { overflowBreakWord, shouldForwardProp } from '@hrworks/design-system';

import Button from '../../../Button';

type EntryProps = {
  sublistOpen: boolean;
  focus: boolean;
  submenu: boolean;
};

const Entry = styled.div<EntryProps>(({ theme, sublistOpen, focus, submenu }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  borderRadius: theme.marko.variables.borderRadius.small,
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
}>(({ theme, href, $hasOnClick }) => [
  overflowBreakWord,
  {
    width: '100%',
    padding: `${theme.marko.variables.spacing.distance.extraSmall}px ${theme.marko.variables.spacing.distance.small}px`,
    textAlign: 'start',
    ...(href == undefined &&
      !$hasOnClick && {
        cursor: 'default',
      }),
  },
]);

const IconContainer = styled.span(({ theme }) => ({
  display: 'flex',
  pointerEvents: 'none',
  position: 'absolute',
  right: theme.marko.variables.spacing.distance.small,
}));

export const S = {
  Entry,
  EntryButton,
  IconContainer,
} as const;
