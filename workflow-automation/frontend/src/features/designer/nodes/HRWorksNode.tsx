import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import styled from 'styled-components';
import type { WorkflowNodeData } from '../../../stores/designer.store';

const NodeContainer = styled.div<{ $selected: boolean }>`
  min-width: 200px;
  background-color: var(--color-bg-secondary);
  border: 2px solid ${(props) => (props.$selected ? 'var(--color-primary)' : '#ff6b35')};
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
  background-color: rgba(255, 107, 53, 0.15);
  border-bottom: 1px solid var(--color-border);
`;

const NodeIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff6b35;
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
  background-color: #ff6b35;
  border: 2px solid var(--color-bg-secondary);
`;

export const HRWorksNode = memo(({ data, selected }: NodeProps<WorkflowNodeData>) => {
  const getConfigPreview = () => {
    const config = data.config;
    if (config.endpoint) {
      return `${config.endpoint}`;
    }
    return 'Nicht konfiguriert';
  };

  const preview = getConfigPreview();

  return (
    <NodeContainer $selected={!!selected}>
      <StyledHandle type="target" position={Position.Left} />
      <NodeHeader>
        <NodeIcon>HR</NodeIcon>
        <NodeTitle>{data.label}</NodeTitle>
      </NodeHeader>
      <NodeBody>
        <ConfigPreview>{preview}</ConfigPreview>
      </NodeBody>
      <StyledHandle type="source" position={Position.Right} />
    </NodeContainer>
  );
});

HRWorksNode.displayName = 'HRWorksNode';
