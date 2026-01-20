import styled from 'styled-components';
import { useDesignerStore, type NodeExecutionState } from '../../../stores/designer.store';

const Button = styled.button<{ $status: NodeExecutionState['status'] }>`
  position: absolute;
  top: -12px;
  right: -12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--color-bg-secondary);
  background-color: ${(props) => {
    switch (props.$status) {
      case 'ready':
        return '#10b981';
      case 'running':
        return '#3b82f6';
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      default:
        return '#9ca3af';
    }
  }};
  color: white;
  cursor: ${(props) => (props.$status === 'idle' ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  box-shadow: var(--shadow-md);
  transition: all 0.2s;
  opacity: ${(props) => (props.$status === 'idle' ? 0.5 : 1)};

  &:hover:not(:disabled) {
    transform: scale(1.1);
  }

  &:disabled {
    cursor: not-allowed;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  ${(props) =>
    props.$status === 'running' &&
    `
    animation: spin 1s linear infinite;
  `}
`;

interface NodePlayButtonProps {
  nodeId: string;
  executionState?: NodeExecutionState;
}

export function NodePlayButton({ nodeId, executionState }: NodePlayButtonProps) {
  const { executeNode, canExecuteNode } = useDesignerStore();

  const canExecute = canExecuteNode(nodeId);
  const status = executionState?.status || (canExecute ? 'ready' : 'idle');

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canExecute && status !== 'running') {
      await executeNode(nodeId);
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'running':
        return '⟳';
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      default:
        return '▶';
    }
  };

  return (
    <Button
      $status={status}
      onClick={handleClick}
      disabled={!canExecute || status === 'running'}
      title={
        status === 'idle'
          ? 'Vorherige Knoten müssen zuerst ausgeführt werden'
          : status === 'running'
            ? 'Wird ausgeführt...'
            : status === 'success'
              ? 'Erfolgreich ausgeführt - Klicken zum erneuten Ausführen'
              : status === 'error'
                ? 'Fehler - Klicken zum erneuten Ausführen'
                : 'Knoten ausführen'
      }
    >
      {getIcon()}
    </Button>
  );
}
