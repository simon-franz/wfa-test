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

const NodeExpandIcon = styled.span<{ $expanded: boolean }>`
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
  transform: ${(props) => (props.$expanded ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: transform 0.2s;
`;

const FieldList = styled.div`
  margin-top: var(--spacing-2);
  margin-left: var(--spacing-6);
`;

const Field = styled.div<{ $indent?: number }>`
  padding: var(--spacing-2);
  padding-left: ${(props) => (props.$indent || 0) * 16 + 8}px;
  font-size: var(--font-size-sm);
  font-family: monospace;
  color: var(--color-gray-700);
  cursor: pointer;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);

  &:hover {
    background-color: var(--color-primary-50);
    color: var(--color-primary);
  }
`;

const ExpandableField = styled(Field)`
  cursor: pointer;
  user-select: none;
`;

const ExpandIcon = styled.span<{ $expanded: boolean }>`
  font-size: 10px;
  color: var(--color-gray-500);
  transform: ${(props) => (props.$expanded ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: transform 0.2s;
  width: 12px;
  display: inline-block;
`;

const FieldPath = styled.span`
  color: var(--color-primary);
  font-weight: 500;
  flex: 1;
`;

const FieldValue = styled.span`
  color: var(--color-gray-600);
  font-size: var(--font-size-xs);
  margin-left: var(--spacing-2);
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FieldType = styled.span`
  color: var(--color-gray-500);
  font-size: var(--font-size-xs);
  margin-left: var(--spacing-2);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-8);
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
`;

interface TreeNode {
  path: string;
  key: string;
  type: string;
  value?: unknown;
  children?: TreeNode[];
  isArray?: boolean;
  arrayLength?: number;
}

// Build tree structure from object
function buildTree(obj: unknown, prefix = '', key = 'output'): TreeNode | null {
  if (obj === null || obj === undefined) {
    return { path: prefix || key, key, type: 'null', value: obj };
  }

  if (Array.isArray(obj)) {
    const children = obj.map((item, index) => buildTree(item, `${prefix || key}[${index}]`, `[${index}]`)).filter(Boolean) as TreeNode[];
    return {
      path: prefix || key,
      key,
      type: 'array',
      isArray: true,
      arrayLength: obj.length,
      children,
    };
  }

  if (typeof obj === 'object') {
    const children = Object.entries(obj).map(([k, v]) => {
      const childPath = prefix ? `${prefix}.${k}` : k;
      return buildTree(v, childPath, k);
    }).filter(Boolean) as TreeNode[];

    return {
      path: prefix || key,
      key,
      type: 'object',
      children,
    };
  }

  return {
    path: prefix || key,
    key,
    type: typeof obj,
    value: obj,
  };
}

interface TreeNodeComponentProps {
  node: TreeNode;
  nodeName: string;
  indent: number;
  onSelect: (path: string) => void;
  expandedPaths: Set<string>;
  onToggle: (path: string) => void;
}

function TreeNodeComponent({ node, nodeName, indent, onSelect, expandedPaths, onToggle }: TreeNodeComponentProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedPaths.has(node.path);

  const handleClick = () => {
    if (hasChildren) {
      onToggle(node.path);
    } else {
      onSelect(node.path);
    }
  };

  const displayType = node.isArray ? `array[${node.arrayLength}]` : node.type;
  
  // Format value for display
  const displayValue = node.value !== undefined && !hasChildren
    ? typeof node.value === 'string'
      ? node.value
      : JSON.stringify(node.value)
    : undefined;

  return (
    <>
      {hasChildren ? (
        <ExpandableField $indent={indent} onClick={handleClick}>
          <ExpandIcon $expanded={isExpanded}>▶</ExpandIcon>
          <FieldPath>{node.key}</FieldPath>
          <FieldType>{displayType}</FieldType>
        </ExpandableField>
      ) : (
        <Field $indent={indent} onClick={handleClick}>
          <span style={{ width: '12px' }} />
          <FieldPath>{node.key}</FieldPath>
          {displayValue && <FieldValue>{displayValue}</FieldValue>}
          <FieldType>{displayType}</FieldType>
        </Field>
      )}
      {hasChildren && isExpanded && node.children?.map((child) => (
        <TreeNodeComponent
          key={child.path}
          node={child}
          nodeName={nodeName}
          indent={indent + 1}
          onSelect={onSelect}
          expandedPaths={expandedPaths}
          onToggle={onToggle}
        />
      ))}
    </>
  );
}

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
  tree?: TreeNode;
}

export function ContextPanel({ visible, onClose, onSelectVariable, currentNodeId }: ContextPanelProps) {
  const { nodes, edges } = useDesignerStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

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

  // Build tree from node output
  const getNodeOutputs = useCallback((node: typeof nodes[0]): NodeOutput => {
    const { nodeType, label, executionState } = node.data;

    // If node has been executed, use actual output
    if (executionState?.output) {
      const tree = buildTree(executionState.output);
      return {
        nodeId: node.id,
        nodeName: label,
        nodeType,
        tree: tree || undefined,
      };
    }

    return {
      nodeId: node.id,
      nodeName: label,
      nodeType,
    };
  }, []);

  const nodeOutputs = useMemo(
    () => availableNodes.map(getNodeOutputs),
    [availableNodes, getNodeOutputs],
  );

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

  const togglePath = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
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
          {nodeOutputs.length === 0 ? (
            <EmptyState>Keine vorherigen Knoten verfügbar</EmptyState>
          ) : (
            nodeOutputs.map((output) => (
              <NodeSection key={output.nodeId}>
                <NodeHeader onClick={() => toggleNode(output.nodeId)}>
                  <NodeIcon $color={getNodeColor(output.nodeType)}>
                    {output.nodeType.charAt(0).toUpperCase()}
                  </NodeIcon>
                  <NodeName>{output.nodeName}</NodeName>
                  <NodeExpandIcon $expanded={expandedNodes.has(output.nodeId)}>▶</NodeExpandIcon>
                </NodeHeader>

                {expandedNodes.has(output.nodeId) && output.tree && (
                  <FieldList>
                    <TreeNodeComponent
                      node={output.tree}
                      nodeName={output.nodeName}
                      indent={0}
                      onSelect={(path) => handleSelectField(output.nodeName, path)}
                      expandedPaths={expandedPaths}
                      onToggle={togglePath}
                    />
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
