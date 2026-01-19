import styled from '@emotion/styled';
import { mq, shouldForwardProp } from '@hrworks/design-system';
import Button from '@hrworks/sui-core/Button';

const NavigationButton = styled(Button, {
  shouldForwardProp,
})<{
  $active: boolean;
}>(({ theme, $active }) => ({
  fontSize: theme.sqwTier2Typography.headingMdSemibold.fontSize,
  whiteSpace: 'nowrap',
  color: theme.sqwTier2Color.text.subtle,
  padding: '0.275em 1.2em',
  justifyContent: 'center',
  borderRadius: theme.marko.variables.borderRadius.small,
  [mq.supportsHover]: {
    ':hover': {
      backgroundColor: theme.sqwTier2Color.background.nav.hovered,
    },
  },
  ':active': {
    backgroundColor: theme.sqwTier2Color.background.nav.selected,
  },
  ...($active && {
    backgroundColor: theme.sqwTier2Color.background.nav.selected,
    fontWeight: theme.sqwTier2Typography.headingMdSemibold.fontWeight,
  }),
  [mq['<=lg']]: {
    minWidth: 160,
  },
}));

export const S = {
  NavigationButton,
} as const;
