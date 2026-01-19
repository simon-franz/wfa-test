import { generateLoremParagraphs, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { defaultText } from '../Text/TextDefaultProps';
import type { OnboardingLoginPageBackendProps } from '@hrworks/smartface/adapters/application/onboarding/OnboardingLoginPageAdapter/OnboardingLoginPageAdapter.types';

export const onboardingLoginPageDefaultProps: OnboardingLoginPageBackendProps = {
  heading: generateLoremWords(),
  componentChildren: [defaultText({ text: generateLoremParagraphs() })],
};
