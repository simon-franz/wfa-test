import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import styled from 'styled-components';
import { useDesignerStore, type WorkflowNodeData } from '../../../stores/designer.store';

const NodeContainer = styled.div<{ $selected: boolean }>`
  min-width: 180px;
  background-color: var(--color-bg-secondary);
  border: 2px solid ${(props) => (props.$selected ? 'var(--color-primary)' : 'var(--color-primary)')};
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
  background-color: var(--color-primary-light);
  border-bottom: 1px solid var(--color-border);
`;

const NodeIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: var(--color-bg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
`;

const NodeTitle = styled.div`
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
`;

const NodeBody = styled.div`
  padding: var(--spacing-3);
`;

const NodeType = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
`;

const StyledHandle = styled(Handle)`
  width: 12px;
  height: 12px;
  background-color: var(--color-primary);
  border: 2px solid var(--color-bg-secondary);
`;

export const TriggerNode = memo(({ data, selected }: NodeProps<WorkflowNodeData>) => {
  const nodeTypeLabels: Record<string, string> = {
    'manual-trigger': 'Manueller Start',
    'scheduled-trigger': 'Zeitplan',
  };

  return (
    <NodeContainer $selected={!!selected}>
      <NodeHeader>
        <NodeIcon>▶</NodeIcon>
        <NodeTitle>{data.label}</NodeTitle>
      </NodeHeader>
      <NodeBody>
        <NodeType>{nodeTypeLabels[data.nodeType] || data.nodeType}</NodeType>
      </NodeBody>
      <StyledHandle type="source" position={Position.Right} />
    </NodeContainer>
  );
});

TriggerNode.displayName = 'TriggerNode';
