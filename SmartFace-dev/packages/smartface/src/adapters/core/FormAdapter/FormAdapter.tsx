import Form from '@hrworks/sui-core/Form';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import type { FormAdapterProps } from './FormAdapter.types';

export const FormAdapter = observer(({ componentChildren, ...otherProps }: FormAdapterProps) => {
  const children = mapSmartFaceComponentsToAdapters(componentChildren);

  return <Form children={children} {...otherProps} />;
});
