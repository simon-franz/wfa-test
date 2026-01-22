import { useState } from 'react';
import {
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from '@xyflow/react';
import styled from 'styled-components';
import { useDesignerStore } from '../../../stores/designer.store';

const DeleteButton = styled.button<{ $visible: boolean }>`
  width: 20px;
  height: 20px;
  background: var(--color-danger);
  border: 2px solid var(--color-white);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity var(--transition-fast), transform var(--transition-fast);
  pointer-events: ${(props) => (props.$visible ? 'all' : 'none')};

  &:hover {
    transform: scale(1.2);
    background: #c82333;
  }
`;

const EdgePath = styled.path<{ $hovered: boolean; $animated: boolean }>`
  stroke: ${(props) => (props.$hovered ? 'var(--color-primary)' : 'var(--edge-color, var(--color-gray-400))')};
  stroke-width: ${(props) => (props.$hovered ? 3 : 2)};
  transition: stroke var(--transition-fast), stroke-width var(--transition-fast);
  
  ${(props) => props.$animated && `
    stroke-dasharray: 5;
    animation: dashdraw 0.5s linear infinite;
  `}

  @keyframes dashdraw {
    to {
      stroke-dashoffset: -10;
    }
  }
`;

const EdgeHitArea = styled.path`
  stroke: transparent;
  stroke-width: 20;
  fill: none;
  cursor: pointer;
`;

export function DeletableEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  animated = true,
}: EdgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const deleteEdge = useDesignerStore((state) => state.deleteEdge);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteEdge(id);
  };

  return (
    <>
      {/* Invisible hit area for easier hovering */}
      <EdgeHitArea
        d={edgePath}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Visible edge path with animation */}
      <EdgePath
        d={edgePath}
        $hovered={isHovered}
        $animated={animated}
        style={style}
        markerEnd={markerEnd}
        className="react-flow__edge-path"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Delete button on hover */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <DeleteButton
            $visible={isHovered}
            onClick={handleDelete}
            title="Verbindung löschen"
          >
            ×
          </DeleteButton>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
