import { useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import { mapElementProps } from '../../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';

// By declaring this instead of importing it we can specify @xyflow/react as dev-dependency
enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

import type { WorkflowGraphNodeBackendDefinition } from './WorkflowGraphNodesAdapter.types';
import type { WorkflowGraphNodeProps } from '@hrworks/sui-extension/WorkflowGraph/RawNode/RawNode.types';

export const WorkflowGraphNodesAdapter = (nodes: WorkflowGraphNodeBackendDefinition[]): WorkflowGraphNodeProps[] => {
  const { applyEvents } = useContext(SmartFaceContext);

  return nodes.map((node) => {
    const { componentChildren, onClick, ...otherProps } = mapElementProps(node);
    const _onClick = onClick && (() => applyEvents(onClick));
    const children = mapSmartFaceComponentsToAdapters(componentChildren);

    return {
      children,
      type: 'rawNode' as const,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      onClick: _onClick,
      ...otherProps,
    };
  });
};
