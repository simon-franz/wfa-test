import styled from '@emotion/styled';
import { mq, overflowEllipsis, shouldForwardProp } from '@hrworks/design-system';

import Button from '../../Button';

const componentConfig = {
  itemPadding: '3px 8px',
  itemMargin: '0 -8px',
  interactWidth: 20,
  interactHeight: 20,
};

const Table = styled.div(({ theme }) => ({
  fontSize: theme.sqwTier2Typography.labelMd.fontSize,
}));

const Item = styled.div<{
  disabled?: boolean;
}>(({ theme, disabled }) => ({
  display: 'flex',
  transition: `all ${theme.marko.variables.animationDuration.normal} ease`,
  borderRadius: 6,
  padding: componentConfig.itemPadding,
  margin: componentConfig.itemMargin,
  gap: theme.marko.variables.spacing.distance.small,
  alignItems: 'center',
  [mq.supportsHover]: {
    ':hover:not(:disabled)': {
      backgroundColor: theme.sqwTier2Color.background.brand.subtle.hovered,
    },
  },
  ...(disabled && {
    opacity: 1,
    cursor: 'not-allowed',
  }),
}));

const DisplayNameWithURL = styled.a(({ theme }) => [
  {
    flexGrow: 1,
    color: theme.sqwTier2Color.text.default,
    textDecoration: 'none',
    [mq.supportsHover]: {
      ':hover': {
        color: theme.sqwTier2Color.text.default,
        textDecoration: 'underline',
      },
    },
    ':focus-visible': {
      textDecoration: 'underline',
      outlineOffset: 3,
      borderRadius: 6,
      outlineColor: theme.sqwTier2Color.border.focus,
    },
  },
  overflowEllipsis,
]);

const DisplayNameDiv = styled.div(({ theme }) => [
  {
    flexGrow: 1,
    [mq.supportsHover]: {
      ':hover': {
        color: theme.sqwTier2Color.text.default,
      },
    },
  },
  overflowEllipsis,
]);

const FormatBytes = styled.div(({ theme }) => ({
  whiteSpace: 'nowrap',
  color: theme.sqwTier2Color.text.subtlest,
  textAlign: 'end',
  verticalAlign: 'middle',
  flexShrink: 0,
}));

const Interact = styled.div({
  display: 'flex',
  width: componentConfig.interactWidth,
  height: componentConfig.interactHeight,
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
});

const DeleteButton = styled(Button, {
  shouldForwardProp,
})<{
  disabled?: boolean;
}>(({ theme, disabled }) => ({
  padding: 0,
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  justifyContent: 'center',
  color: theme.sqwTier2Color.icon.brand.default,
  [mq.supportsHover]: {
    ':hover:not(:disabled)': {
      color: theme.sqwTier2Color.icon.brand.hovered,
    },
  },
  ':active:not(:disabled)': {
    color: theme.sqwTier2Color.icon.brand.pressed,
  },
  ...(disabled && {
    opacity: 1,
    cursor: 'not-allowed',
    color: theme.sqwTier2Color.icon.disabled,
  }),
}));

export const S = {
  Table,
  Item,
  DisplayNameWithURL,
  DisplayNameDiv,
  FormatBytes,
  Interact,
  DeleteButton,
} as const;
