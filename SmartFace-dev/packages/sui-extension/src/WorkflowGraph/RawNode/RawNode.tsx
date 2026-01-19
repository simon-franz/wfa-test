import { type Node, Position } from '@xyflow/react';
import { useContext, useMemo } from 'react';

import { WorkflowGraphContext } from '../WorkflowGraphContext';
import { S } from './RawNode.styles';
import type { WorkflowGraphNodeDataProps } from './RawNode.types';

export const RawNode = ({ data }: Omit<Node<WorkflowGraphNodeDataProps>, 'position'>) => {
  const { defaultNodeSize = 'medium', defaultNodeColor } = useContext(WorkflowGraphContext);
  const {
    children,
    sourcePosition,
    targetPosition,
    color = defaultNodeColor || 'neutral',
    size = defaultNodeSize,
    positionContent = 'middle-center',
    onClick,
    'data-guide-id': dataGuideId,
  } = data;

  const alternativeSourcePosition = sourcePosition === 'right' ? Position.Bottom : Position.Right;
  const alternativeTargetPosition = targetPosition === 'left' ? Position.Top : Position.Left;

  const renderHandles = useMemo(
    () =>
      Object.values(Position).flatMap((position) => [
        <S.Handle key={`target${position}`} type="target" id={position} position={position} />,
        <S.Handle key={`source${position}`} type="source" id={position} position={position} />,
      ]),
    [],
  );

  return (
    <S.Container>
      {renderHandles}
      <S.Handle type="target" id="sideways" position={alternativeTargetPosition} />
      <S.Handle type="target" id="forward" position={targetPosition} />
      <S.Scroller
        $color={color}
        $size={size}
        onClick={onClick}
        $isClickable={Boolean(onClick)}
        $positionContent={positionContent}
        data-guide-id={dataGuideId}
      >
        <div>{children}</div>
      </S.Scroller>
      <S.Handle type="source" id="forward" position={sourcePosition} />
      <S.Handle type="source" id="sideways" position={alternativeSourcePosition} />
    </S.Container>
  );
};
