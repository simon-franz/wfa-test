// @ts-check
import getId from '../../../getId.js';
import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/onboarding/OnboardingControllerAdapter/OnboardingControllerAdapter.types').OnboardingControllerBackendDefinition } OnboardingControllerBackendDefinition
 * @param { OnboardingControllerBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { OnboardingControllerBackendDefinition }
 */
export function onboardingControllerFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('OnboardingController', { ...props }, sfId, dataGuideId);
}

/**
 * @param { Partial<import('../../../../src/adapters/application/onboarding/OnboardingControllerAdapter/Item/OnboardingControllerItemAdapter.types').OnboardingControllerItemBackendProps> } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { import('../../../../src/adapters/application/onboarding/OnboardingControllerAdapter/Item/OnboardingControllerItemAdapter.types').OnboardingControllerItemBackendDefinition }
 */
export function onboardingControllerItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return { sfId, props, dataGuideId };
}
