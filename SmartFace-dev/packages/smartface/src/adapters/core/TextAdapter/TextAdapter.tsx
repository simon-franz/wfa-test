import Text from '@hrworks/sui-core/Text';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { TextAdapterProps } from './TextAdapter.types';

export const TextAdapter = observer(({ text = MISSING_STRING, ...otherProps }: TextAdapterProps) => {
  const { defaultSize } = useContext(DefaultValueContext);

  return <Text children={text} fontSize={defaultSize} {...otherProps} />;
});
