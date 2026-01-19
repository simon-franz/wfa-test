import TextField from '@hrworks/sui-core/TextField';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import useTranslateInputProps from '../../../adapters/shared/useTranslateInputProps';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { TextFieldAdapterProps } from './TextFieldAdapter.types';

export const TextFieldAdapter = observer(({ value = '', ...otherProps }: TextFieldAdapterProps) => {
  const { defaultSize } = useContext(DefaultValueContext);

  return <TextField size={defaultSize} {...useTranslateInputProps({ value, ...otherProps })} />;
});
