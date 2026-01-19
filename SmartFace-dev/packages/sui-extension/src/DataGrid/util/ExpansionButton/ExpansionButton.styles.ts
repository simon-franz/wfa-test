import styled from '@emotion/styled';
import { mq, withOpacity } from '@hrworks/design-system';

const Expander = styled.button<{
  isExpanded?: boolean;
}>(({ theme, isExpanded }) => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 0,
  borderRadius: '50%',
  height: '1.25em',
  width: '1.25em',
  padding: 4,
  backgroundColor: 'transparent',
  transition: `transform ${theme.marko.variables.animationDuration.long}, background-color ${theme.marko.variables.animationDuration.normal}`,
  [mq.supportsHover]: {
    ':hover': {
      backgroundColor: withOpacity(theme.sqwTier2Color.background.brand.subtle.pressed, '50%'),
    },
  },
  ':active': {
    backgroundColor: theme.sqwTier2Color.background.brand.subtle.pressed,
  },
  ...(isExpanded && {
    transform: 'rotate(90deg)',
  }),
}));

export const S = {
  Expander,
} as const;
