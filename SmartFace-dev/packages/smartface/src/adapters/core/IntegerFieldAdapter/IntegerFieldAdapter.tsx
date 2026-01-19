import IntegerField from '@hrworks/sui-core/IntegerField';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import useTranslateInputProps from '../../../adapters/shared/useTranslateInputProps';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { IntegerFieldAdapterProps } from './IntegerFieldAdapter.types';

export const IntegerFieldAdapter = observer((props: IntegerFieldAdapterProps) => {
  const { defaultSize } = useContext(DefaultValueContext);

  return <IntegerField size={defaultSize} {...useTranslateInputProps(props)} />;
});
