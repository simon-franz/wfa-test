import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import type { NodeExecutionState } from '../../../stores/designer.store';

const PanelTrigger = styled.button<{ $hasData: boolean }>`
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  height: 18px;
  padding: 0 var(--spacing-2);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  cursor: ${(props) => (props.$hasData ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  font-size: 10px;
  opacity: ${(props) => (props.$hasData ? 1 : 0.5)};
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    ${(props) =>
      props.$hasData &&
      `
      background-color: var(--color-bg-tertiary);
      border-color: var(--color-primary);
    `}
  }
`;

const PopoverContainer = styled.div<{ $visible: boolean }>`
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  z-index: 1000;
  min-width: 350px;
  max-width: 500px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};
  transition: opacity 0.2s, visibility 0.2s;
`;

const PopoverHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-2) var(--spacing-3);
  border-bottom: 1px solid var(--color-border);
`;

const TabContainer = styled.div`
  display: flex;
  gap: var(--spacing-1);
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: var(--spacing-1) var(--spacing-3);
  border: none;
  border-radius: var(--radius-sm);
  background-color: ${(props) =>
    props.$active ? 'var(--color-primary)' : 'transparent'};
  color: ${(props) =>
    props.$active ? 'white' : 'var(--color-text-secondary)'};
  font-size: var(--font-size-xs);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$active ? 'var(--color-primary)' : 'var(--color-bg-tertiary)'};
  }
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  border-radius: var(--radius-sm);
  background-color: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  &:hover {
    background-color: var(--color-bg-tertiary);
    color: var(--color-text);
  }
`;

const PopoverBody = styled.div`
  max-height: 300px;
  overflow: auto;
`;

const JsonContainer = styled.pre`
  margin: 0;
  padding: var(--spacing-3);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 11px;
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-bg-tertiary);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;

  .json-key {
    color: #0ea5e9;
  }

  .json-string {
    color: #10b981;
  }

  .json-number {
    color: #f59e0b;
  }

  .json-boolean {
    color: #8b5cf6;
  }

  .json-null {
    color: #6b7280;
  }
`;

const EmptyState = styled.div`
  padding: var(--spacing-4);
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
`;

const ErrorBadge = styled.span`
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-2);
  background-color: var(--color-danger);
  color: white;
  border-radius: var(--radius-sm);
  font-size: 10px;
  font-weight: 500;
`;

const StatusBadge = styled.span<{ $status: NodeExecutionState['status'] }>`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  font-size: 10px;
  color: ${(props) => {
    switch (props.$status) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'running':
        return '#3b82f6';
      default:
        return 'var(--color-text-muted)';
    }
  }};
`;

interface NodeExecutionPanelProps {
  executionState?: NodeExecutionState;
}

export function NodeExecutionPanel({ executionState }: NodeExecutionPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('output');
  const containerRef = useRef<HTMLDivElement>(null);

  const hasData =
    executionState?.status === 'success' || executionState?.status === 'error';
  const hasInput =
    executionState?.input && Object.keys(executionState.input).length > 0;
  const hasOutput = executionState?.output !== undefined;
  const hasError = executionState?.status === 'error';

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasData) {
      setIsOpen(!isOpen);
    }
  };

  const formatJson = (data: unknown): string => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  const highlightJson = (json: string): JSX.Element => {
    // Escape HTML to prevent rendering
    const escapeHtml = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    // Simple JSON syntax highlighting
    const highlighted = escapeHtml(json).replace(
      /(&quot;(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\&quot;])*&quot;(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = 'json-number';
        if (/^&quot;/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'json-key';
          } else {
            cls = 'json-string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
    return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  const getStatusIcon = () => {
    switch (executionState?.status) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'running':
        return '⟳';
      default:
        return '○';
    }
  };

  return (
    <div ref={containerRef}>
      <PanelTrigger
        $hasData={hasData}
        onClick={handleTriggerClick}
        title={hasData ? 'Ausführungsergebnis anzeigen' : 'Noch nicht ausgeführt'}
      >
        <StatusBadge $status={executionState?.status || 'idle'}>
          {getStatusIcon()}
        </StatusBadge>
        {hasData ? 'I/O anzeigen' : 'Nicht ausgeführt'}
      </PanelTrigger>

      <PopoverContainer $visible={isOpen}>
        <PopoverHeader>
          <TabContainer>
            <Tab
              $active={activeTab === 'input'}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab('input');
              }}
            >
              Input {hasInput && `(${Object.keys(executionState?.input || {}).length})`}
            </Tab>
            <Tab
              $active={activeTab === 'output'}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab('output');
              }}
            >
              Output {hasError && <ErrorBadge>Error</ErrorBadge>}
            </Tab>
          </TabContainer>
          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            ✕
          </CloseButton>
        </PopoverHeader>

        <PopoverBody>
          {activeTab === 'input' ? (
            hasInput ? (
              <JsonContainer>{highlightJson(formatJson(executionState?.input))}</JsonContainer>
            ) : (
              <EmptyState>Keine Input-Daten vorhanden</EmptyState>
            )
          ) : hasError ? (
            <JsonContainer style={{ color: '#ef4444' }}>
              {executionState?.error || 'Unbekannter Fehler'}
            </JsonContainer>
          ) : hasOutput ? (
            <JsonContainer>{highlightJson(formatJson(executionState?.output))}</JsonContainer>
          ) : (
            <EmptyState>Keine Output-Daten vorhanden</EmptyState>
          )}
        </PopoverBody>
      </PopoverContainer>
    </div>
  );
}
