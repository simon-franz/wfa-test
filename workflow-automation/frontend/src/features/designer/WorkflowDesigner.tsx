import { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  ReactFlow,
  Background,
  MiniMap,
  BackgroundVariant,
  type OnConnect,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useDesignerStore } from '../../stores/designer.store';
import { NodePalette } from './NodePalette';
import { ConfigPanel } from './ConfigPanel';
import { CanvasControls } from './CanvasControls';
import { TriggerNode } from './nodes/TriggerNode';
import { ActionNode } from './nodes/ActionNode';
import { ConditionNode } from './nodes/ConditionNode';
import { HRWorksNode } from './nodes/HRWorksNode';
import { DataTransformNode } from './nodes/DataTransformNode';
import { DeletableEdge } from './edges/DeletableEdge';
import { ContextMenu } from './ContextMenu';

// Define custom node types
const nodeTypes = {
  triggerNode: TriggerNode,
  actionNode: ActionNode,
  conditionNode: ConditionNode,
  hrworksNode: HRWorksNode,
  dataTransformNode: DataTransformNode,
};

// Define custom edge types
const edgeTypes = {
  deletable: DeletableEdge,
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
  background: var(--canvas-bg);

  .react-flow__node {
    cursor: pointer;
  }

  .react-flow__handle {
    width: 12px;
    height: 12px;
    border: 2px solid var(--color-bg);
    background-color: var(--edge-color);
    transition: background-color var(--transition-fast);
  }

  .react-flow__handle-connecting {
    background-color: var(--color-primary);
  }

  .react-flow__handle-valid {
    background-color: var(--color-success);
  }

  .react-flow__edge-path {
    stroke: var(--edge-color);
    stroke-width: 2;
  }

  .react-flow__edge.selected .react-flow__edge-path {
    stroke: var(--color-primary);
  }

  /* MiniMap dark mode styling */
  .react-flow__minimap {
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
  }

  .react-flow__minimap-mask {
    fill: var(--color-bg);
    opacity: 0.8;
  }
`;

function WorkflowDesignerInner() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectNode,
    selectedNodeId,
    addNode,
  } = useDesignerStore();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    nodeId?: string;
    flowPosition?: { x: number; y: number };
  } | null>(null);
  const { screenToFlowPosition } = useReactFlow();

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
    setContextMenu(null);
  }, [selectNode]);

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const data = event.dataTransfer.getData('application/reactflow');
      if (!data) return;

      const nodeDef = JSON.parse(data);
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Validate: Only one trigger allowed - replace existing one
      if (nodeDef.flowType === 'triggerNode') {
        const existingTrigger = nodes.find((n) => n.type === 'triggerNode');
        if (existingTrigger) {
          if (confirm('Es darf nur ein Trigger pro Workflow geben. Möchten Sie den bestehenden Trigger ersetzen?')) {
            // Remove old trigger
            useDesignerStore.getState().deleteNode(existingTrigger.id);
          } else {
            return;
          }
        }
      }

      const newNode = {
        id: `${nodeDef.type}-${Date.now()}`,
        type: nodeDef.flowType,
        position,
        data: {
          label: nodeDef.name,
          nodeType: nodeDef.type,
          config: { ...nodeDef.defaultConfig },
        },
      };

      addNode(newNode);
    },
    [screenToFlowPosition, nodes, addNode],
  );

  const handlePaneContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      const flowPosition = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        flowPosition,
      });
    },
    [screenToFlowPosition],
  );

  const handleNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: { id: string }) => {
      event.preventDefault();
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        nodeId: node.id,
      });
    },
    [],
  );

  return (
    <DesignerLayout>
      <NodePalette />

      <CanvasContainer>
        <StyledReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onPaneContextMenu={handlePaneContextMenu}
          onNodeContextMenu={handleNodeContextMenu}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
          deleteKeyCode={['Backspace', 'Delete']}
          defaultEdgeOptions={{
            type: 'deletable',
            animated: true, // Enable animation for data flow visualization
          }}
          connectionLineStyle={{ stroke: 'var(--color-primary)', strokeWidth: 2 }}
          connectionLineType="straight"
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={15}
            size={1}
            color="var(--canvas-dots)"
          />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.type === 'triggerNode') return 'var(--color-primary)';
              if (n.type === 'conditionNode') return 'var(--color-warning)';
              return 'var(--color-secondary)';
            }}
            nodeColor={(n) => {
              if (n.type === 'triggerNode') return 'var(--color-primary-light)';
              if (n.type === 'conditionNode') return 'rgba(252, 196, 25, 0.2)';
              return 'var(--color-bg-tertiary)';
            }}
            maskColor="var(--color-bg)"
          />
          <CanvasControls onFullscreen={handleFullscreen} />
        </StyledReactFlow>
      </CanvasContainer>

      {selectedNodeId && <ConfigPanel />}
      
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          nodeId={contextMenu.nodeId}
          flowPosition={contextMenu.flowPosition}
          onClose={() => setContextMenu(null)}
        />
      )}
    </DesignerLayout>
  );
}

// Wrap with ReactFlowProvider to enable hooks like useReactFlow
export function WorkflowDesigner() {
  return (
    <ReactFlowProvider>
      <WorkflowDesignerInner />
    </ReactFlowProvider>
  );
}
