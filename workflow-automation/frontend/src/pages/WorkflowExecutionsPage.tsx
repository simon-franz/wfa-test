import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useWorkflowStore } from '../stores/workflow.store';
import { JsonViewer } from '../components/JsonViewer';
import type { WorkflowExecution } from 'shared/types';

const PageContainer = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  gap: var(--spacing-4);
`;

const Sidebar = styled.div`
  width: 350px;
  background-color: var(--color-white);
  border-right: 1px solid var(--color-gray-200);
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-200);
`;

const SidebarHeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-3);
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  background: none;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    color: var(--color-gray-900);
    background-color: var(--color-gray-100);
  }
`;

const SidebarTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-900);
`;

const ExecutionList = styled.div``;

const ExecutionItem = styled.div<{ $selected: boolean }>`
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-200);
  cursor: pointer;
  transition: background-color var(--transition-fast);
  background-color: ${(props) => (props.$selected ? 'var(--color-gray-50)' : 'transparent')};

  &:hover {
    background-color: var(--color-gray-50);
  }
`;

const ExecutionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-2);
`;

const ExecutionHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
`;

const ExecutionIndex = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 var(--spacing-1);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-gray-600);
  background-color: var(--color-gray-200);
  border-radius: var(--radius-full);
`;

const ExecutionDate = styled.div`
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-gray-900);
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  font-weight: 500;
  border-radius: var(--radius-full);
  ${(props) => {
    switch (props.$status) {
      case 'completed':
        return `
          color: #065f46;
          background-color: #d1fae5;
        `;
      case 'failed':
        return `
          color: #991b1b;
          background-color: #fee2e2;
        `;
      case 'running':
        return `
          color: #1e40af;
          background-color: #dbeafe;
        `;
      default:
        return `
          color: #374151;
          background-color: #e5e7eb;
        `;
    }
  }}
`;

const ExecutionId = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  font-family: monospace;
`;

const DetailPanel = styled.div`
  flex: 1;
  background-color: var(--color-white);
  overflow-y: auto;
  padding: var(--spacing-6);
`;

const DetailHeader = styled.div`
  margin-bottom: var(--spacing-6);
`;

const DetailTitle = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-2);
`;

const DetailMeta = styled.div`
  display: flex;
  gap: var(--spacing-4);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
`;

const NodeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
`;

const NodeCard = styled.div`
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  overflow: hidden;
`;

const NodeHeader = styled.div<{ $status?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-3) var(--spacing-4);
  background-color: var(--color-gray-50);
  cursor: pointer;
  user-select: none;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-gray-100);
  }

  ${(props) => {
    if (props.$status === 'completed') {
      return `border-left: 3px solid #10b981;`;
    } else if (props.$status === 'failed') {
      return `border-left: 3px solid #ef4444;`;
    } else if (props.$status === 'running') {
      return `border-left: 3px solid #3b82f6;`;
    }
    return '';
  }}
`;

const NodeHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
`;

const NodeIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 14px;
`;

const ExpandIcon = styled.span<{ $expanded: boolean }>`
  display: inline-block;
  transition: transform var(--transition-fast);
  transform: ${(props) => (props.$expanded ? 'rotate(90deg)' : 'rotate(0deg)')};
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
`;

const NodeTitle = styled.div`
  font-weight: 500;
  color: var(--color-gray-900);
`;

const NodeMeta = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
`;

const NodeTime = styled.span`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
`;

const NodeContent = styled.div`
  padding: var(--spacing-4);
`;

const Section = styled.div`
  margin-bottom: var(--spacing-4);

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.div`
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-2);
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-12);
  color: var(--color-gray-500);
`;

const ErrorText = styled.div`
  color: var(--color-danger);
  padding: var(--spacing-3);
  background-color: #fee2e2;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
`;

export function WorkflowExecutionsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { executions, fetchExecutions, fetchExecution } = useWorkflowStore();
  const [selectedExecution, setSelectedExecution] = useState<WorkflowExecution | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (id) {
      fetchExecutions(id);
    }
  }, [id, fetchExecutions]);

  const handleExecutionClick = async (execution: WorkflowExecution) => {
    if (id) {
      const fullExecution = await fetchExecution(id, execution.id);
      setSelectedExecution(fullExecution);
      setExpandedNodes(new Set());
    }
  };

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getNodeName = (nodeId: string) => {
    // Try to get name from workflow definition in execution context
    if (selectedExecution?.context?.workflowDefinition?.nodes) {
      const node = selectedExecution.context.workflowDefinition.nodes.find(
        (n: any) => n.id === nodeId
      );
      if (node?.name) return node.name;
    }

    // Fallback: Remove timestamp suffix and map to readable names
    const baseName = nodeId.replace(/-\d+$/, '');
    
    const nameMap: Record<string, string> = {
      'trigger': 'Trigger',
      'manual-trigger': 'Manueller Trigger',
      'scheduled-trigger': 'Geplanter Trigger',
      'condition': 'Bedingung',
      'hrworks': 'HR WORKS',
      'data-transform': 'Daten-Transformation',
      'http-request': 'HTTP Request',
      'delay': 'Verzögerung',
    };

    return nameMap[baseName] || baseName.charAt(0).toUpperCase() + baseName.slice(1);
  };

  const getNodeIcon = (nodeId: string) => {
    const baseName = nodeId.replace(/-\d+$/, '');
    
    const iconMap: Record<string, string> = {
      'trigger': '▶️',
      'manual-trigger': '▶️',
      'scheduled-trigger': '⏰',
      'condition': '🔀',
      'hrworks': '👤',
      'data-transform': '🔄',
      'http-request': '🌐',
      'delay': '⏱️',
    };

    return iconMap[baseName] || '⚙️';
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Erfolgreich';
      case 'failed':
        return 'Fehlgeschlagen';
      case 'running':
        return 'Läuft';
      case 'pending':
        return 'Ausstehend';
      default:
        return status;
    }
  };

  return (
    <PageContainer>
      <Sidebar>
        <SidebarHeader>
          <SidebarHeaderTop>
            <BackButton onClick={() => navigate(`/workflows/${id}`)}>
              ← Zurück
            </BackButton>
          </SidebarHeaderTop>
          <SidebarTitle>Ausführungen</SidebarTitle>
        </SidebarHeader>
        <ExecutionList>
          {executions.length === 0 ? (
            <EmptyState>Keine Ausführungen vorhanden</EmptyState>
          ) : (
            executions.map((execution, index) => (
              <ExecutionItem
                key={execution.id}
                $selected={selectedExecution?.id === execution.id}
                onClick={() => handleExecutionClick(execution)}
              >
                <ExecutionHeader>
                  <ExecutionHeaderLeft>
                    <ExecutionIndex>#{executions.length - index}</ExecutionIndex>
                    <ExecutionDate>{formatDate(execution.createdAt)}</ExecutionDate>
                  </ExecutionHeaderLeft>
                  <StatusBadge $status={execution.status}>
                    {getStatusLabel(execution.status)}
                  </StatusBadge>
                </ExecutionHeader>
                <ExecutionId>{execution.id}</ExecutionId>
              </ExecutionItem>
            ))
          )}
        </ExecutionList>
      </Sidebar>

      <DetailPanel>
        {!selectedExecution ? (
          <EmptyState>Wählen Sie eine Ausführung aus, um Details zu sehen</EmptyState>
        ) : (
          <>
            <DetailHeader>
              <DetailTitle>Ausführungsdetails</DetailTitle>
              <DetailMeta>
                <div>Status: {getStatusLabel(selectedExecution.status)}</div>
                <div>Gestartet: {formatDate(selectedExecution.createdAt)}</div>
                {selectedExecution.completedAt && (
                  <div>Beendet: {formatDate(selectedExecution.completedAt)}</div>
                )}
              </DetailMeta>
              {selectedExecution.error && (
                <ErrorText style={{ marginTop: 'var(--spacing-3)' }}>
                  Fehler: {selectedExecution.error}
                </ErrorText>
              )}
            </DetailHeader>

            <NodeList>
              {selectedExecution.context?.nodeResults &&
                Object.entries(selectedExecution.context.nodeResults).map(([nodeId, result]) => (
                  <NodeCard key={nodeId}>
                    <NodeHeader
                      $status={result.status}
                      onClick={() => toggleNode(nodeId)}
                    >
                      <NodeHeaderLeft>
                        <ExpandIcon $expanded={expandedNodes.has(nodeId)}>▶</ExpandIcon>
                        <NodeIcon>{getNodeIcon(nodeId)}</NodeIcon>
                        <NodeTitle>{getNodeName(nodeId)}</NodeTitle>
                      </NodeHeaderLeft>
                      <NodeMeta>
                        {result.startedAt && (
                          <NodeTime>{formatTime(result.startedAt)}</NodeTime>
                        )}
                        <StatusBadge $status={result.status}>
                          {getStatusLabel(result.status)}
                        </StatusBadge>
                      </NodeMeta>
                    </NodeHeader>
                    {expandedNodes.has(nodeId) && (
                      <NodeContent>
                        {result.output && (
                          <Section>
                            <SectionTitle>Output</SectionTitle>
                            <JsonViewer data={result.output} />
                          </Section>
                        )}
                        {result.error && (
                          <Section>
                            <SectionTitle>Fehler</SectionTitle>
                            <ErrorText>{result.error}</ErrorText>
                          </Section>
                        )}
                        <Section>
                          <SectionTitle>Metadaten</SectionTitle>
                          <JsonViewer
                            data={{
                              startedAt: result.startedAt,
                              completedAt: result.completedAt,
                              duration: result.duration ? `${result.duration}ms` : undefined,
                            }}
                          />
                        </Section>
                      </NodeContent>
                    )}
                  </NodeCard>
                ))}
            </NodeList>
          </>
        )}
      </DetailPanel>
    </PageContainer>
  );
}
