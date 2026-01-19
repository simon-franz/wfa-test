// @ts-check

import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @param { Partial<import('../../../src/adapters/core/PageAdapter/PageAdapter.types').PageBackendProps> } props
 * @param { string } sfId
 * @param { string } [dataGuideId]
 * @returns { import('../../../src/adapters/core/PageAdapter/PageAdapter.types').PageBackendDefinition }
 */
function pageFactory(props = {}, sfId = getId(), dataGuideId) {
  return smartFaceComponentFactory(
    'Page',
    {
      ...props,
    },
    sfId,
    dataGuideId,
  );
}

/**
 * @param { Partial<import('../../../src/adapters/core/PageAdapter/Modal/ModalAdapter.types').ModalBackendProps> } props
 * @param { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/PageAdapter/Modal/ModalAdapter.types').ModalBackendDefinition }
 */
function modalFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfComponentPart: 'Modal',
    sfId,
    props: { title: 'Modal', ...props },
    dataGuideId,
  };
}

export { pageFactory, modalFactory };
