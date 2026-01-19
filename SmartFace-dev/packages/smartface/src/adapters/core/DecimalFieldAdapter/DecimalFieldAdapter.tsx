import DecimalField from '@hrworks/sui-core/DecimalField';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import useTranslateInputProps from '../../../adapters/shared/useTranslateInputProps';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { DecimalFieldAdapterProps } from './DecimalFieldAdapter.types';

export const DecimalFieldAdapter = observer((props: DecimalFieldAdapterProps) => {
  const { defaultSize } = useContext(DefaultValueContext);

  return <DecimalField size={defaultSize} {...useTranslateInputProps(props)} />;
});
