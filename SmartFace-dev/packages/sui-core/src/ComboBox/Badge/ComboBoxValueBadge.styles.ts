import styled from '@emotion/styled';
import { mq, overflowEllipsis, shouldForwardProp } from '@hrworks/design-system';

import _Badge from '../../Badge';
import _Button from '../../Button';

const Badge = styled(_Badge, {
  shouldForwardProp,
})<{
  $focused?: boolean;
}>(({ theme, $focused }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.marko.variables.spacing.distance.extraSmall,
  [mq.conditionalTransition]: {
    transition: `all ${theme.marko.variables.animationDuration.normal}`,
  },
  ...($focused && {
    backgroundColor: theme.sqwTier2Color.background.neutral.subtle.selected,
  }),
}));

const TextWrapper = styled.div(overflowEllipsis);

const IconWrapper = styled(_Button)<{
  disabled: boolean;
}>(({ theme, disabled }) => ({
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: disabled ? 'not-allowed' : 'pointer',
  width: '1.25em',
  height: '1.25em',
  fontSize: '0.875em',
  borderRadius: '100%',
  overflow: 'hidden',
  padding: 0,
  [mq.supportsHover]: {
    ':hover': {
      backgroundColor: theme.sqwTier2Color.background.neutral.subtle.hovered,
    },
  },
  ':active': {
    backgroundColor: theme.sqwTier2Color.background.neutral.subtle.selected,
  },
}));

export const S = {
  Badge,
  TextWrapper,
  IconWrapper,
} as const;
