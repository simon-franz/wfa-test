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
  overflow: visible;
  transition: box-shadow var(--transition-fast), border-color var(--transition-fast);
  padding-right: 6px;
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
  padding-right: 0;
  overflow: visible;
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

const ConditionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  overflow: visible;
`;

const ConditionItem = styled.div<{ $matched?: boolean }>`
  position: relative;
  font-size: var(--font-size-xs);
  color: ${(props) => props.$matched ? 'var(--color-success)' : 'var(--color-text-muted)'};
  background-color: ${(props) => 
    props.$matched ? 'rgba(16, 185, 129, 0.3)' : 'var(--color-bg-tertiary)'};
  border: ${(props) => props.$matched ? '2px solid var(--color-success)' : 'none'};
  padding: var(--spacing-2);
  padding-right: var(--spacing-4);
  border-radius: var(--radius-sm);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  font-family: monospace;
  word-break: break-all;
  font-weight: ${(props) => props.$matched ? '600' : 'normal'};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ConditionHandle = styled(Handle)<{ $color?: string }>`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.$color || 'var(--color-primary)'};
  border: 2px solid var(--color-bg-secondary);
  position: absolute !important;
  right: 0;
  top: 50%;
  transform: translateY(-50%) translateX(50%) !important;
  left: auto !important;
`;

const TopHandle = styled(Handle)`
  width: 12px;
  height: 12px;
  background-color: var(--color-warning);
  border: 2px solid var(--color-bg-secondary);
`;

export const ConditionNode = memo(({ data, selected, id }: NodeProps<WorkflowNodeData>) => {
  // Support both old (single expression) and new (multiple conditions) format
  const config = data.config as any;
  const conditions = config?.conditions || [
    { id: 'true', label: 'Ja', expression: config?.expression || 'true' },
    { id: 'false', label: 'Nein', expression: `not (${config?.expression || 'true'})` },
  ];
  const enableDefault = config?.enableDefault !== false;
  
  // Get matched condition from execution result
  const matchedConditionId = data.executionState?.output?.matchedCondition;

  // Color palette for handles
  const colors = [
    'var(--color-success)',
    'var(--color-info)',
    'var(--color-warning)',
    'var(--color-danger)',
    'var(--color-primary)',
  ];

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
          <ConditionsList>
            {conditions.map((condition: any, index: number) => (
              <ConditionItem key={condition.id} $matched={matchedConditionId === condition.id}>
                <span>{condition.label}: {condition.expression}</span>
                <ConditionHandle
                  type="source"
                  position={Position.Right}
                  id={condition.id}
                  $color={colors[index % colors.length]}
                />
              </ConditionItem>
            ))}
            {enableDefault && (
              <ConditionItem $matched={matchedConditionId === 'default'}>
                <span>Default: (keine trifft zu)</span>
                <ConditionHandle
                  type="source"
                  position={Position.Right}
                  id="default"
                  $color="var(--color-text-muted)"
                />
              </ConditionItem>
            )}
          </ConditionsList>
        </NodeBody>
      </NodeContainer>
      <NodeExecutionPanel executionState={data.executionState} />
    </NodeWrapper>
  );
});

ConditionNode.displayName = 'ConditionNode';
