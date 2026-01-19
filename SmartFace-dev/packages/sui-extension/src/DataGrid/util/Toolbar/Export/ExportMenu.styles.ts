import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

const Menu = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Entry = styled.button(({ theme }) => ({
  display: 'block',
  color: theme.sqwTier2Color.text.default,
  cursor: 'pointer',
  textAlign: 'left',
  padding: '0.5em',
  border: 0,
  borderRadius: 6,
  backgroundColor: 'transparent',
  transition: `all ${theme.marko.variables.animationDuration.normal}`,
  fontSize: theme.sqwTier2Typography.bodyMd.fontSize,
  [mq.supportsHover]: {
    ':hover': {
      backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.hovered,
    },
  },
  ':active': {
    backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.selected,
  },
}));

export const S = {
  Menu,
  Entry,
} as const;
