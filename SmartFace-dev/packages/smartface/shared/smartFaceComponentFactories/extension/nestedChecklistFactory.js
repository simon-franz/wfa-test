// @ts-check
import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/extension/NestedChecklistAdapter/NestedChecklistAdapter.types').NestedChecklistBackendDefinition } NestedChecklistBackendDefinition
 * @param { NestedChecklistBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { NestedChecklistBackendDefinition }
 */
export function nestedChecklistFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('NestedChecklist', { ...props }, sfId, dataGuideId);
}

/**
 * @param  { Partial<import('../../../src/adapters/extension/NestedChecklistAdapter/NestedChecklistEntry/NestedChecklistEntryAdapter.types').NestedChecklistEntryBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/extension/NestedChecklistAdapter/NestedChecklistEntry/NestedChecklistEntryAdapter.types').NestedChecklistEntryBackendDefinition }
 */
export function nestedChecklistEntryFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: {
      ...props,
    },
    dataGuideId,
  };
}
