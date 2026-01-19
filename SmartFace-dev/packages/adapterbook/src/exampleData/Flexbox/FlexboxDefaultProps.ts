import getId from '@hrworks/sui-shared/functions/getId';
import times from 'lodash/times';

import { defaultButton } from '../Button/ButtonDefaultProps';
import type { FlexboxBackendProps } from '@hrworks/smartface/adapters/core/FlexboxAdapter/FlexboxAdapter.types';

export const flexboxDefaultProps: FlexboxBackendProps = {
  alignItems: 'center',
  columnGap: 'medium',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  fullHeight: true,
  justifyContent: 'center',
  gap: 'large',
  rowGap: 'small',
  items: times(4, () => ({
    props: {
      componentChildren: [defaultButton()],
    },
    sfId: getId(),
  })),
};
