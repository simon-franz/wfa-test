import getId from '@hrworks/sui-shared/functions/getId';
import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';
import times from 'lodash/times';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import type { NestedChecklistBackendProps } from '@hrworks/smartface/adapters/extension/NestedChecklistAdapter/NestedChecklistAdapter.types';

const entries = () =>
  times(3, () => ({
    props: {
      label: generateLoremWords(),
      expanded: false,
      entries: [...times(3, () => ({ props: { label: generateLoremWords(), checked: false }, sfId: getId() }))],
    },
    sfId: getId(),
  }));

export const nestedChecklistDefaultProps: NestedChecklistBackendProps = {
  size: 'medium',
  entries: [
    {
      props: {
        label: generateLoremWords(),
        checked: false,
        expanded: true,
        entries: entries(),
      },
      sfId: getId(),
    },
    {
      props: {
        label: generateLoremWords(),
        checked: false,
        expanded: true,
        entries: entries(),
      },
      sfId: getId(),
    },
  ],
  onFetchEntries: [addNotification()],
};
