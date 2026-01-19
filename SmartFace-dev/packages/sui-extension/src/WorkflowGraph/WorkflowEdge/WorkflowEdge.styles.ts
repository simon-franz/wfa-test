import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { overflowEllipsis } from '@hrworks/design-system';

import { getWorkflowGraphColorMap } from '../WorkflowGraph.colors';
import type { WorkflowGraphColor } from '../WorkflowGraph.types';

const generateInteractionStyles = (isClickable?: boolean) =>
  css({
    cursor: 'default',
    pointerEvents: 'none',
    ...(isClickable && {
      cursor: 'pointer',
      pointerEvents: 'auto',
    }),
  });

const getStrokeColor = (color: WorkflowGraphColor, theme: Theme) => {
  if (color === 'neutral') {
    return theme.sqwTier2Color.border.bold;
  }

  return getWorkflowGraphColorMap(theme)[color];
};

type EdgeLabelProps = {
  labelX: number;
  labelY: number;
};

const EdgeLabel = styled.div<EdgeLabelProps>(({ theme, labelX, labelY }) => [
  overflowEllipsis,
  {
    ...theme.sqwTier2Typography.bodySm,
    position: 'absolute',
    transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
    backgroundColor: theme.sqwTier2Color.surface.raised,
    padding: theme.marko.variables.spacing.distance.extraSmall,
    borderRadius: theme.marko.variables.borderRadius.extraSmall,
    maxWidth: 80,
    pointerEvents: 'all', // necessary to show the tooltip.
  },
]);

const SelectorPath = styled.path<{
  isClickable?: boolean;
}>(({ isClickable }) => [
  {
    fill: 'none',
    stroke: 'transparent',
    strokeWidth: 28,
    '&&&&': {
      animation: 'none',
      strokeDasharray: 'none',
    },
  },
  generateInteractionStyles(isClickable),
]);

type PathProps = {
  isClickable?: boolean;
  color: WorkflowGraphColor;
};

const Path = styled.path<PathProps>(({ theme, isClickable, color }) => [
  {
    '&&&&': {
      strokeWidth: '4',
      stroke: getStrokeColor(color, theme),
    },
  },
  generateInteractionStyles(isClickable),
]);

export const S = {
  getStrokeColor,
  EdgeLabel,
  SelectorPath,
  Path,
} as const;
