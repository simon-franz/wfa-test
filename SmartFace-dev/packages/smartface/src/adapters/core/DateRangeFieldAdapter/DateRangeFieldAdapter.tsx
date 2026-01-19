import DateRangeField from '@hrworks/sui-core/DateRangeField';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { type KeyboardEvent, useContext } from 'react';

import { evaluateLabel } from '../../../adapters/shared/evaluateLabel';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { Update } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type { DateRangeFieldAdapterProps } from './DateRangeFieldAdapter.types';

export const DateRangeFieldAdapter = observer(
  ({
    name = MISSING_STRING,
    label,
    placeholder,
    'aria-label': ariaLabel,
    id,
    onValueChange,
    validationState,
    validationMessage,
    onEnterKeyDown,
    ...otherProps
  }: DateRangeFieldAdapterProps) => {
    const { applyUpdates, queueBackendPatches, applyEvents } = useContext(SmartFaceContext);
    const { defaultSize } = useContext(DefaultValueContext);

    const _label = evaluateLabel({
      label,
      placeholder,
      ariaLabel,
    });

    const _onValueChange = (value?: DateRangeFieldAdapterProps['value']) => {
      applyUpdates([
        {
          operation: 'write',
          path: 'props.value',
          value,
          targetSfId: id,
        },
      ]);
    };

    const onValueChangeFinished = () => {
      if (validationMessage || validationState) {
        const updates: Update[] = [
          { targetSfId: id, operation: 'delete', path: 'props.validationMessage' },
          { targetSfId: id, operation: 'delete', path: 'props.validationState' },
        ];
        applyUpdates(updates);
        queueBackendPatches(id, updates);
      }
      onValueChange && queueMicrotask(() => applyEvents(onValueChange));
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (onEnterKeyDown && event.key === 'Enter' && !event.repeat) {
        event.stopPropagation();
        applyEvents(onEnterKeyDown);
      }
    };

    return (
      <DateRangeField
        name={name}
        label={_label}
        placeholder={placeholder}
        aria-label={ariaLabel}
        id={id}
        validationState={validationState}
        validationMessage={validationMessage}
        onValueChange={_onValueChange}
        onValueChangeFinished={onValueChangeFinished}
        onKeyDown={onKeyDown}
        size={defaultSize}
        {...otherProps}
      />
    );
  },
);
