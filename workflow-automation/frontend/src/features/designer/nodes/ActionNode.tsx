import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import styled from 'styled-components';
import type { WorkflowNodeData } from '../../../stores/designer.store';

const NodeContainer = styled.div<{ $selected: boolean }>`
  min-width: 180px;
  background-color: var(--color-white);
  border: 2px solid ${(props) => (props.$selected ? 'var(--color-primary)' : 'var(--color-gray-300)')};
  border-radius: var(--radius-lg);
  box-shadow: ${(props) => (props.$selected ? 'var(--shadow-lg)' : 'var(--shadow-md)')};
  overflow: hidden;
`;

const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3);
  background-color: var(--color-gray-100);
  border-bottom: 1px solid var(--color-gray-200);
`;

const NodeIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-gray-600);
  color: var(--color-white);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
`;

const NodeTitle = styled.div`
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-gray-900);
`;

const NodeBody = styled.div`
  padding: var(--spacing-3);
`;

const NodeType = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
`;

const ConfigPreview = styled.div`
  margin-top: var(--spacing-2);
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
  background-color: var(--color-gray-50);
  padding: var(--spacing-2);
  border-radius: var(--radius-sm);
  word-break: break-all;
  max-height: 40px;
  overflow: hidden;
`;

const StyledHandle = styled(Handle)`
  width: 12px;
  height: 12px;
  background-color: var(--color-gray-400);
  border: 2px solid var(--color-white);
`;

export const ActionNode = memo(({ data, selected }: NodeProps<WorkflowNodeData>) => {
  const nodeIcons: Record<string, string> = {
    'http-request': '🌐',
    delay: '⏳',
  };

  const nodeTypeLabels: Record<string, string> = {
    'http-request': 'HTTP Anfrage',
    delay: 'Verzögerung',
  };

  const getConfigPreview = () => {
    const config = data.config;
    if (data.nodeType === 'http-request' && config.url) {
      return `${config.method || 'GET'} ${config.url}`;
    }
    if (data.nodeType === 'delay' && config.duration) {
      return `${config.duration} ${config.unit || 'seconds'}`;
    }
    return null;
  };

  const preview = getConfigPreview();

  return (
    <NodeContainer $selected={!!selected}>
      <StyledHandle type="target" position={Position.Top} />
      <NodeHeader>
        <NodeIcon>{nodeIcons[data.nodeType] || '⚡'}</NodeIcon>
        <NodeTitle>{data.label}</NodeTitle>
      </NodeHeader>
      <NodeBody>
        <NodeType>{nodeTypeLabels[data.nodeType] || data.nodeType}</NodeType>
        {preview && <ConfigPreview>{preview}</ConfigPreview>}
      </NodeBody>
      <StyledHandle type="source" position={Position.Bottom} />
    </NodeContainer>
  );
});

ActionNode.displayName = 'ActionNode';
