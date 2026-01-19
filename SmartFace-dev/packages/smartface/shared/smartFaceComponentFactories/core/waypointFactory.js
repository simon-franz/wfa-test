// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';
/**
 * @param  { Partial<import('../../../src/adapters/core/WaypointAdapter/WaypointAdapter.types').WaypointBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/WaypointAdapter/WaypointAdapter.types').WaypointBackendDefinition }
 */
export function waypointFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory(
    'Waypoint',
    {
      ...props,
    },
    sfId,
    dataGuideId,
  );
}
