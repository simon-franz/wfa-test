import { type Edge, getSmoothStepPath } from '@xyflow/react';

import { S } from './TreeEdge.styles';

export const TreeEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: Parameters<typeof getSmoothStepPath>[0] & Edge) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return <S.Path id={id} className="react-flow__edge-path" d={edgePath} />;
};
