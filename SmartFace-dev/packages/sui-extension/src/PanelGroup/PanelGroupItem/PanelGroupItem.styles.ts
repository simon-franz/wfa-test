import styled from '@emotion/styled';
import { mq, shouldForwardProp } from '@hrworks/design-system';
import { Scroller as _Scroller } from '@hrworks/sui-core/Scroller';
import { Panel } from 'react-resizable-panels';

const StyledPanel = styled(Panel, {
  shouldForwardProp,
})<{
  $enableAnimation?: boolean;
}>(({ theme, $enableAnimation }) => ({
  ...($enableAnimation && {
    [mq.conditionalTransition]: {
      transition: `flex-grow ${theme.marko.variables.animationDuration.long}`,
    },
  }),
}));

const Scroller = styled(_Scroller, {
  shouldForwardProp,
})<{
  $isBelowThreshold: boolean;
}>(({ theme, $isBelowThreshold }) => ({
  padding: theme.marko.variables.spacing.distance.extraSmall,
  ...($isBelowThreshold && {
    opacity: theme.marko.variables.opacity.medium,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }),
}));

export const S = {
  StyledPanel,
  Scroller,
} as const;
