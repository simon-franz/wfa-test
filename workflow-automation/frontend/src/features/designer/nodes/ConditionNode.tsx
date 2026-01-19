import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import styled from 'styled-components';
import type { WorkflowNodeData } from '../../../stores/designer.store';

const NodeContainer = styled.div<{ $selected: boolean }>`
  min-width: 180px;
  background-color: var(--color-white);
  border: 2px solid ${(props) => (props.$selected ? 'var(--color-primary)' : '#ffc107')};
  border-radius: var(--radius-lg);
  box-shadow: ${(props) => (props.$selected ? 'var(--shadow-lg)' : 'var(--shadow-md)')};
  overflow: hidden;
`;

const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3);
  background-color: #fff8e6;
  border-bottom: 1px solid var(--color-gray-200);
`;

const NodeIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffc107;
  color: var(--color-gray-900);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: bold;
`;

const NodeTitle = styled.div`
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-gray-900);
`;

const NodeBody = styled.div`
  padding: var(--spacing-3);
`;

const ExpressionPreview = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
  background-color: var(--color-gray-50);
  padding: var(--spacing-2);
  border-radius: var(--radius-sm);
  font-family: monospace;
  word-break: break-all;
  max-height: 40px;
  overflow: hidden;
`;

const HandleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: var(--spacing-2) var(--spacing-3);
  background-color: var(--color-gray-50);
  border-top: 1px solid var(--color-gray-200);
`;

const HandleLabel = styled.div<{ $type: 'true' | 'false' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-1);
  position: relative;

  span {
    font-size: var(--font-size-xs);
    color: ${(props) => (props.$type === 'true' ? 'var(--color-success)' : 'var(--color-danger)')};
    font-weight: 500;
  }
`;

const StyledHandle = styled(Handle)`
  width: 12px;
  height: 12px;
  border: 2px solid var(--color-white);
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
  background-color: #ffc107;
  border: 2px solid var(--color-white);
`;

export const ConditionNode = memo(({ data, selected, id }: NodeProps<WorkflowNodeData>) => {
  const expression = (data.config?.expression as string) || 'true';

  return (
    <NodeContainer $selected={!!selected}>
      <TopHandle type="target" position={Position.Top} />
      <NodeHeader>
        <NodeIcon>◇</NodeIcon>
        <NodeTitle>{data.label}</NodeTitle>
      </NodeHeader>
      <NodeBody>
        <ExpressionPreview>{expression}</ExpressionPreview>
      </NodeBody>
      <HandleContainer>
        <HandleLabel $type="true">
          <TrueHandle type="source" position={Position.Bottom} id="true" />
          <span>Ja</span>
        </HandleLabel>
        <HandleLabel $type="false">
          <FalseHandle type="source" position={Position.Bottom} id="false" />
          <span>Nein</span>
        </HandleLabel>
      </HandleContainer>
    </NodeContainer>
  );
});

ConditionNode.displayName = 'ConditionNode';
