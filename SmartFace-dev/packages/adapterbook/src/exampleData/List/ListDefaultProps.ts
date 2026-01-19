import getId from '@hrworks/sui-shared/functions/getId';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import { defaultText } from '../Text/TextDefaultProps';
import type { ListBackendProps } from '@hrworks/smartface/adapters/core/ListAdapter/ListAdapter.types';

export const listDefaultProps: ListBackendProps = {
  items: [
    {
      props: {
        componentChildren: [defaultText()],
        href: '/List',
        target: '_blank',
      },
      sfId: getId(),
      sfComponentPart: 'ListItem',
    },
    {
      props: {
        componentChildren: [defaultText()],
        href: '/List',
        onClick: [addNotification()],
        target: '_self',
      },
      sfId: getId(),
      sfComponentPart: 'ListItem',
    },
  ],
  hoverable: true,
  lineStyle: 'solid',
};
