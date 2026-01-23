import { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useDesignerStore } from '../../stores/designer.store';

const Overlay = styled.div<{ $visible: boolean; $top?: number }>`
  position: fixed;
  top: ${(props) => {
    const top = props.$top || 60;
    const maxTop = window.innerHeight - 520; // 500px height + 20px margin
    return Math.min(Math.max(top, 60), maxTop);
  }}px;
  right: 340px;
  width: 350px;
  max-height: 500px;
  background-color: var(--color-gray-900);
  display: ${(props) => (props.$visible ? 'flex' : 'none')};
  flex-direction: column;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-700);
`;

const Panel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-3);
  border-bottom: 1px solid var(--color-gray-700);
  flex-shrink: 0;
`;

const Title = styled.h3`
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-gray-100);
  margin: 0;
`;

const CloseButton = styled.button`
  padding: var(--spacing-1);
  color: var(--color-gray-400);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-lg);

  &:hover {
    color: var(--color-gray-200);
  }
`;

const SearchBox = styled.input`
  width: calc(100% - var(--spacing-6));
  padding: var(--spacing-2);
  font-size: var(--font-size-xs);
  border: 1px solid var(--color-gray-700);
  border-radius: var(--radius-sm);
  margin: var(--spacing-2) var(--spacing-3);
  background-color: var(--color-gray-800);
  color: var(--color-gray-100);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  &::placeholder {
    color: var(--color-gray-500);
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-2) var(--spacing-3);
  min-height: 0;
`;

const NodeSection = styled.div`
  margin-bottom: var(--spacing-2);
`;

const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2);
  background-color: var(--color-gray-800);
  border-radius: var(--radius-sm);
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: var(--color-gray-700);
  }
`;

const NodeIcon = styled.div<{ $color: string }>`
  width: 16px;
  height: 16px;
  border-radius: var(--radius-sm);
  background-color: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: bold;
  flex-shrink: 0;
`;

const NodeName = styled.span`
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--color-gray-100);
  flex: 1;
`;

const NodeExpandIcon = styled.span<{ $expanded: boolean }>`
  font-size: 10px;
  color: var(--color-gray-500);
  transform: ${(props) => (props.$expanded ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: transform 0.2s;
`;

const FieldList = styled.div`
  margin-top: var(--spacing-1);
  margin-left: var(--spacing-4);
`;

const Field = styled.div<{ $indent?: number }>`
  padding: var(--spacing-1) var(--spacing-2);
  padding-left: ${(props) => (props.$indent || 0) * 12 + 8}px;
  font-size: 11px;
  font-family: monospace;
  color: var(--color-gray-300);
  cursor: pointer;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-1);

  &:hover {
    background-color: var(--color-gray-800);
    color: var(--color-primary);
  }
`;

const ExpandableField = styled(Field)`
  cursor: pointer;
  user-select: none;
`;

const ExpandIcon = styled.span<{ $expanded: boolean }>`
  font-size: 8px;
  color: var(--color-gray-500);
  transform: ${(props) => (props.$expanded ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: transform 0.2s;
  width: 10px;
  display: inline-block;
  flex-shrink: 0;
`;

const FieldPath = styled.span`
  color: var(--color-gray-100);
  font-weight: 500;
  flex: 1;
  min-width: 0;
`;

const FieldValue = styled.span`
  color: var(--color-gray-500);
  font-size: 10px;
  margin-left: var(--spacing-1);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 0;
`;

const FieldType = styled.span`
  color: var(--color-gray-600);
  font-size: 10px;
  margin-left: var(--spacing-1);
  flex-shrink: 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-6);
  color: var(--color-gray-500);
  font-size: var(--font-size-xs);
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
  nodePrefix?: string;
}

function TreeNodeComponent({ node, nodeName, indent, onSelect, expandedPaths, onToggle, nodePrefix = '' }: TreeNodeComponentProps) {
  const hasChildren = node.children && node.children.length > 0;
  const fullPath = nodePrefix ? `${nodePrefix}:${node.path}` : node.path;
  const isExpanded = expandedPaths.has(fullPath);

  const handleClick = (e: React.MouseEvent) => {
    // Allow selecting both leaf nodes AND parent nodes (arrays/objects)
    if (e.shiftKey || !hasChildren) {
      // Shift+Click or leaf node → select
      onSelect(node.path);
    } else {
      // Regular click on parent → toggle
      onToggle(node.path);
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
          <span style={{ width: '10px' }} />
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
          nodePrefix={nodePrefix}
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
  position?: { top: number };
}

interface NodeOutput {
  nodeId: string;
  nodeName: string;
  nodeType: string;
  tree?: TreeNode;
}

export function ContextPanel({ visible, onClose, onSelectVariable, currentNodeId, position }: ContextPanelProps) {
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

  // Add context scopes as special nodes
  const contextScopes = useMemo(() => {
    const scopes: NodeOutput[] = [
      {
        nodeId: '__global__',
        nodeName: 'global',
        nodeType: 'context',
        tree: {
          path: 'global',
          key: 'global',
          type: 'object',
          children: [
            { path: 'global.currentDate', key: 'currentDate', type: 'string', value: '2026-01-23' },
            { path: 'global.currentTime', key: 'currentTime', type: 'string', value: '13:40:00' },
            { path: 'global.currentDateTime', key: 'currentDateTime', type: 'string', value: '2026-01-23T13:40:00' },
            { path: 'global.weekday', key: 'weekday', type: 'string', value: 'Freitag' },
          ],
        },
      },
      {
        nodeId: '__workflow__',
        nodeName: 'workflow',
        nodeType: 'context',
        tree: {
          path: 'workflow',
          key: 'workflow',
          type: 'object',
          children: [
            { path: 'workflow.name', key: 'name', type: 'string', value: 'Workflow Name' },
            { path: 'workflow.description', key: 'description', type: 'string', value: 'Workflow Beschreibung' },
          ],
        },
      },
      {
        nodeId: '__execution__',
        nodeName: 'execution',
        nodeType: 'context',
        tree: {
          path: 'execution',
          key: 'execution',
          type: 'object',
          children: [
            { path: 'execution.variables', key: 'variables', type: 'object', value: {} },
          ],
        },
      },
    ];
    return scopes;
  }, []);

  const allOutputs = useMemo(() => [...contextScopes, ...nodeOutputs], [contextScopes, nodeOutputs]);

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

  const normalizeToCamelCase = useCallback((label: string): string => {
    const words = label.split(/[^a-zA-Z0-9]+/).filter(Boolean);
    if (words.length === 0) return '';
    return words.map((word, index) => {
      if (index === 0) return word.charAt(0).toLowerCase() + word.slice(1);
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
  }, []);

  const handleSelectField = useCallback(
    (nodeName: string, fieldPath: string) => {
      // For context scopes, use the full path directly
      if (nodeName === 'global' || nodeName === 'workflow' || nodeName === 'execution') {
        const variable = `{{${fieldPath}}}`;
        onSelectVariable(variable);
      } else {
        const camelCaseName = normalizeToCamelCase(nodeName);
        const variable = `{{${camelCaseName}.${fieldPath}}}`;
        onSelectVariable(variable);
      }
      onClose();
    },
    [onSelectVariable, onClose, normalizeToCamelCase],
  );

  const getNodeColor = (nodeType: string) => {
    switch (nodeType) {
      case 'context':
        return '#a855f7';
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
    <Overlay $visible={visible} $top={position?.top}>
      <Panel>
        <Header>
          <Title>Kontext einfügen</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <SearchBox
          type="text"
          placeholder="Suche..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Content>
          {allOutputs.length === 0 ? (
            <EmptyState>Keine vorherigen Knoten</EmptyState>
          ) : (
            allOutputs.map((output) => (
              <NodeSection key={output.nodeId}>
                <NodeHeader onClick={() => toggleNode(output.nodeId)}>
                  <NodeIcon $color={getNodeColor(output.nodeType)}>
                    {output.nodeType === 'context' ? '⚙' : output.nodeType.charAt(0).toUpperCase()}
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
                      onToggle={(path) => togglePath(`${output.nodeId}:${path}`)}
                      nodePrefix={output.nodeId}
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
