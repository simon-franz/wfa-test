import { useCallback } from 'react';
import styled from 'styled-components';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  type OnConnect,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useDesignerStore } from '../../stores/designer.store';
import { NodePalette } from './NodePalette';
import { ConfigPanel } from './ConfigPanel';
import { TriggerNode } from './nodes/TriggerNode';
import { ActionNode } from './nodes/ActionNode';
import { ConditionNode } from './nodes/ConditionNode';

// Define custom node types
const nodeTypes = {
  triggerNode: TriggerNode,
  actionNode: ActionNode,
  conditionNode: ConditionNode,
};

const DesignerLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const CanvasContainer = styled.div`
  flex: 1;
  position: relative;
`;

const StyledReactFlow = styled(ReactFlow)`
  .react-flow__node {
    cursor: pointer;
  }

  .react-flow__handle {
    width: 12px;
    height: 12px;
    border: 2px solid var(--color-white);
    background-color: var(--color-gray-400);
  }

  .react-flow__handle-connecting {
    background-color: var(--color-primary);
  }

  .react-flow__handle-valid {
    background-color: var(--color-success);
  }

  .react-flow__edge-path {
    stroke: var(--color-gray-400);
    stroke-width: 2;
  }

  .react-flow__edge.selected .react-flow__edge-path {
    stroke: var(--color-primary);
  }
`;

export function WorkflowDesigner() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectNode,
    selectedNodeId,
  } = useDesignerStore();

  const handleConnect: OnConnect = useCallback(
    (connection) => {
      onConnect(connection);
    },
    [onConnect],
  );

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: { id: string }) => {
      selectNode(node.id);
    },
    [selectNode],
  );

  const handlePaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  return (
    <DesignerLayout>
      <NodePalette />

      <CanvasContainer>
        <StyledReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
          deleteKeyCode={['Backspace', 'Delete']}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
          }}
        >
          <Background variant={BackgroundVariant.Dots} gap={15} size={1} color="#ccc" />
          <Controls />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.type === 'triggerNode') return '#0066cc';
              if (n.type === 'conditionNode') return '#ffc107';
              return '#6c757d';
            }}
            nodeColor={(n) => {
              if (n.type === 'triggerNode') return '#e6f0fa';
              if (n.type === 'conditionNode') return '#fff8e6';
              return '#f1f3f5';
            }}
          />
        </StyledReactFlow>
      </CanvasContainer>

      {selectedNodeId && <ConfigPanel />}
    </DesignerLayout>
  );
}
