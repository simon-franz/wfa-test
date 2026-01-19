import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

const Entry = styled.button<{
  isActive: boolean;
}>(({ theme, isActive }) => ({
  display: 'block',
  color: theme.sqwTier2Color.text.default,
  fontSize: theme.sqwTier2Typography.bodyMd.fontSize,
  textAlign: 'left',
  padding: '0.5em',
  border: 0,
  borderRadius: 6,
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transition: `all ${theme.marko.variables.animationDuration.normal} `,
  [mq.supportsHover]: {
    ':hover': {
      backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.hovered,
    },
  },
  ':active': {
    backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.selected,
  },
  ...(isActive && {
    '&&': { backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.selected },
  }),
}));

export const S = {
  Entry,
} as const;
