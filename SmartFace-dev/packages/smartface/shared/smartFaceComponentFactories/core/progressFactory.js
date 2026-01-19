// @ts-check

import getId from '../../getId.js';

/**
 * @param  { Partial<import('../../../src/adapters/core/ProgressAdapter/ProgressAdapter.types').ProgressBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/ProgressAdapter/ProgressAdapter.types').ProgressBackendDefinition }
 */
export function progressFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfComponent: 'Progress',
    sfId,
    props: { ...props },
    dataGuideId,
  };
}
