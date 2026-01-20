import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDesignerStore, type WorkflowNode } from '../../stores/designer.store';

const Menu = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-2);
  min-width: 180px;
  z-index: 1000;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  cursor: pointer;
  text-align: left;

  &:hover {
    background: var(--color-bg-tertiary);
  }
`;

const Divider = styled.div`
  height: 1px;
  background: var(--color-border);
  margin: var(--spacing-2) 0;
`;

const CategoryLabel = styled.div`
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  font-weight: 500;
`;

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  nodeId?: string;
  flowPosition?: { x: number; y: number };
}

const nodeDefinitions = [
  { type: 'manual-trigger', flowType: 'triggerNode', name: 'Manueller Trigger', icon: '▶', category: 'Trigger' },
  { type: 'scheduled-trigger', flowType: 'triggerNode', name: 'Zeitplan', icon: '⏱', category: 'Trigger' },
  { type: 'hrworks', flowType: 'hrworksNode', name: 'HR WORKS', icon: 'HR', category: 'Aktionen' },
  { type: 'http-request', flowType: 'actionNode', name: 'HTTP Anfrage', icon: '🌐', category: 'Aktionen' },
  { type: 'delay', flowType: 'actionNode', name: 'Verzögerung', icon: '⏳', category: 'Aktionen' },
  { type: 'condition', flowType: 'conditionNode', name: 'Bedingung', icon: '◇', category: 'Logik' },
];

export function ContextMenu({ x, y, onClose, nodeId, flowPosition }: ContextMenuProps) {
  const { addNode, deleteNode, nodes } = useDesignerStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleAddNode = useCallback(
    (def: typeof nodeDefinitions[0]) => {
      if (!flowPosition) return;

      // Check trigger limit
      if (def.flowType === 'triggerNode') {
        const existingTrigger = nodes.find((n) => n.type === 'triggerNode');
        if (existingTrigger) {
          if (!confirm('Es darf nur ein Trigger pro Workflow geben. Möchten Sie den bestehenden Trigger ersetzen?')) {
            onClose();
            return;
          }
          deleteNode(existingTrigger.id);
        }
      }

      const newNode: WorkflowNode = {
        id: `${def.type}-${Date.now()}`,
        type: def.flowType,
        position: flowPosition,
        data: {
          label: def.name,
          nodeType: def.type,
          config: {},
        },
      };

      addNode(newNode);
      onClose();
    },
    [flowPosition, nodes, addNode, deleteNode, onClose],
  );

  const handleDeleteNode = useCallback(() => {
    if (nodeId) {
      deleteNode(nodeId);
      onClose();
    }
  }, [nodeId, deleteNode, onClose]);

  if (nodeId) {
    return (
      <Menu ref={menuRef} $x={x} $y={y}>
        <MenuItem onClick={handleDeleteNode}>
          <span>🗑️</span>
          <span>Knoten löschen</span>
        </MenuItem>
      </Menu>
    );
  }

  const groupedNodes = nodeDefinitions.reduce((acc, node) => {
    if (!acc[node.category]) acc[node.category] = [];
    acc[node.category].push(node);
    return acc;
  }, {} as Record<string, typeof nodeDefinitions>);

  return (
    <Menu ref={menuRef} $x={x} $y={y}>
      {Object.entries(groupedNodes).map(([category, nodes], idx) => (
        <div key={category}>
          {idx > 0 && <Divider />}
          <CategoryLabel>{category}</CategoryLabel>
          {nodes.map((node) => (
            <MenuItem key={node.type} onClick={() => handleAddNode(node)}>
              <span>{node.icon}</span>
              <span>{node.name}</span>
            </MenuItem>
          ))}
        </div>
      ))}
    </Menu>
  );
}
