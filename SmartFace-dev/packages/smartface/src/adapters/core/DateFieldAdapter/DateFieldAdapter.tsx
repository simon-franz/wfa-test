import DateField from '@hrworks/sui-core/DateField';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { type KeyboardEvent, useContext } from 'react';

import { evaluateLabel } from '../../../adapters/shared/evaluateLabel';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { Update } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type { DateFieldAdapterProps } from './DateFieldAdapter.types';

export const DateFieldAdapter = observer(
  ({
    id,
    name = MISSING_STRING,
    label,
    placeholder,
    'aria-label': ariaLabel,
    onEnterKeyDown,
    onValueChange,
    validationMessage,
    validationState,
    ...otherProps
  }: DateFieldAdapterProps) => {
    const { applyEvents, applyUpdates, queueBackendPatches } = useContext(SmartFaceContext);
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
      <DateField
        id={id}
        name={name}
        label={_label}
        placeholder={placeholder}
        aria-label={ariaLabel}
        validationMessage={validationMessage}
        validationState={validationState}
        onValueChange={_onValueChange}
        onValueChangeFinished={onValueChangeFinished}
        onKeyDown={onKeyDown}
        size={defaultSize}
        {...otherProps}
      />
    );
  },
);
