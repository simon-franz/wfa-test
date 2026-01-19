// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/MaterialDesignIconAdapter/MaterialDesignIconAdapter.types.js').MaterialDesignIconBackendDefinition } MaterialDesignIconBackendType
 * @param { MaterialDesignIconBackendType['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { MaterialDesignIconBackendType }
 */
export function materialDesignIconFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('MaterialDesignIcon', { name: 'bug_report', ...props }, sfId, dataGuideId);
}
