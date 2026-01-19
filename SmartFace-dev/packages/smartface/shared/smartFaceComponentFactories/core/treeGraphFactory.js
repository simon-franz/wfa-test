// @ts-check

import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/TreeGraphAdapter/TreeGraphAdapter.types.js').TreeGraphBackendDefinition } TreeGraphBackendDefinition
 * @param { TreeGraphBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { TreeGraphBackendDefinition }
 */
export function treeGraphFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('TreeGraph', { ...props }, sfId, dataGuideId);
}

/**
 * @param  { Partial<import('../../../src/adapters/extension/TreeGraphAdapter/TreeGraphAdapter.types.js').TreeGraphEntryBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/extension/TreeGraphAdapter/TreeGraphAdapter.types.js').TreeGraphEntryBackendDefinition }
 */
export function treeGraphEntryFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: {
      ...props,
    },
    dataGuideId,
  };
}
