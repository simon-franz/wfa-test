// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/BadgeAdapter/BadgeAdapter.types').BadgeBackendDefinition } BadgeBackendDefinition
 * @param { BadgeBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { BadgeBackendDefinition }
 */
export function badgeFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory(
    'Badge',
    {
      ...props,
    },
    sfId,
    dataGuideId,
  );
}
