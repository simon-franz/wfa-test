import { memo } from 'react';
import { NodePlayButton } from '../components/NodePlayButton';
import { NodeExecutionPanel } from '../components/NodeExecutionPanel';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import styled from 'styled-components';
import type { WorkflowNodeData } from '../../../stores/designer.store';

const NodeWrapper = styled.div`
  position: relative;
  padding-bottom: 32px;
`;

const NodeContainer = styled.div<{ $selected: boolean }>`
  position: relative;
  min-width: 180px;
  background-color: var(--color-bg-secondary);
  border: 2px solid ${(props) => (props.$selected ? 'var(--color-primary)' : 'var(--color-warning)')};
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
  background-color: rgba(252, 196, 25, 0.15);
  border-bottom: 1px solid var(--color-border);
`;

const NodeIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-warning);
  color: var(--color-bg);
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

const ExpressionPreview = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  background-color: var(--color-bg-tertiary);
  padding: var(--spacing-2);
  border-radius: var(--radius-sm);
  font-family: monospace;
  word-break: break-all;
  max-height: 40px;
  overflow: hidden;
`;

const HandleContainer = styled.div`
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
`;

const HandleLabel = styled.div<{ $type: 'true' | 'false' }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  position: relative;

  span {
    font-size: var(--font-size-xs);
    color: ${(props) => (props.$type === 'true' ? 'var(--color-success)' : 'var(--color-danger)')};
    font-weight: 500;
    background: var(--color-bg-secondary);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
  }
`;

const StyledHandle = styled(Handle)`
  width: 12px;
  height: 12px;
  border: 2px solid var(--color-bg-secondary);
  position: relative !important;
  transform: none !important;
  left: auto !important;
  right: auto !important;
`;

const TrueHandle = styled(StyledHandle)`
  background-color: var(--color-success);
`;

const FalseHandle = styled(StyledHandle)`
  background-color: var(--color-danger);
`;

const TopHandle = styled(Handle)`
  width: 12px;
  height: 12px;
  background-color: var(--color-warning);
  border: 2px solid var(--color-bg-secondary);
`;

export const ConditionNode = memo(({ data, selected, id }: NodeProps<WorkflowNodeData>) => {
  const expression = (data.config?.expression as string) || 'true';

  return (
    <NodeWrapper>
      <NodeContainer $selected={!!selected}>
        <NodePlayButton nodeId={id} executionState={data.executionState} />
        <TopHandle type="target" position={Position.Left} />
        <NodeHeader>
          <NodeIcon>◇</NodeIcon>
          <NodeTitle>{data.label}</NodeTitle>
        </NodeHeader>
        <NodeBody>
          <ExpressionPreview>{expression}</ExpressionPreview>
        </NodeBody>
        <HandleContainer>
          <HandleLabel $type="true">
            <span>Ja</span>
            <TrueHandle type="source" position={Position.Right} id="true" />
          </HandleLabel>
          <HandleLabel $type="false">
            <span>Nein</span>
            <FalseHandle type="source" position={Position.Right} id="false" />
          </HandleLabel>
        </HandleContainer>
      </NodeContainer>
      <NodeExecutionPanel executionState={data.executionState} />
    </NodeWrapper>
  );
});

ConditionNode.displayName = 'ConditionNode';
