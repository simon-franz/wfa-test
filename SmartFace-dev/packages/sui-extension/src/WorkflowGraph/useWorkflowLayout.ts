import type { Size } from '@hrworks/types/shared/UiTypes';
import { type Node, Position, useReactFlow } from '@xyflow/react';
import dagre from 'dagre';
import { useCallback, useEffect, useState } from 'react';

import { S as RawNodeStyles } from './RawNode/RawNode.styles';
import type { WorkflowGraphNodeDataProps, WorkflowGraphNodeProps } from './RawNode/RawNode.types';
import type { WorkflowGraphEdgeProps } from './WorkflowEdge/WorkflowEdge.types';
import type { WorkflowGraphProps } from './WorkflowGraph.types';

export const useWorkflowLayout = (
  nodes: WorkflowGraphNodeProps[],
  edges: WorkflowGraphEdgeProps[],
  nodeWidth: Record<Size, number>,
  direction: NonNullable<WorkflowGraphProps['direction']>,
  defaultNodeSize?: Size,
): Node<WorkflowGraphNodeDataProps>[] => {
  const [nodesWithPosition, setNodesWithPosition] = useState<Node<WorkflowGraphNodeDataProps>[]>([]);
  const aspectRatio = RawNodeStyles.componentConfig.aspectRatio;
  const { fitView } = useReactFlow();

  const getNodeWidth = useCallback(
    (size?: Size) => nodeWidth[size || defaultNodeSize || 'medium'],
    [defaultNodeSize, nodeWidth],
  );

  useEffect(() => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction, ranksep: 150, nodesep: 150 });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, {
        width: getNodeWidth(node.size),
        height: getNodeWidth(node.size) * aspectRatio,
      });
    });

    edges.forEach(({ sourceHandle, targetHandle, source, target }) => {
      // if sideways we dont want the edges to change the layout so we return
      if (sourceHandle === 'sideways' || targetHandle === 'sideways') {
        return;
      }
      dagreGraph.setEdge(source, target);
    });

    dagre.layout(dagreGraph);

    const positionsMap = {
      TB: { source: Position.Bottom, target: Position.Top },
      BT: { source: Position.Top, target: Position.Bottom },
      LR: { source: Position.Right, target: Position.Left },
      RL: { source: Position.Left, target: Position.Right },
    };
    const targetPosition = positionsMap[direction].target;
    const sourcePosition = positionsMap[direction].source;

    const updatedNodes = nodes.map((node) => {
      const { x, y } = dagreGraph.node(node.id);
      const width = getNodeWidth(node.size);
      const height = width * aspectRatio;

      return {
        ...node,
        position: {
          x: x - width / 2,
          y: y - height / 2,
        },
        data: { ...node, sourcePosition, targetPosition },
      };
    });

    setNodesWithPosition(updatedNodes);
    // We have to wait a bit until nodes are on its position and then call fitView
    setTimeout(() => fitView({ padding: 0.2, duration: 300 }), 300);
  }, [edges, nodes, direction, nodeWidth, aspectRatio, defaultNodeSize, getNodeWidth, fitView]);

  return nodesWithPosition;
};
