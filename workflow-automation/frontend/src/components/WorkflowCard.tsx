import styled from 'styled-components';
import type { Workflow, WorkflowStatus } from 'shared/types';

interface WorkflowCardProps {
  workflow: Workflow;
  onClick: () => void;
  onDelete: () => void;
  onTrigger: () => void;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--spacing-5);
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--spacing-3);
`;

const WorkflowName = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0;
`;

const StatusBadge = styled.span<{ $status: WorkflowStatus }>`
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  font-weight: 500;
  border-radius: var(--radius-full);
  text-transform: uppercase;

  ${(props) => {
    switch (props.$status) {
      case 'active':
        return `
          color: var(--color-success);
          background-color: #e6f4ea;
        `;
      case 'draft':
        return `
          color: var(--color-warning);
          background-color: #fff8e6;
        `;
      case 'inactive':
        return `
          color: var(--color-gray-600);
          background-color: var(--color-gray-100);
        `;
      case 'archived':
        return `
          color: var(--color-gray-500);
          background-color: var(--color-gray-100);
        `;
      default:
        return '';
    }
  }}
`;

const Description = styled.p`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-4);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding-top: var(--spacing-3);
  border-top: 1px solid var(--color-gray-100);
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
`;

const CardActions = styled.div`
  display: flex;
  gap: var(--spacing-2);
  margin-top: var(--spacing-4);
`;

const ActionButton = styled.button<{ $variant?: 'primary' | 'danger' | 'default' }>`
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
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
          &:hover {
            background-color: var(--color-primary-hover);
          }
        `;
      case 'danger':
        return `
          color: var(--color-danger);
          background-color: transparent;
          border: 1px solid var(--color-danger);
          &:hover {
            background-color: var(--color-danger);
            color: var(--color-white);
          }
        `;
      default:
        return `
          color: var(--color-gray-700);
          background-color: transparent;
          border: 1px solid var(--color-gray-300);
          &:hover {
            background-color: var(--color-gray-100);
          }
        `;
    }
  }}
`;

const statusLabels: Record<WorkflowStatus, string> = {
  draft: 'Entwurf',
  active: 'Aktiv',
  inactive: 'Inaktiv',
  archived: 'Archiviert',
};

function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function WorkflowCard({ workflow, onClick, onDelete, onTrigger }: WorkflowCardProps) {
  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  const nodeCount = workflow.definition?.nodes?.length || 0;

  return (
    <Card onClick={onClick}>
      <CardHeader>
        <WorkflowName>{workflow.name}</WorkflowName>
        <StatusBadge $status={workflow.status}>{statusLabels[workflow.status]}</StatusBadge>
      </CardHeader>

      <Description>{workflow.description || 'Keine Beschreibung'}</Description>

      <CardMeta>
        <MetaItem>
          {nodeCount} {nodeCount === 1 ? 'Knoten' : 'Knoten'}
        </MetaItem>
        <MetaItem>v{workflow.version}</MetaItem>
        <MetaItem>Aktualisiert: {formatDate(workflow.updatedAt)}</MetaItem>
      </CardMeta>

      <CardActions>
        <ActionButton onClick={(e) => handleActionClick(e, onClick)}>Bearbeiten</ActionButton>
        {workflow.status === 'active' && (
          <ActionButton $variant="primary" onClick={(e) => handleActionClick(e, onTrigger)}>
            Ausführen
          </ActionButton>
        )}
        <ActionButton $variant="danger" onClick={(e) => handleActionClick(e, onDelete)}>
          Löschen
        </ActionButton>
      </CardActions>
    </Card>
  );
}
