// @ts-check

import getId from '../../getId.js';

/**
 * @param  { Partial<import('../../../src/adapters/core/ServerStatusAdapter/ServerStatusAdapter.types').ServerStatusBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/ServerStatusAdapter/ServerStatusAdapter.types').ServerStatusBackendDefinition }
 */
export function serverStatusFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfComponent: 'ServerStatus',
    sfId,
    props: { ...props },
    dataGuideId,
  };
}
