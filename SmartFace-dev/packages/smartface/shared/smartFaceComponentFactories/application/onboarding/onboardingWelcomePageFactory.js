// @ts-check

import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/onboarding/OnboardingWelcomePageAdapter/OnboardingWelcomePageAdapter.types').OnboardingWelcomePageBackendDefinition } OnboardingWelcomePageBackendDefinition
 * @param { OnboardingWelcomePageBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { OnboardingWelcomePageBackendDefinition }
 */
export function onboardingWelcomePageFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('OnboardingWelcomePage', { ...props }, sfId, dataGuideId);
}
