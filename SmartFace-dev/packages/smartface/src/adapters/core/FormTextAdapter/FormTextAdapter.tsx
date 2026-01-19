import FormText from '@hrworks/sui-core/FormText';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { FormTextAdapterProps } from './FormTextAdapter.types';

export const FormTextAdapter = observer(
  ({ label = MISSING_STRING, value = MISSING_STRING, labelChildren, ...otherProps }: FormTextAdapterProps) => {
    const { defaultSize } = useContext(DefaultValueContext);

    const _labelChildren = mapSmartFaceComponentsToAdapters(labelChildren);

    return <FormText label={label} value={value} labelChildren={_labelChildren} size={defaultSize} {...otherProps} />;
  },
);
