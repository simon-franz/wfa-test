import { SqwSearchField } from '@hrworks/sui-extension/SqwSearchField';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { DefaultValueContext } from '../../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import useTranslateInputProps from '../../../shared/useTranslateInputProps';
import type { SqwSearchFieldAdapterProps } from './SqwSearchFieldAdapter.types';

export const SqwSearchFieldAdapter = observer(({ onEnterKeyDown, ...otherProps }: SqwSearchFieldAdapterProps) => {
  const { applyEvents } = useContext(SmartFaceContext);
  const { defaultSize } = useContext(DefaultValueContext);
  const onSearchClick = onEnterKeyDown && (() => applyEvents(onEnterKeyDown));

  return (
    <SqwSearchField
      onSearchClick={onSearchClick}
      size={defaultSize}
      {...useTranslateInputProps({ onEnterKeyDown, ...otherProps })}
    />
  );
});
