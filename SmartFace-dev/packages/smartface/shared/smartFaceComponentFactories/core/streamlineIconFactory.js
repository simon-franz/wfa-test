// @ts-check

import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @param { Partial<import('../../../src/types/core/StreamlineIconType').StreamlineIconPropsType> } props
 * @param { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/types/core/StreamlineIconType').StreamlineIconBackendType }
 */
export function streamlineIconFactory(props = {}, sfId = getId(), dataGuideId) {
  return smartFaceComponentFactory(
    'StreamlineIcon',
    {
      name: 'car',
      ...props,
    },
    sfId,
    dataGuideId,
  );
}
