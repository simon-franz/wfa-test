import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import styled from 'styled-components';
import type { WorkflowNodeData } from '../../../stores/designer.store';
import { NodePlayButton } from '../components/NodePlayButton';
import { NodeExecutionPanel } from '../components/NodeExecutionPanel';

const NodeWrapper = styled.div`
  position: relative;
  padding-bottom: 32px;
`;

const NodeContainer = styled.div<{ $selected: boolean }>`
  position: relative;
  min-width: 200px;
  background-color: var(--color-bg-secondary);
  border: 2px solid ${(props) => (props.$selected ? 'var(--color-primary)' : '#8b5cf6')};
  border-radius: var(--radius-lg);
  box-shadow: ${(props) => (props.$selected ? 'var(--shadow-lg)' : 'var(--shadow-md)')};
  overflow: visible;
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

const ConfigPreview = styled.div`
  margin-top: var(--spacing-2);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  background-color: var(--color-bg-tertiary);
  padding: var(--spacing-2);
  border-radius: var(--radius-sm);
  word-break: break-all;
`;

const StyledHandle = styled(Handle)`
  width: 12px;
  height: 12px;
  background-color: var(--edge-color);
  border: 2px solid var(--color-bg-secondary);
`;

export const CalculationNode = memo(({ data, selected, id }: NodeProps<WorkflowNodeData>) => {
  const getOperationLabel = (op: string) => {
    const labels: Record<string, string> = {
      addWeeks: 'Wochen addieren',
      addDays: 'Tage addieren',
      addMonths: 'Monate addieren',
      addYears: 'Jahre addieren',
      subtractWeeks: 'Wochen subtrahieren',
      subtractDays: 'Tage subtrahieren',
      subtractMonths: 'Monate subtrahieren',
      subtractYears: 'Jahre subtrahieren',
    };
    return labels[op] || op;
  };

  const getConfigPreview = () => {
    const config = data.config;
    if (config.operation && config.inputValue && config.amount !== undefined) {
      return `${getOperationLabel(config.operation)}: ${config.amount} → ${config.outputField || 'result'}`;
    }
    return 'Nicht konfiguriert';
  };

  return (
    <NodeWrapper>
      <NodeContainer $selected={selected}>
        <StyledHandle type="target" position={Position.Left} />
        
        <NodeHeader>
          <NodeIcon>📊</NodeIcon>
          <NodeTitle>{data.label}</NodeTitle>
        </NodeHeader>

        <NodeBody>
          <ConfigPreview>{getConfigPreview()}</ConfigPreview>
        </NodeBody>

        <StyledHandle type="source" position={Position.Right} />
      </NodeContainer>

      <NodePlayButton nodeId={id} />
      <NodeExecutionPanel nodeId={id} executionState={data.executionState} />
    </NodeWrapper>
  );
});

CalculationNode.displayName = 'CalculationNode';
