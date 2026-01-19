import Textarea from '@hrworks/sui-core/Textarea';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { evaluateLabel } from '../../../adapters/shared/evaluateLabel';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { TextareaAdapterProps } from './TextareaAdapter.types';

export const TextareaAdapter = observer(
  ({
    id,
    value = '',
    'aria-label': ariaLabel,
    label,
    placeholder,
    name = MISSING_STRING,
    onValueChange,
    ...otherProps
  }: TextareaAdapterProps) => {
    const { applyEvents, applyUpdates } = useContext(SmartFaceContext);
    const { defaultSize } = useContext(DefaultValueContext);

    const _label = evaluateLabel({
      label,
      placeholder,
      ariaLabel,
    });

    const _onValueChange = (value: string) => {
      applyUpdates([
        {
          operation: 'write',
          targetSfId: id,
          path: 'props.value',
          value,
        },
      ]);
    };

    const onValueChangeFinished = onValueChange && (() => applyEvents(onValueChange));

    return (
      <Textarea
        id={id}
        value={value}
        aria-label={ariaLabel}
        label={_label}
        placeholder={placeholder}
        name={name}
        onValueChange={_onValueChange}
        onValueChangeFinished={onValueChangeFinished}
        size={defaultSize}
        {...otherProps}
      />
    );
  },
);
