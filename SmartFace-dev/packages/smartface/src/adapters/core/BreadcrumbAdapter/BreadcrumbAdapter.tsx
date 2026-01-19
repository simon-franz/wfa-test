import Breadcrumb from '@hrworks/sui-core/Breadcrumb';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { BreadcrumbAdapterProps } from './BreadcrumbAdapter.types';
import { BreadcrumbItemAdapter } from './Item/BreadcrumbItemAdapter';

export const BreadcrumbAdapter = observer(({ items, ...otherProps }: BreadcrumbAdapterProps) => {
  const { defaultSize } = useContext(DefaultValueContext);
  const children = mapSmartFaceComponentPartsToAdapter(BreadcrumbItemAdapter, items);

  return <Breadcrumb children={children} size={defaultSize} {...otherProps} />;
});
