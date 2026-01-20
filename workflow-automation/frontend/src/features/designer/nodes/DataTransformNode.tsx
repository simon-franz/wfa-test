import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import styled from 'styled-components';
import type { WorkflowNodeData } from '../../../stores/designer.store';
import { NodePlayButton } from '../components/NodePlayButton';

const NodeContainer = styled.div<{ $selected: boolean }>`
  position: relative;
  min-width: 200px;
  background-color: var(--color-bg-secondary);
  border: 2px solid ${(props) => (props.$selected ? 'var(--color-primary)' : '#8b5cf6')};
  border-radius: var(--radius-lg);
  box-shadow: ${(props) => (props.$selected ? 'var(--shadow-lg)' : 'var(--shadow-md)')};
  overflow: hidden;
  transition: box-shadow var(--transition-fast), border-color var(--transition-fast);
`;

const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3);
  background-color: rgba(139, 92, 246, 0.15);
  border-bottom: 1px solid var(--color-border);
`;

const NodeIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8b5cf6;
  color: white;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: bold;
`;

const NodeTitle = styled.div`
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
`;

const NodeBody = styled.div`
  padding: var(--spacing-3);
`;

const ConfigPreview = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  background-color: var(--color-bg-tertiary);
  padding: var(--spacing-2);
  border-radius: var(--radius-sm);
  word-break: break-all;
  max-height: 60px;
  overflow: hidden;
`;

const StyledHandle = styled(Handle)`
  width: 12px;
  height: 12px;
  background-color: #8b5cf6;
  border: 2px solid var(--color-bg-secondary);
`;

export const DataTransformNode = memo(({ data, selected, id }: NodeProps<WorkflowNodeData>) => {
  const getConfigPreview = () => {
    const config = data.config;
    const operation = config.operation as string;
    
    if (!operation) return 'Nicht konfiguriert';
    
    switch (operation) {
      case 'count':
        return `Anzahl von ${config.inputPath || '...'}`;
      case 'extract':
        return `Extrahiere ${config.fieldPath || '...'}`;
      case 'filter':
        return `Filtere ${config.inputPath || '...'}`;
      case 'map':
        return `Mappe ${config.inputPath || '...'}`;
      default:
        return operation;
    }
  };

  const preview = getConfigPreview();

  return (
    <NodeContainer $selected={!!selected}>
      <NodePlayButton nodeId={id} executionState={data.executionState} />
      <StyledHandle type="target" position={Position.Left} />
      <NodeHeader>
        <NodeIcon>🔄</NodeIcon>
        <NodeTitle>{data.label}</NodeTitle>
      </NodeHeader>
      <NodeBody>
        <ConfigPreview>{preview}</ConfigPreview>
      </NodeBody>
      <StyledHandle type="source" position={Position.Right} />
    </NodeContainer>
  );
});

DataTransformNode.displayName = 'DataTransformNode';
