// @ts-check

import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @param { import('../../../src/adapters/extension/FortuneWheelAdapter/FortuneWheelAdapter.types').FortuneWheelBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { import('../../../src/adapters/extension/FortuneWheelAdapter/FortuneWheelAdapter.types').FortuneWheelBackendDefinition }
 */
export function fortuneWheelFactory(props = {}, sfId = getId(), dataGuideId) {
  return smartFaceComponentFactory(
    'FortuneWheel',
    {
      ...props,
    },
    sfId,
    dataGuideId,
  );
}

/**
 * @param { Partial<import('../../../src/adapters/extension/FortuneWheelAdapter/Item/FortuneWheelitemAdapter.types').FortuneWheelItemBackendProps> } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { import('../../../src/adapters/extension/FortuneWheelAdapter/Item/FortuneWheelitemAdapter.types').FortuneWheelItemBackendDefinition }
 */
export function fortuneWheelItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: {
      ...props,
    },
    dataGuideId,
  };
}
