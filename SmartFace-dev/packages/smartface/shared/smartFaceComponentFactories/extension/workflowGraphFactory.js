// @ts-check

import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/WorkflowGraphAdapter/WorkflowGraphAdapter.types').WorkflowGraphBackendDefinition } WorkflowGraphBackendDefinition
 * @param { WorkflowGraphBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { WorkflowGraphBackendDefinition }
 */
export function workflowGraphFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('WorkflowGraph', { ...props }, sfId, dataGuideId);
}

/**
 * @param  { Partial<import('../../../src/adapters/extension/WorkflowGraphAdapter/Node/WorkflowGraphNodesAdapter.types').WorkflowGraphNodeBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/extension/WorkflowGraphAdapter/Node/WorkflowGraphNodesAdapter.types').WorkflowGraphNodeBackendDefinition }
 */
export function workflowGraphNodeFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: {
      ...props,
    },
    dataGuideId,
  };
}

/**
 * @param  { Partial<import('../../../src/adapters/extension/WorkflowGraphAdapter/Edge/WorkflowGraphEdgesAdapter.types').WorkflowGraphEdgeBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/extension/WorkflowGraphAdapter/Edge/WorkflowGraphEdgesAdapter.types').WorkflowGraphEdgeBackendDefinition }
 */
export function workflowGraphEdgeFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: {
      ...props,
    },
    dataGuideId,
  };
}
