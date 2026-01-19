// @ts-check

import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/onboarding/OnboardingLoginPageAdapter/OnboardingLoginPageAdapter.types').OnboardingLoginPageBackendDefinition } OnboardingLoginPageBackendDefinition
 * @param { OnboardingLoginPageBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { OnboardingLoginPageBackendDefinition }
 */
export function onboardingLoginPageFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('OnboardingLoginPage', { ...props }, sfId, dataGuideId);
}
