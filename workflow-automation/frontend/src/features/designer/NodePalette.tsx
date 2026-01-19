import { useCallback } from 'react';
import styled from 'styled-components';
import { useDesignerStore, type WorkflowNode } from '../../stores/designer.store';

const PaletteContainer = styled.div`
  width: 240px;
  background-color: var(--color-white);
  border-right: 1px solid var(--color-gray-200);
  display: flex;
  flex-direction: column;
`;

const PaletteHeader = styled.div`
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-200);
`;

const PaletteTitle = styled.h3`
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-gray-700);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

const NodeList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-3);
`;

const NodeCategory = styled.div`
  margin-bottom: var(--spacing-4);
`;

const CategoryTitle = styled.h4`
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--color-gray-500);
  text-transform: uppercase;
  margin: 0 0 var(--spacing-2) 0;
  padding: 0 var(--spacing-2);
`;

const NodeItem = styled.button<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  padding: var(--spacing-3);
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  cursor: grab;
  transition: all var(--transition-fast);
  text-align: left;
  margin-bottom: var(--spacing-2);

  &:hover {
    border-color: ${(props) => props.$color};
    background-color: ${(props) => props.$color}10;
  }

  &:active {
    cursor: grabbing;
  }
`;

const NodeIcon = styled.div<{ $color: string }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$color}20;
  color: ${(props) => props.$color};
  border-radius: var(--radius-md);
  font-size: var(--font-size-lg);
`;

const NodeInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const NodeName = styled.div`
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-gray-900);
`;

const NodeDescription = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface NodeDefinition {
  type: string;
  flowType: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  defaultConfig: Record<string, unknown>;
}

const nodeDefinitions: { category: string; nodes: NodeDefinition[] }[] = [
  {
    category: 'Trigger',
    nodes: [
      {
        type: 'manual-trigger',
        flowType: 'triggerNode',
        name: 'Manuell',
        description: 'Manuell starten',
        icon: '▶',
        color: '#0066cc',
        defaultConfig: { description: '' },
      },
      {
        type: 'scheduled-trigger',
        flowType: 'triggerNode',
        name: 'Zeitplan',
        description: 'Nach Zeitplan starten',
        icon: '⏱',
        color: '#0066cc',
        defaultConfig: { cronExpression: '0 9 * * 1-5', timezone: 'Europe/Berlin' },
      },
    ],
  },
  {
    category: 'Aktionen',
    nodes: [
      {
        type: 'http-request',
        flowType: 'actionNode',
        name: 'HTTP Anfrage',
        description: 'API aufrufen',
        icon: '🌐',
        color: '#6c757d',
        defaultConfig: { method: 'GET', url: '', headers: {}, timeout: 30000 },
      },
      {
        type: 'delay',
        flowType: 'actionNode',
        name: 'Verzögerung',
        description: 'Warten',
        icon: '⏳',
        color: '#6c757d',
        defaultConfig: { duration: 5, unit: 'seconds' },
      },
    ],
  },
  {
    category: 'Logik',
    nodes: [
      {
        type: 'condition',
        flowType: 'conditionNode',
        name: 'Bedingung',
        description: 'If/Else Verzweigung',
        icon: '◇',
        color: '#ffc107',
        defaultConfig: { expression: 'true' },
      },
    ],
  },
];

let nodeCounter = 0;

export function NodePalette() {
  const { addNode, nodes } = useDesignerStore();

  const handleAddNode = useCallback(
    (def: NodeDefinition) => {
      // Calculate position based on existing nodes
      const lastNode = nodes[nodes.length - 1];
      const x = lastNode ? lastNode.position.x : 250;
      const y = lastNode ? lastNode.position.y + 120 : 150;

      const newNode: WorkflowNode = {
        id: `${def.type}-${++nodeCounter}`,
        type: def.flowType,
        position: { x, y },
        data: {
          label: def.name,
          nodeType: def.type,
          config: { ...def.defaultConfig },
        },
      };

      addNode(newNode);
    },
    [addNode, nodes],
  );

  return (
    <PaletteContainer>
      <PaletteHeader>
        <PaletteTitle>Komponenten</PaletteTitle>
      </PaletteHeader>

      <NodeList>
        {nodeDefinitions.map((category) => (
          <NodeCategory key={category.category}>
            <CategoryTitle>{category.category}</CategoryTitle>
            {category.nodes.map((node) => (
              <NodeItem
                key={node.type}
                $color={node.color}
                onClick={() => handleAddNode(node)}
              >
                <NodeIcon $color={node.color}>{node.icon}</NodeIcon>
                <NodeInfo>
                  <NodeName>{node.name}</NodeName>
                  <NodeDescription>{node.description}</NodeDescription>
                </NodeInfo>
              </NodeItem>
            ))}
          </NodeCategory>
        ))}
      </NodeList>
    </PaletteContainer>
  );
}
