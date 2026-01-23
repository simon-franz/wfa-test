import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useWorkflowStore } from '../stores/workflow.store';
import { useNotificationStore } from '../stores/notification.store';
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

const TableContainer = styled.div`
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: var(--color-gray-50);
  border-bottom: 1px solid var(--color-gray-200);
`;

const Th = styled.th`
  padding: var(--spacing-3) var(--spacing-4);
  text-align: left;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-gray-700);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid var(--color-gray-200);
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-gray-50);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: var(--spacing-4);
  font-size: var(--font-size-sm);
  color: var(--color-gray-900);
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-3);
  font-size: var(--font-size-xs);
  font-weight: 500;
  border-radius: var(--radius-full);
  ${(props) => {
    switch (props.$status) {
      case 'active':
        return `
          color: #065f46;
          background-color: #d1fae5;
        `;
      case 'inactive':
        return `
          color: #92400e;
          background-color: #fef3c7;
        `;
      default:
        return `
          color: #374151;
          background-color: #e5e7eb;
        `;
    }
  }}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-2);
`;

const ActionButton = styled.button`
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-xs);
  font-weight: 500;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  background-color: var(--color-white);
  color: var(--color-gray-700);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--color-gray-50);
    border-color: var(--color-gray-400);
  }
`;

const DeleteButton = styled(ActionButton)`
  color: var(--color-danger);
  border-color: var(--color-danger);

  &:hover {
    background-color: #fce8e8;
  }
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
  const { addNotification } = useNotificationStore();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  const handleWorkflowClick = (workflow: Workflow) => {
    navigate(`/workflows/${workflow.id}`);
  };

  const handleDeleteWorkflow = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Möchten Sie diesen Workflow wirklich löschen?')) {
      await deleteWorkflow(id);
    }
  };

  const handleTriggerWorkflow = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await triggerWorkflow(id);
    addNotification('success', 'Workflow wurde gestartet');
  };

  const handleCreateSuccess = (workflow: Workflow) => {
    setShowCreateModal(false);
    navigate(`/workflows/${workflow.id}`);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Beschreibung</Th>
                <Th>Status</Th>
                <Th>Aktualisiert</Th>
                <Th>Aktionen</Th>
              </Tr>
            </Thead>
            <Tbody>
              {workflows.map((workflow) => (
                <Tr key={workflow.id} onClick={() => handleWorkflowClick(workflow)}>
                  <Td>{workflow.name}</Td>
                  <Td>{workflow.description || '-'}</Td>
                  <Td>
                    <StatusBadge $status={workflow.status}>
                      {workflow.status === 'active' ? 'Aktiv' : workflow.status === 'inactive' ? 'Inaktiv' : 'Entwurf'}
                    </StatusBadge>
                  </Td>
                  <Td>{formatDate(workflow.updatedAt)}</Td>
                  <Td>
                    <ActionButtons>
                      <ActionButton onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/workflows/${workflow.id}/executions`);
                      }}>
                        Historie
                      </ActionButton>
                      <ActionButton onClick={(e) => handleTriggerWorkflow(e, workflow.id)}>
                        Ausführen
                      </ActionButton>
                      <DeleteButton onClick={(e) => handleDeleteWorkflow(e, workflow.id)}>
                        Löschen
                      </DeleteButton>
                    </ActionButtons>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
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
