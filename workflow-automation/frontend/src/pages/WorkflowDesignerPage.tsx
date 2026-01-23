import { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useWorkflowStore } from '../stores/workflow.store';
import { useDesignerStore } from '../stores/designer.store';
import { WorkflowDesigner } from '../features/designer/WorkflowDesigner';
import { WorkflowInfoSidebar } from '../features/designer/WorkflowInfoSidebar';
import type { WorkflowDefinition } from 'shared/types';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  margin: calc(-1 * var(--spacing-6));
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-3) var(--spacing-5);
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-gray-200);
`;

const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
`;

const BackButton = styled.button`
  padding: var(--spacing-2) var(--spacing-3);
  color: var(--color-gray-600);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);

  &:hover {
    color: var(--color-gray-900);
  }
`;

const WorkflowName = styled.div`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-900);
  padding: var(--spacing-1) var(--spacing-2);
  cursor: pointer;
  border-radius: var(--border-radius-md);
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  font-weight: 500;
  border-radius: var(--radius-full);

  ${(props) => {
    switch (props.$status) {
      case 'active':
        return `color: var(--color-success); background-color: #e6f4ea;`;
      case 'draft':
        return `color: var(--color-warning); background-color: #fff8e6;`;
      default:
        return `color: var(--color-gray-600); background-color: var(--color-gray-100);`;
    }
  }}
`;

const DirtyIndicator = styled.span`
  color: var(--color-warning);
  font-size: var(--font-size-sm);
`;

const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
`;

const Button = styled.button<{ $variant?: 'primary' | 'success' | 'danger' }>`
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
  font-weight: 500;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);

  ${(props) => {
    switch (props.$variant) {
      case 'primary':
        return `
          color: var(--color-white);
          background-color: var(--color-primary);
          border: none;
          &:hover { background-color: var(--color-primary-hover); }
          &:disabled { background-color: var(--color-gray-400); cursor: not-allowed; }
        `;
      case 'success':
        return `
          color: var(--color-white);
          background-color: var(--color-success);
          border: none;
          &:hover { background-color: #218838; }
        `;
      case 'danger':
        return `
          color: var(--color-danger);
          background: none;
          border: 1px solid var(--color-danger);
          &:hover { background-color: var(--color-danger); color: white; }
        `;
      default:
        return `
          color: var(--color-gray-700);
          background-color: var(--color-white);
          border: 1px solid var(--color-gray-300);
          &:hover { background-color: var(--color-gray-100); }
        `;
    }
  }}
`;

const DesignerContainer = styled.div`
  flex: 1;
  display: flex;
  background-color: var(--color-gray-100);
  overflow: hidden;
  min-height: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: var(--color-gray-600);
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RunButton = styled.button<{ $isRunning?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
  font-weight: 500;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--color-white);
  background-color: #10b981;
  border: none;

  &:hover:not(:disabled) {
    background-color: #059669;
  }

  &:disabled {
    background-color: var(--color-gray-400);
    cursor: not-allowed;
  }

  svg {
    width: 16px;
    height: 16px;
    ${(props) => props.$isRunning && css`animation: ${spin} 1s linear infinite;`}
  }
`;

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const SpinnerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

export function WorkflowDesignerPage() {
  const { workflowId } = useParams<{ workflowId: string }>();
  const navigate = useNavigate();
  const isNewWorkflow = workflowId === 'new' || !workflowId;

  const {
    currentWorkflow,
    isLoading,
    fetchWorkflow,
    updateWorkflow,
    activateWorkflow,
    deactivateWorkflow,
    clearCurrentWorkflow,
    triggerWorkflow,
    executions,
    fetchExecutions,
  } = useWorkflowStore();

  const { loadFromDefinition, toDefinition, isDirty, resetDirty, reset } = useDesignerStore();

  const [workflowName, setWorkflowName] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [runError, setRunError] = useState<string | null>(null);
  const [showInfoSidebar, setShowInfoSidebar] = useState(false);

  useEffect(() => {
    if (!isNewWorkflow && workflowId) {
      fetchWorkflow(workflowId);
    }

    return () => {
      clearCurrentWorkflow();
      reset();
    };
  }, [workflowId, isNewWorkflow, fetchWorkflow, clearCurrentWorkflow, reset]);

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (currentWorkflow && isInitialLoad) {
      // Only load definition on initial load, not after save
      setWorkflowName(currentWorkflow.name);
      loadFromDefinition(currentWorkflow.definition as WorkflowDefinition);
      fetchExecutions(currentWorkflow.id);
      setIsInitialLoad(false);
    }
  }, [currentWorkflow, loadFromDefinition, fetchExecutions, isInitialLoad]);

  const handleSave = useCallback(async () => {
    if (!currentWorkflow) return;

    const definition = toDefinition();
    await updateWorkflow(currentWorkflow.id, {
      name: workflowName,
      definition,
    });
    resetDirty();
  }, [currentWorkflow, workflowName, toDefinition, updateWorkflow, resetDirty]);

  const handleActivate = useCallback(async () => {
    if (!currentWorkflow) return;

    // Save first if dirty
    if (isDirty) {
      await handleSave();
    }

    await activateWorkflow(currentWorkflow.id);
  }, [currentWorkflow, isDirty, handleSave, activateWorkflow]);

  const handleDeactivate = useCallback(async () => {
    if (!currentWorkflow) return;
    await deactivateWorkflow(currentWorkflow.id);
  }, [currentWorkflow, deactivateWorkflow]);

  const handleBack = useCallback(() => {
    if (isDirty) {
      if (!window.confirm('Ungespeicherte Änderungen gehen verloren. Fortfahren?')) {
        return;
      }
    }
    navigate('/workflows');
  }, [isDirty, navigate]);

  const handleRun = useCallback(async () => {
    if (!currentWorkflow) return;

    if (isDirty) {
      await handleSave();
    }

    setIsRunning(true);
    setRunError(null);

    try {
      const execution = await triggerWorkflow(currentWorkflow.id);
      console.log('Workflow execution started:', execution);

      const stored = localStorage.getItem('auth-storage');
      let token = '';
      if (stored) {
        try {
          const { state } = JSON.parse(stored);
          token = state?.accessToken || '';
        } catch {}
      }

      const ctrl = new AbortController();

      await fetchEventSource(
        `/api/workflows/${currentWorkflow.id}/executions/${execution.id}/stream`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: ctrl.signal,
          onmessage(event) {
            if (!event.data) return;
            
            try {
              const updatedExecution = typeof event.data === 'string' 
                ? JSON.parse(event.data) 
                : event.data;

              if (updatedExecution.context?.nodeResults) {
                const currentNodes = useDesignerStore.getState().nodes;
                const updatedNodes = currentNodes.map((node) => {
                  const result = updatedExecution.context.nodeResults[node.id];
                  if (result) {
                    return {
                      ...node,
                      data: {
                        ...node.data,
                        executionState: {
                          status: result.status === 'completed' ? 'success' : result.status === 'failed' ? 'error' : 'running',
                          output: result.output,
                          error: result.error,
                        },
                      },
                    };
                  }
                  return node;
                });
                
                useDesignerStore.setState({ nodes: updatedNodes });
              }

              if (updatedExecution.status === 'completed') {
                ctrl.abort();
                setIsRunning(false);
                setTimeout(() => alert('Workflow erfolgreich ausgeführt!'), 500);
              } else if (updatedExecution.status === 'failed') {
                ctrl.abort();
                setIsRunning(false);
                setTimeout(() => alert(`Workflow fehlgeschlagen: ${updatedExecution.error || 'Unbekannter Fehler'}`), 500);
              }
            } catch (parseError) {
              console.error('Failed to parse SSE message:', event.data, parseError);
            }
          },
          onerror(err) {
            console.error('SSE error:', err);
            ctrl.abort();
            setIsRunning(false);
            setRunError('Verbindung zum Server verloren');
            throw err;
          },
        }
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      setRunError(errorMessage);
      alert(`Fehler beim Ausführen: ${errorMessage}`);
      setIsRunning(false);
    }
  }, [currentWorkflow, isDirty, handleSave, triggerWorkflow]);

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingContainer>Workflow wird geladen...</LoadingContainer>
      </PageContainer>
    );
  }

  if (!currentWorkflow && !isNewWorkflow) {
    return (
      <PageContainer>
        <LoadingContainer>Workflow nicht gefunden</LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Toolbar>
        <ToolbarLeft>
          <BackButton onClick={handleBack}>← Zurück</BackButton>
          <WorkflowName onClick={() => setShowInfoSidebar(true)}>
            {workflowName || 'Unbenannter Workflow'}
          </WorkflowName>
          {currentWorkflow && <StatusBadge $status={currentWorkflow.status}>{currentWorkflow.status}</StatusBadge>}
          {isDirty && <DirtyIndicator>• Ungespeichert</DirtyIndicator>}
        </ToolbarLeft>

        <ToolbarRight>
          <Button onClick={() => navigate(`/workflows/${currentWorkflow?.id}/executions`)} disabled={!currentWorkflow}>
            Historie
          </Button>
          <RunButton
            onClick={handleRun}
            disabled={isRunning || !currentWorkflow}
            $isRunning={isRunning}
            title="Workflow ausführen"
          >
            {isRunning ? <SpinnerIcon /> : <PlayIcon />}
            {isRunning ? 'Läuft...' : 'Ausführen'}
          </RunButton>
          {currentWorkflow?.status === 'active' ? (
            <Button onClick={handleDeactivate}>Deaktivieren</Button>
          ) : (
            <Button $variant="success" onClick={handleActivate}>
              Aktivieren
            </Button>
          )}
          <Button $variant="primary" onClick={handleSave} disabled={!isDirty}>
            Speichern
          </Button>
        </ToolbarRight>
      </Toolbar>

      <DesignerContainer>
        <WorkflowDesigner />
      </DesignerContainer>

      {showInfoSidebar && currentWorkflow && (
        <WorkflowInfoSidebar
          workflow={currentWorkflow}
          executions={executions}
          onClose={() => setShowInfoSidebar(false)}
          onUpdate={async (updates) => {
            await updateWorkflow(currentWorkflow.id, updates);
            if (updates.name) setWorkflowName(updates.name);
          }}
        />
      )}
    </PageContainer>
  );
}
