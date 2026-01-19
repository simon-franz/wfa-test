import { TableHeader } from '@hrworks/sui-core/Table/TableHeader/TableHeader';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../../../main/components/ComponentMapper/mapSmartFaceComponentsToAdapters';
import type { TableHeaderAdapterProps } from './TableHeaderAdapter.types';

export const TableHeaderAdapter = observer(({ componentChildren, ...otherProps }: TableHeaderAdapterProps) => {
  const children = mapSmartFaceComponentsToAdapters(componentChildren);

  return <TableHeader children={children} {...otherProps} />;
});
