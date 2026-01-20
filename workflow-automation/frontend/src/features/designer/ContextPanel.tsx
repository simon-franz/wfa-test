import { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useDesignerStore } from '../../stores/designer.store';

const Overlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.$visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Panel = styled.div`
  width: 600px;
  max-height: 80vh;
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-200);
`;

const Title = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0;
`;

const CloseButton = styled.button`
  padding: var(--spacing-1);
  color: var(--color-gray-500);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-xl);

  &:hover {
    color: var(--color-gray-700);
  }
`;

const SearchBox = styled.input`
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  margin: var(--spacing-3) var(--spacing-4);
  width: calc(100% - var(--spacing-8));

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-4);
`;

const NodeSection = styled.div`
  margin-bottom: var(--spacing-4);
`;

const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2);
  background-color: var(--color-gray-50);
  border-radius: var(--radius-md);
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

const NodeIcon = styled.div<{ $color: string }>`
  width: 20px;
  height: 20px;
  border-radius: var(--radius-sm);
  background-color: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-xs);
  font-weight: bold;
`;

const NodeName = styled.span`
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-gray-900);
  flex: 1;
`;

const ExpandIcon = styled.span<{ $expanded: boolean }>`
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
  transform: ${(props) => (props.$expanded ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: transform 0.2s;
`;

const FieldList = styled.div`
  margin-top: var(--spacing-2);
  margin-left: var(--spacing-6);
`;

const Field = styled.div`
  padding: var(--spacing-2);
  font-size: var(--font-size-sm);
  font-family: monospace;
  color: var(--color-gray-700);
  cursor: pointer;
  border-radius: var(--radius-sm);

  &:hover {
    background-color: var(--color-primary-50);
    color: var(--color-primary);
  }
`;

const FieldPath = styled.span`
  color: var(--color-primary);
  font-weight: 500;
`;

const FieldType = styled.span`
  color: var(--color-gray-500);
  margin-left: var(--spacing-2);
  font-size: var(--font-size-xs);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-8);
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
`;

interface ContextPanelProps {
  visible: boolean;
  onClose: () => void;
  onSelectVariable: (variable: string) => void;
  currentNodeId?: string;
}

interface NodeOutput {
  nodeId: string;
  nodeName: string;
  nodeType: string;
  fields: Array<{ path: string; type: string; value?: unknown }>;
}

// Helper to extract fields from an object recursively
function extractFieldsFromObject(
  obj: unknown,
  prefix = '',
  maxDepth = 3,
  currentDepth = 0,
): Array<{ path: string; type: string }> {
  if (currentDepth >= maxDepth) return [];

  const fields: Array<{ path: string; type: string }> = [];

  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    Object.entries(obj).forEach(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      const type = Array.isArray(value) ? 'array' : typeof value;

      fields.push({ path, type });

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        fields.push(...extractFieldsFromObject(value, path, maxDepth, currentDepth + 1));
      }
    });
  }

  return fields;
}

export function ContextPanel({ visible, onClose, onSelectVariable, currentNodeId }: ContextPanelProps) {
  const { nodes, edges } = useDesignerStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // Get all nodes that come before the current node in the workflow
  const availableNodes = useMemo(() => {
    if (!currentNodeId) return [];

    const visited = new Set<string>();
    const queue: string[] = [];

    // Find all nodes that can reach the current node
    const findPredecessors = (nodeId: string) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      const incomingEdges = edges.filter((e) => e.target === nodeId);
      incomingEdges.forEach((edge) => {
        queue.push(edge.source);
        findPredecessors(edge.source);
      });
    };

    findPredecessors(currentNodeId);

    return nodes.filter((n) => visited.has(n.id));
  }, [nodes, edges, currentNodeId]);

  // Extract fields from node config (mock data for now)
  const getNodeOutputs = useCallback((node: typeof nodes[0]): NodeOutput => {
    const { nodeType, label, executionState } = node.data;

    // If node has been executed, use actual output
    if (executionState?.output) {
      const output = executionState.output as Record<string, unknown>;
      const fields = extractFieldsFromObject(output, 'output');
      return {
        nodeId: node.id,
        nodeName: label,
        nodeType,
        fields,
      };
    }

    // Otherwise show expected output structure (mock)
    let fields: Array<{ path: string; type: string }> = [];

    switch (nodeType) {
      case 'manual-trigger':
        fields = [
          { path: 'input', type: 'object' },
          { path: 'timestamp', type: 'string' },
        ];
        break;
      case 'scheduled-trigger':
        fields = [
          { path: 'timestamp', type: 'string' },
          { path: 'cronExpression', type: 'string' },
        ];
        break;
      case 'http-request':
        fields = [
          { path: 'output.status', type: 'number' },
          { path: 'output.body', type: 'object' },
          { path: 'output.headers', type: 'object' },
        ];
        break;
      case 'hrworks':
        fields = [
          { path: 'output.data', type: 'object' },
          { path: 'output.status', type: 'number' },
        ];
        break;
      case 'condition':
        fields = [
          { path: 'output.result', type: 'boolean' },
          { path: 'output.branch', type: 'string' },
        ];
        break;
      case 'delay':
        fields = [
          { path: 'output.duration', type: 'number' },
          { path: 'output.completedAt', type: 'string' },
        ];
        break;
      default:
        fields = [{ path: 'output', type: 'object' }];
    }

    return {
      nodeId: node.id,
      nodeName: label,
      nodeType,
      fields,
    };
  }, []);

  const nodeOutputs = useMemo(
    () => availableNodes.map(getNodeOutputs),
    [availableNodes, getNodeOutputs],
  );

  // Filter by search term
  const filteredOutputs = useMemo(() => {
    if (!searchTerm) return nodeOutputs;

    return nodeOutputs
      .map((output) => ({
        ...output,
        fields: output.fields.filter(
          (field) =>
            field.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
            output.nodeName.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      }))
      .filter((output) => output.fields.length > 0);
  }, [nodeOutputs, searchTerm]);

  const toggleNode = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  const handleSelectField = useCallback(
    (nodeName: string, fieldPath: string) => {
      const variable = `{{${nodeName}.${fieldPath}}}`;
      onSelectVariable(variable);
      onClose();
    },
    [onSelectVariable, onClose],
  );

  const getNodeColor = (nodeType: string) => {
    switch (nodeType) {
      case 'manual-trigger':
      case 'scheduled-trigger':
        return '#10b981';
      case 'http-request':
        return '#3b82f6';
      case 'hrworks':
        return '#ff6b35';
      case 'condition':
        return '#f59e0b';
      case 'delay':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  return (
    <Overlay $visible={visible} onClick={onClose}>
      <Panel onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Kontext einfügen</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <SearchBox
          type="text"
          placeholder="Suche nach Feldern..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Content>
          {filteredOutputs.length === 0 ? (
            <EmptyState>
              {availableNodes.length === 0
                ? 'Keine vorherigen Knoten verfügbar'
                : 'Keine Felder gefunden'}
            </EmptyState>
          ) : (
            filteredOutputs.map((output) => (
              <NodeSection key={output.nodeId}>
                <NodeHeader onClick={() => toggleNode(output.nodeId)}>
                  <NodeIcon $color={getNodeColor(output.nodeType)}>
                    {output.nodeType.charAt(0).toUpperCase()}
                  </NodeIcon>
                  <NodeName>{output.nodeName}</NodeName>
                  <ExpandIcon $expanded={expandedNodes.has(output.nodeId)}>▶</ExpandIcon>
                </NodeHeader>

                {expandedNodes.has(output.nodeId) && (
                  <FieldList>
                    {output.fields.map((field) => (
                      <Field
                        key={field.path}
                        onClick={() => handleSelectField(output.nodeName, field.path)}
                      >
                        <FieldPath>{field.path}</FieldPath>
                        <FieldType>{field.type}</FieldType>
                      </Field>
                    ))}
                  </FieldList>
                )}
              </NodeSection>
            ))
          )}
        </Content>
      </Panel>
    </Overlay>
  );
}
