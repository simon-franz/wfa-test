import { type Edge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';
import { useContext } from 'react';

import { WorkflowGraphContext } from '../WorkflowGraphContext';
import { ArrowMarker } from './ArrowMarker/ArrowMarker';
import { S } from './WorkflowEdge.styles';
import type { MarkerLocation, WorkflowGraphEdgeProps } from './WorkflowEdge.types';

export const WorkflowEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: Parameters<typeof getSmoothStepPath>[0] & Edge<Required<WorkflowGraphEdgeProps>['data']>) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { defaultEdgeMarkerStart, defaultEdgeMarkerEnd, defaultEdgeColor } = useContext(WorkflowGraphContext);

  const getActualMarker = (type: MarkerLocation) => {
    const markerFromData = type === 'start' ? data?.markerStart : data?.markerEnd;
    const defaultMarker = type === 'start' ? defaultEdgeMarkerStart : defaultEdgeMarkerEnd;
    const defaultFallback = type === 'start' ? 'none' : 'arrow';

    return markerFromData || defaultMarker || defaultFallback;
  };

  const { onClick, label } = data || {};

  const edgeColor = (data?.color ?? defaultEdgeColor) || 'neutral';

  return (
    <>
      {label && (
        <EdgeLabelRenderer>
          <S.EdgeLabel title={label} labelX={labelX} labelY={labelY}>
            {label}
          </S.EdgeLabel>
        </EdgeLabelRenderer>
      )}
      <ArrowMarker color={edgeColor} id={id} />
      <S.SelectorPath
        onClick={onClick}
        isClickable={Boolean(onClick)}
        className="react-flow__edge-path-selector"
        d={edgePath}
        fillRule="evenodd"
      />
      <S.Path
        color={edgeColor}
        onClick={onClick}
        isClickable={Boolean(onClick)}
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerStart={getActualMarker('start') === 'arrow' ? `url(#arrowhead-start-${id})` : undefined}
        markerEnd={getActualMarker('end') === 'none' ? undefined : `url(#arrowhead-end-${id})`}
      />
    </>
  );
};
