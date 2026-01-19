import getId from '@hrworks/sui-shared/functions/getId';

import { defaultButton } from '../Button/ButtonDefaultProps';
import type { GridBackendProps } from '@hrworks/smartface/adapters/core/GridAdapter/GridAdapter.types';

export const gridDefaultProps: GridBackendProps = {
  items: [
    {
      props: {
        componentChildren: [defaultButton({ fullWidth: true })],
      },
      sfId: getId(),
    },
    {
      props: {
        size: 6,
        componentChildren: [defaultButton({ fullWidth: true })],
      },
      sfId: getId(),
    },
  ],
  gap: 'medium',
  columnGap: 'large',
  rowGap: 'small',
  fullHeight: false,
};
