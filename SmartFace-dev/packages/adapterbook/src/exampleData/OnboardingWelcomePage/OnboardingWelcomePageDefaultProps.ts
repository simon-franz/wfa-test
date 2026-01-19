import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { defaultButton } from '../Button/ButtonDefaultProps';
import { defaultText } from '../Text/TextDefaultProps';
import type { OnboardingWelcomePageBackendProps } from '@hrworks/smartface/adapters/application/onboarding/OnboardingWelcomePageAdapter/OnboardingWelcomePageAdapter.types';

export const onboardingWelcomePageDefaultProps: OnboardingWelcomePageBackendProps = {
  heading: generateLoremWords(),
  bodyChildren: [defaultButton()],
  footerChildren: [defaultText()],
};
