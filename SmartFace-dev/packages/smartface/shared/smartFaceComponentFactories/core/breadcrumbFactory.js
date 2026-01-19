// @ts-check
import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/BreadcrumbAdapter/BreadcrumbAdapter.types.js').BreadcrumbBackendDefinition } BreadcrumbBackendDefinition
 * @param { BreadcrumbBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { BreadcrumbBackendDefinition }
 */
export function breadcrumbFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory(
    'Breadcrumb',
    {
      ...props,
    },
    sfId,
    dataGuideId,
  );
}

/**
 * @param { Partial<import('../../../src/adapters/core/BreadcrumbAdapter/Item/BreadcrumbItemAdapter.types.js').BreadcrumbItemBackendProps> } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/BreadcrumbAdapter/Item/BreadcrumbItemAdapter.types.js').BreadcrumbItemBackendDefinition }

 */
export function breadcrumbItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: {
      ...props,
    },
    dataGuideId,
  };
}
