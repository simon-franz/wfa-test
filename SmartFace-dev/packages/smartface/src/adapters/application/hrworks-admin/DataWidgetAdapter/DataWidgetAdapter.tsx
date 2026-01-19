import { DataWidget } from '@hrworks/sui-extension/DataWidget';
import { observer } from 'mobx-react';

import { ComponentMapper, mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import type { DataWidgetAdapterProps } from './DataWidgetAdapter.types';

export const DataWidgetAdapter = observer(({ descriptionChildren, icon, ...otherProps }: DataWidgetAdapterProps) => {
  const _icon = icon && <ComponentMapper smartFaceComponent={icon} />;
  const children = mapSmartFaceComponentsToAdapters(descriptionChildren);

  return <DataWidget icon={_icon} children={children} {...otherProps} />;
});
