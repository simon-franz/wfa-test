// @ts-check
import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';
/**
 * @param { import('../../../src/adapters/extension/CarouselAdapter/CarouselAdapter.types.js').CarouselBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { import('../../../src/adapters/extension/CarouselAdapter/CarouselAdapter.types.js').CarouselBackendDefinition }
 */
export function carouselFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory(
    'Carousel',
    {
      ...props,
    },
    sfId,
    dataGuideId,
  );
}

/**
 * @param { Partial<import('../../../src/adapters/extension/CarouselAdapter/CarouselItem/CarouselItemAdapter.types').CarouselItemBackendProps> } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { import('../../../src/adapters/extension/CarouselAdapter/CarouselItem/CarouselItemAdapter.types').CarouselItemBackendDefinition }
 */
export function carouselItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: {
      ...props,
    },
    dataGuideId,
  };
}
