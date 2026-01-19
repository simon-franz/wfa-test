import getId from '@hrworks/sui-shared/functions/getId';
import times from 'lodash/times';

import { defaultText } from '../Text/TextDefaultProps';
import type { TableBackendProps } from '@hrworks/smartface/adapters/core/TableAdapter/TableAdapter.types';

export const tableDefaultProps: TableBackendProps = {
  alternatingColors: true,
  fullHeight: false,
  hoverable: true,
  layout: 'auto',
  stickyHead: true,
  headerRows: [
    {
      props: {
        cells: times(3, () => ({
          props: {
            componentChildren: [defaultText()],
          },
          sfId: getId(),
        })),
      },
      sfId: 'headerRows',
    },
  ],
  columnDefinitions: [
    {
      columnIndex: 1,
      width: '150px',
      horizontalAlignment: 'end',
      verticalAlignment: 'top',
    },
    {
      columnIndex: 2,
      width: '150px',
      horizontalAlignment: 'end',
      verticalAlignment: 'top',
    },
    {
      columnIndex: 3,
      width: '150px',
      horizontalAlignment: 'center',
      verticalAlignment: 'baseline',
    },
  ],
  dataRows: times(3, () => ({
    props: {
      cells: times(3, () => ({
        props: {
          componentChildren: [defaultText()],
        },
        sfId: getId(),
      })),
    },
    sfId: getId(),
  })),
};
