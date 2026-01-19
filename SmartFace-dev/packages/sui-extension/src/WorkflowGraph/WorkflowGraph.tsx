import '@xyflow/react/dist/style.css';

import { type DefaultEdgeOptions, ReactFlow, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import { observer } from 'mobx-react';
import { useEffect, useMemo, useState } from 'react';

import { TreeGraphControls } from '../TreeGraph/TreeGraphControl';
import { RawNode } from './RawNode/RawNode';
import { S as RawNodeStyles } from './RawNode/RawNode.styles';
import { useWorkflowLayout } from './useWorkflowLayout';
import { WorkflowEdge } from './WorkflowEdge/WorkflowEdge';
import type { WorkflowGraphEdgeProps } from './WorkflowEdge/WorkflowEdge.types';
import { S } from './WorkflowGraph.styles';
import type { WorkflowGraphProps } from './WorkflowGraph.types';
import { WorkflowGraphContext, type WorkflowGraphContextProps } from './WorkflowGraphContext';

const nodeTypes = {
  rawNode: RawNode,
};

const edgeTypes = {
  workflowEdge: WorkflowEdge,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'smoothstep',
};

const WorkflowGraphComponent = observer(
  ({
    nodes,
    edges,
    direction = 'LR',
    defaultNodeColor,
    defaultNodeSize,
    defaultEdgeMarkerEnd,
    defaultEdgeMarkerStart,
    defaultEdgeColor,
    ...otherProps
  }: WorkflowGraphProps) => {
    const nodeWidth = RawNodeStyles.componentConfig.width;
    const [renderKey, setRenderKey] = useState(0);
    const positionedNodes = useWorkflowLayout(nodes, edges, nodeWidth, direction, defaultNodeSize);
    const reactFlowInstance = useReactFlow();

    // Calculate the sideways logic. We want edges to always take the nearest handle
    const calculatedEdges = useMemo(() => {
      const newEdges: Array<WorkflowGraphEdgeProps> = [];
      edges.forEach((edge) => {
        let sourceHandle = edge.sourceHandle;
        let targetHandle = edge.targetHandle;
        if (edge.source === edge.target && sourceHandle === 'forward' && targetHandle === 'forward') {
          sourceHandle = 'right';
          targetHandle = 'top';
        }

        if (sourceHandle === 'sideways' || targetHandle === 'sideways') {
          const sourceNode = positionedNodes.find((node) => node.id === edge.source);
          const targetNode = positionedNodes.find((node) => node.id === edge.target);
          if (!sourceNode || !targetNode) {
            return;
          }
          // The higher the y-position, the lower is the node actually
          if (direction === 'LR' || direction === 'RL') {
            const sourceNodeIsBelowTargetNode = sourceNode.position.y > targetNode.position.y;
            sourceHandle = sourceNodeIsBelowTargetNode ? 'top' : 'bottom';
            targetHandle = sourceNodeIsBelowTargetNode ? 'bottom' : 'top';
          } else {
            const sourceNodeIsBehindTargetNode = sourceNode.position.x > targetNode.position.x;
            sourceHandle = sourceNodeIsBehindTargetNode ? 'left' : 'right';
            targetHandle = sourceNodeIsBehindTargetNode ? 'right' : 'left';
          }
        }
        newEdges.push({ ...edge, sourceHandle, targetHandle });
      });

      return newEdges;
    }, [edges, positionedNodes, direction]);

    const WorkflowGraphContextValue: WorkflowGraphContextProps = {
      defaultEdgeColor,
      defaultNodeColor,
      defaultNodeSize,
      defaultEdgeMarkerEnd,
      defaultEdgeMarkerStart,
    };

    // Force re-render of ReactFlow on direction change, as edges are sometimes not drawn correctly when toggling between 'TB' and 'LR' dynamically.
    useEffect(() => {
      setRenderKey(Math.random());
    }, [direction]);

    return (
      <WorkflowGraphContext.Provider value={WorkflowGraphContextValue}>
        <S.Wrapper {...otherProps}>
          <ReactFlow
            key={renderKey}
            nodes={positionedNodes}
            edges={calculatedEdges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            defaultEdgeOptions={defaultEdgeOptions}
            nodesConnectable={false}
            nodesDraggable={false}
            proOptions={{ hideAttribution: true }}
          >
            <TreeGraphControls reactFlowInstance={reactFlowInstance} showControls={true} />
          </ReactFlow>
        </S.Wrapper>
      </WorkflowGraphContext.Provider>
    );
  },
);

// We need to wrap the component inside ReactFlowProvider for useReactFlow to work
export const WorkflowGraph = (props: WorkflowGraphProps) => (
  <ReactFlowProvider>
    <WorkflowGraphComponent {...props} />
  </ReactFlowProvider>
);
