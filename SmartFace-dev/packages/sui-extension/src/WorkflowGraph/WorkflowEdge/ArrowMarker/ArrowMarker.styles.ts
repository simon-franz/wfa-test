import styled from '@emotion/styled';

import type { WorkflowGraphColor } from '../../WorkflowGraph.types';
import { S as WorkflowEdgeStyles } from './../WorkflowEdge.styles';

const BackgroundRect = styled.rect(({ theme }) => ({
  fill: theme.sqwTier2Color.surface.sunken,
}));

const ArrowPath = styled.path<{
  color: WorkflowGraphColor;
}>(({ theme, color }) => [
  {
    strokeWidth: '1.4',
    fill: 'none',
    stroke: WorkflowEdgeStyles.getStrokeColor(color, theme),
    '&&&&': {
      animation: 'none',
      strokeDasharray: 'none',
    },
  },
]);

export const S = {
  BackgroundRect,
  ArrowPath,
};
