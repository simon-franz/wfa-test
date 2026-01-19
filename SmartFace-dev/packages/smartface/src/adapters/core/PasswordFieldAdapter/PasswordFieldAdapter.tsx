import PasswordField from '@hrworks/sui-core/PasswordField';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import useTranslateInputProps from '../../../adapters/shared/useTranslateInputProps';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { PasswordFieldAdapterProps } from './PasswordFieldAdapter.types';

export const PasswordFieldAdapter = observer((props: PasswordFieldAdapterProps) => {
  const { defaultSize } = useContext(DefaultValueContext);

  return <PasswordField size={defaultSize} {...useTranslateInputProps(props)} />;
});
