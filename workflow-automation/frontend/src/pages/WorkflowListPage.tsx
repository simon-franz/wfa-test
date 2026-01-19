import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useWorkflowStore } from '../stores/workflow.store';
import { WorkflowCard } from '../components/WorkflowCard';
import { CreateWorkflowModal } from '../components/CreateWorkflowModal';
import type { Workflow } from 'shared/types';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-6);
`;

const PageTitle = styled.h1`
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-gray-900);
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-5);
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-white);
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

const WorkflowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-5);
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-12);
  background-color: var(--color-white);
  border: 2px dashed var(--color-gray-300);
  border-radius: var(--radius-lg);
  text-align: center;
`;

const EmptyStateTitle = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: 500;
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-2);
`;

const EmptyStateText = styled.p`
  color: var(--color-gray-500);
  margin-bottom: var(--spacing-6);
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-12);
  color: var(--color-gray-600);
`;

const ErrorMessage = styled.div`
  padding: var(--spacing-4);
  color: var(--color-danger);
  background-color: #fce8e8;
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-6);
`;

export function WorkflowListPage() {
  const navigate = useNavigate();
  const { workflows, isLoading, error, fetchWorkflows, deleteWorkflow, triggerWorkflow } =
    useWorkflowStore();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  const handleWorkflowClick = (workflow: Workflow) => {
    navigate(`/workflows/${workflow.id}`);
  };

  const handleDeleteWorkflow = async (id: string) => {
    if (window.confirm('Möchten Sie diesen Workflow wirklich löschen?')) {
      await deleteWorkflow(id);
    }
  };

  const handleTriggerWorkflow = async (id: string) => {
    await triggerWorkflow(id);
    alert('Workflow wurde gestartet');
  };

  const handleCreateSuccess = (workflow: Workflow) => {
    setShowCreateModal(false);
    navigate(`/workflows/${workflow.id}`);
  };

  if (isLoading && workflows.length === 0) {
    return (
      <PageContainer>
        <LoadingContainer>Workflows werden geladen...</LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Workflows</PageTitle>
        <CreateButton onClick={() => setShowCreateModal(true)}>+ Neuer Workflow</CreateButton>
      </PageHeader>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {workflows.length === 0 ? (
        <EmptyState>
          <EmptyStateTitle>Keine Workflows vorhanden</EmptyStateTitle>
          <EmptyStateText>
            Erstellen Sie Ihren ersten Workflow, um HR-Prozesse zu automatisieren.
          </EmptyStateText>
          <CreateButton onClick={() => setShowCreateModal(true)}>
            + Ersten Workflow erstellen
          </CreateButton>
        </EmptyState>
      ) : (
        <WorkflowGrid>
          {workflows.map((workflow) => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              onClick={() => handleWorkflowClick(workflow)}
              onDelete={() => handleDeleteWorkflow(workflow.id)}
              onTrigger={() => handleTriggerWorkflow(workflow.id)}
            />
          ))}
        </WorkflowGrid>
      )}

      {showCreateModal && (
        <CreateWorkflowModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
    </PageContainer>
  );
}
