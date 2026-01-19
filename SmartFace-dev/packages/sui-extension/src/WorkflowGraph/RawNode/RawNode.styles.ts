import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { withOpacity } from '@hrworks/design-system';
import { shouldForwardProp } from '@hrworks/design-system/emotionUtils';
import { Scroller as _Scroller } from '@hrworks/sui-core/Scroller';
import { Handle as ReactFlowHandle } from '@xyflow/react';

import { getWorkflowGraphColorMap } from '../WorkflowGraph.colors';
import type { WorkflowGraphNodeDataProps, WorkflowGraphNodeProps } from './RawNode.types';

const componentConfig = {
  width: {
    extraSmall: 250,
    small: 300,
    medium: 400,
    large: 500,
    extraLarge: 600,
  },
  aspectRatio: 0.38,
};

const positionStyles = {
  'top-left': css({
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }),
  'top-center': css({
    alignItems: 'flex-start',
    justifyContent: 'center',
  }),
  'top-right': css({
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  }),
  'middle-left': css({
    alignItems: 'center',
    justifyContent: 'flex-start',
  }),
  'middle-center': css({
    alignItems: 'center',
    justifyContent: 'center',
  }),
  'middle-right': css({
    alignItems: 'center',
    justifyContent: 'flex-end',
  }),
  'bottom-left': css({
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  }),
  'bottom-center': css({
    alignItems: 'flex-end',
    justifyContent: 'center',
  }),
  'bottom-right': css({
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  }),
};

type ScrollerProps = {
  $color: Required<WorkflowGraphNodeProps>['color'];
  $size: Required<WorkflowGraphNodeProps>['size'];
  $isClickable: boolean;
  $positionContent?: WorkflowGraphNodeDataProps['positionContent'];
};

const Scroller = styled(_Scroller, {
  shouldForwardProp,
})<ScrollerProps>(({ theme, $color, $size, $isClickable, $positionContent }) => [
  {
    background: getWorkflowGraphColorMap(theme)[$color],
    boxShadow: `0 1px 3px ${theme.sqwTier2Color.surface.elevation.shadow}, 0 1px 2px ${withOpacity(
      theme.sqwTier2Color.surface.elevation.shadow,
      '25%',
    )}`,
    borderRadius: theme.marko.variables.borderRadius.small,
    width: componentConfig.width[$size],
    height: componentConfig.width[$size] * componentConfig.aspectRatio,
    padding: theme.marko.variables.spacing.distance.extraLarge,
    cursor: $isClickable ? 'pointer' : 'grab',
    ':active': {
      cursor: $isClickable ? 'pointer' : 'grabbing',
    },
  },
  $positionContent && [
    {
      display: 'flex',
    },
    positionStyles[$positionContent],
  ],
]);

const Handle = styled(ReactFlowHandle)({
  visibility: 'hidden',
});

const Container = styled.div({
  padding: 5,
});

export const S = {
  Scroller,
  Handle,
  componentConfig,
  Container,
} as const;
