// @ts-check
import getId from '../../../getId.js';
import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/onboarding/VerticalNavigationAdapter/VerticalNavigationAdapter.types').VerticalNavigationBackendDefinition } VerticalNavigationBackendDefinition
 * @param { VerticalNavigationBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { VerticalNavigationBackendDefinition }
 */
export function verticalNavigationFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('VerticalNavigation', { ...props }, sfId, dataGuideId);
}

/**
 * @param { Partial<import('../../../../src/adapters/application/onboarding/VerticalNavigationAdapter/Item/VerticalNavigationItemAdapter.types').VerticalNavigationItemBackendProps> } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { import('../../../../src/adapters/application/onboarding/VerticalNavigationAdapter/Item/VerticalNavigationItemAdapter.types').VerticalNavigationItemBackendDefinition }
 */
export function verticalNavigationItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return { sfId, props, dataGuideId };
}
