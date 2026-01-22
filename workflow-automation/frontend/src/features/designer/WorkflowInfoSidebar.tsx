import { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { Workflow } from 'shared/types';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 400px;
  background-color: var(--color-white);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: var(--spacing-5);
  border-bottom: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-gray-900);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  color: var(--color-gray-500);
  cursor: pointer;
  padding: var(--spacing-2);
  line-height: 1;

  &:hover {
    color: var(--color-gray-900);
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-5);
`;

const Section = styled.div`
  margin-bottom: var(--spacing-6);
`;

const SectionTitle = styled.h3`
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-gray-700);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-3);
`;

const Input = styled.input`
  width: 100%;
  padding: var(--spacing-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--color-gray-900);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: var(--spacing-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--color-gray-900);
  min-height: 80px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3);
`;

const StatCard = styled.div`
  padding: var(--spacing-3);
  background-color: var(--color-gray-50);
  border-radius: var(--radius-md);
`;

const StatLabel = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-1);
`;

const StatValue = styled.div`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-900);
`;

const VersionList = styled.div`
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  overflow: hidden;
`;

const VersionHeader = styled.div`
  padding: var(--spacing-3);
  background-color: var(--color-gray-50);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

const VersionToggle = styled.span<{ $expanded: boolean }>`
  transition: transform var(--transition-fast);
  transform: ${(props) => (props.$expanded ? 'rotate(90deg)' : 'rotate(0deg)')};
  color: var(--color-gray-500);
`;

const VersionItems = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const VersionItem = styled.div<{ $current?: boolean }>`
  padding: var(--spacing-3);
  border-top: 1px solid var(--color-gray-200);
  background-color: ${(props) => (props.$current ? 'var(--color-primary-light)' : 'transparent')};
`;

const VersionNumber = styled.div`
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-1);
`;

const VersionMeta = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
`;

interface WorkflowInfoSidebarProps {
  workflow: Workflow;
  executions: any[];
  onClose: () => void;
  onUpdate: (data: { name?: string; description?: string }) => void;
}

export function WorkflowInfoSidebar({
  workflow,
  executions,
  onClose,
  onUpdate,
}: WorkflowInfoSidebarProps) {
  const [name, setName] = useState(workflow.name);
  const [description, setDescription] = useState(workflow.description || '');
  const [versionsExpanded, setVersionsExpanded] = useState(false);

  useEffect(() => {
    setName(workflow.name);
    setDescription(workflow.description || '');
  }, [workflow]);

  const handleBlur = () => {
    if (name !== workflow.name || description !== workflow.description) {
      onUpdate({ name, description });
    }
  };

  const nodeCount = workflow.definition?.nodes?.length || 0;
  const executionCount = executions.length;

  return (
    <>
      <Overlay onClick={onClose} />
      <Sidebar>
        <Header>
          <Title>Workflow-Details</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <Content>
          <Section>
            <SectionTitle>Allgemein</SectionTitle>
            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleBlur}
                placeholder="Workflow-Name"
              />
            </div>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleBlur}
              placeholder="Beschreibung (optional)"
            />
          </Section>

          <Section>
            <SectionTitle>Statistiken</SectionTitle>
            <StatGrid>
              <StatCard>
                <StatLabel>Ausführungen</StatLabel>
                <StatValue>{executionCount}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Version</StatLabel>
                <StatValue>v{workflow.version}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Knoten</StatLabel>
                <StatValue>{nodeCount}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Status</StatLabel>
                <StatValue style={{ textTransform: 'capitalize' }}>{workflow.status}</StatValue>
              </StatCard>
            </StatGrid>
          </Section>

          <Section>
            <SectionTitle>Versionshistorie</SectionTitle>
            <VersionList>
              <VersionHeader onClick={() => setVersionsExpanded(!versionsExpanded)}>
                <div>
                  <VersionToggle $expanded={versionsExpanded}>▶</VersionToggle>
                  <span style={{ marginLeft: 'var(--spacing-2)' }}>
                    {workflow.version} {workflow.version === 1 ? 'Version' : 'Versionen'}
                  </span>
                </div>
              </VersionHeader>
              {versionsExpanded && (
                <VersionItems>
                  {Array.from({ length: workflow.version }, (_, i) => workflow.version - i).map(
                    (v) => (
                      <VersionItem key={v} $current={v === workflow.version}>
                        <VersionNumber>Version {v}</VersionNumber>
                        <VersionMeta>
                          {v === workflow.version && 'Aktuelle Version • '}
                          {nodeCount} Knoten
                        </VersionMeta>
                      </VersionItem>
                    )
                  )}
                </VersionItems>
              )}
            </VersionList>
          </Section>
        </Content>
      </Sidebar>
    </>
  );
}
