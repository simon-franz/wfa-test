import { type Edge, getSmoothStepPath } from '@xyflow/react';
import { observer } from 'mobx-react';

import { S } from './TreeEdge.styles';

export const TreeEdge = observer(
  ({
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
  },
);
