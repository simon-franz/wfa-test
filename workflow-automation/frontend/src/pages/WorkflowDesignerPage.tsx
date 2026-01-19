import { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useWorkflowStore } from '../stores/workflow.store';
import { useDesignerStore } from '../stores/designer.store';
import { WorkflowDesigner } from '../features/designer/WorkflowDesigner';
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

const WorkflowName = styled.input`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-900);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: var(--spacing-1) var(--spacing-2);
  transition: border-color var(--transition-fast);

  &:hover,
  &:focus {
    border-bottom-color: var(--color-primary);
    outline: none;
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
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: var(--color-gray-600);
`;

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
  } = useWorkflowStore();

  const { loadFromDefinition, toDefinition, isDirty, resetDirty, reset } = useDesignerStore();

  const [workflowName, setWorkflowName] = useState('');

  useEffect(() => {
    if (!isNewWorkflow && workflowId) {
      fetchWorkflow(workflowId);
    }

    return () => {
      clearCurrentWorkflow();
      reset();
    };
  }, [workflowId, isNewWorkflow, fetchWorkflow, clearCurrentWorkflow, reset]);

  useEffect(() => {
    if (currentWorkflow) {
      setWorkflowName(currentWorkflow.name);
      loadFromDefinition(currentWorkflow.definition as WorkflowDefinition);
    }
  }, [currentWorkflow, loadFromDefinition]);

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
          <WorkflowName
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            placeholder="Workflow-Name"
          />
          {currentWorkflow && <StatusBadge $status={currentWorkflow.status}>{currentWorkflow.status}</StatusBadge>}
          {isDirty && <DirtyIndicator>• Ungespeichert</DirtyIndicator>}
        </ToolbarLeft>

        <ToolbarRight>
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
    </PageContainer>
  );
}
