import { useContext } from 'react';

import { mapElementProps } from '../../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import type { WorkflowGraphEdgeBackendDefinition } from './WorkflowGraphEdgesAdapter.types';
import type { WorkflowGraphEdgeProps } from '@hrworks/sui-extension/WorkflowGraph/WorkflowEdge/WorkflowEdge.types';

export const WorkflowGraphEdgesAdapter = (edges: WorkflowGraphEdgeBackendDefinition[]): WorkflowGraphEdgeProps[] => {
  const { applyEvents } = useContext(SmartFaceContext);

  return edges.map((edge) => {
    const {
      sourceNodeSfId = '',
      targetNodeSfId = '',
      markerEnd,
      markerStart,
      onClick,
      sourceHandle = 'forward',
      targetHandle = 'forward',
      color,
      label,
      ...otherProps
    } = mapElementProps(edge);

    const _onClick = onClick && (() => applyEvents(onClick));

    return {
      source: sourceNodeSfId,
      target: targetNodeSfId,
      sourceHandle,
      targetHandle,
      type: 'workflowEdge',
      data: {
        markerEnd,
        markerStart,
        color,
        label,
        onClick: _onClick,
      },
      ...otherProps,
    };
  });
};
