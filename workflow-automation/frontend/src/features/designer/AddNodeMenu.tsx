import { useState } from 'react';
import styled from 'styled-components';

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

const Menu = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1001;
`;

const CategoryItem = styled.div`
  padding: var(--spacing-3) var(--spacing-4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--color-gray-900);
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-gray-50);
  }

  &:first-child {
    border-radius: var(--radius-md) var(--radius-md) 0 0;
  }
`;

const CategoryIcon = styled.span`
  margin-right: var(--spacing-2);
  font-size: 16px;
`;

const Arrow = styled.span`
  color: var(--color-gray-400);
`;

const NodeItem = styled.div`
  padding: var(--spacing-3) var(--spacing-4);
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm);
  color: var(--color-gray-900);
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
`;

const NodeIcon = styled.span`
  margin-right: var(--spacing-2);
  font-size: 16px;
`;

const BackButton = styled.div`
  padding: var(--spacing-3) var(--spacing-4);
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  border-bottom: 1px solid var(--color-gray-200);
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-gray-50);
  }
`;

interface NodeType {
  type: string;
  label: string;
  icon: string;
  category: string;
}

interface AddNodeMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAddNode: (nodeType: string) => void;
}

const NODE_TYPES: NodeType[] = [
  // Triggers
  { type: 'manual-trigger', label: 'Manueller Trigger', icon: '▶️', category: 'trigger' },
  { type: 'scheduled-trigger', label: 'Geplanter Trigger', icon: '⏰', category: 'trigger' },
  { type: 'webhook-trigger', label: 'Webhook Trigger', icon: '🔗', category: 'trigger' },
  
  // Actions
  { type: 'hrworks', label: 'HR WORKS', icon: '👤', category: 'action' },
  { type: 'http-request', label: 'HTTP Request', icon: '🌐', category: 'action' },
  { type: 'email', label: 'E-Mail senden', icon: '📧', category: 'action' },
  { type: 'delay', label: 'Verzögerung', icon: '⏱️', category: 'action' },
  
  // Logic
  { type: 'condition', label: 'Bedingung', icon: '🔀', category: 'logic' },
  { type: 'data-transform', label: 'Daten-Transformation', icon: '🔄', category: 'logic' },
  { type: 'loop', label: 'Schleife', icon: '🔁', category: 'logic' },
  { type: 'switch', label: 'Switch', icon: '🔀', category: 'logic' },
];

const CATEGORIES = [
  { id: 'trigger', label: 'Trigger', icon: '⚡' },
  { id: 'action', label: 'Aktionen', icon: '⚙️' },
  { id: 'logic', label: 'Logik', icon: '🧠' },
];

export function AddNodeMenu({ x, y, onClose, onAddNode }: AddNodeMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleNodeClick = (nodeType: string) => {
    onAddNode(nodeType);
    onClose();
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  const filteredNodes = selectedCategory
    ? NODE_TYPES.filter((node) => node.category === selectedCategory)
    : [];

  return (
    <>
      <MenuOverlay onClick={onClose} />
      <Menu $x={x} $y={y}>
        {!selectedCategory ? (
          // Category selection
          <>
            {CATEGORIES.map((category) => (
              <CategoryItem key={category.id} onClick={() => handleCategoryClick(category.id)}>
                <div>
                  <CategoryIcon>{category.icon}</CategoryIcon>
                  {category.label}
                </div>
                <Arrow>›</Arrow>
              </CategoryItem>
            ))}
          </>
        ) : (
          // Node selection
          <>
            <BackButton onClick={handleBack}>← Zurück</BackButton>
            {filteredNodes.map((node) => (
              <NodeItem key={node.type} onClick={() => handleNodeClick(node.type)}>
                <NodeIcon>{node.icon}</NodeIcon>
                {node.label}
              </NodeItem>
            ))}
          </>
        )}
      </Menu>
    </>
  );
}
