import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { defaultText } from '../Text/TextDefaultProps';
import type { VerticalNavigationBackendProps } from '@hrworks/smartface/adapters/application/onboarding/VerticalNavigationAdapter/VerticalNavigationAdapter.types';

export const verticalNavigationDefaultProps: VerticalNavigationBackendProps = {
  preventNavigation: false,
  onBeforeNavigation: [addNotification()],
  onAfterNavigation: [addNotification()],
  activeItemSfId: '1',
  items: [
    {
      props: {
        navigationTitle: generateLoremWords(),
        componentChildren: [defaultText()],
      },
      sfId: '1',
    },
    {
      props: {
        navigationTitle: generateLoremWords(),
        componentChildren: [defaultText()],
      },
      sfId: getId(),
    },
    {
      props: {
        navigationTitle: generateLoremWords(),
        componentChildren: [defaultText()],
      },
      sfId: getId(),
    },
  ],
};
