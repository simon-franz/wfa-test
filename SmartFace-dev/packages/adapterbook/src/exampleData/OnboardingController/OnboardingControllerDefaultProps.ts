import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { preset } from '../../utils/preset';
import { defaultText } from '../Text/TextDefaultProps';
import type { OnboardingControllerBackendProps } from '@hrworks/smartface/adapters/application/onboarding/OnboardingControllerAdapter/OnboardingControllerAdapter.types';

export const onboardingControllerDefaultProps: OnboardingControllerBackendProps = {
  activeItemSfId: '1',
  logo: preset.logoDefaultProps,
  onBeforeNavigation: [addNotification()],
  imprintUrl: 'OnboardingController',
  items: [
    {
      props: {
        title: generateLoremWords(),
        componentChildren: [defaultText()],
      },
      sfId: '1',
    },
    {
      props: {
        title: generateLoremWords(),
        componentChildren: [defaultText()],
      },
      sfId: getId(),
    },
    {
      props: {
        title: generateLoremWords(),
        componentChildren: [defaultText()],
      },
      sfId: getId(),
    },
  ],
};
