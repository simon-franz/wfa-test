import styled from '@emotion/styled';
import { mq, shouldForwardProp } from '@hrworks/design-system';
import IconButton from '@hrworks/sui-core/IconButton';

const Toolbar = styled.div({
  position: 'absolute',
  zIndex: 2,
  bottom: -30,
  [mq.print]: {
    display: 'none',
  },
});

const ExpandButton = styled(IconButton, {
  shouldForwardProp,
})<{
  $shouldRotate: boolean;
}>(({ theme, $shouldRotate }) => ({
  backgroundColor: theme.sqwTier2Color.surface.sunken,
  color: theme.sqwTier2Color.icon.subtle,
  ...($shouldRotate && {
    transform: 'rotate(180deg)',
  }),
}));

export const S = {
  Toolbar,
  ExpandButton,
} as const;
