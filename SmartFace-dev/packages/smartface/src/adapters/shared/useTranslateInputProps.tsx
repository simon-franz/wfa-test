import { MISSING_STRING } from '@hrworks/sui-shared';
import { type KeyboardEvent, useCallback, useContext } from 'react';

import { SmartFaceContext } from '../../main/components/SmartFaceContext';
import type { InputBackendProps } from '../../types/shared/InputFieldBackendProps';
import { evaluateLabel } from './evaluateLabel';

type Params = Partial<InputBackendProps> & {
  id: string;
};

function useTranslateInputProps({
  id,
  value = '',
  name = MISSING_STRING,
  label,
  placeholder,
  'aria-label': ariaLabel,
  onEnterKeyDown,
  onValueChange,
  ...otherProps
}: Params) {
  const { applyUpdates, applyEvents } = useContext(SmartFaceContext);

  const evaluatedLabel = evaluateLabel({
    label,
    placeholder,
    ariaLabel,
  });

  const _onValueChange = useCallback(
    (value: unknown) => {
      applyUpdates([
        {
          operation: 'write',
          path: 'props.value',
          value,
          targetSfId: id,
        },
      ]);
    },
    [applyUpdates, id],
  );

  const onValueChangeFinished = useCallback(() => {
    onValueChange && applyEvents(onValueChange);
  }, [applyEvents, onValueChange]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (onEnterKeyDown && event.key === 'Enter' && !event.repeat) {
        event.stopPropagation();
        applyEvents(onEnterKeyDown);
      }
    },
    [applyEvents, onEnterKeyDown],
  );

  return {
    value,
    name,
    id,
    label: evaluatedLabel,
    placeholder,
    'aria-label': ariaLabel,
    onValueChange: _onValueChange,
    onValueChangeFinished,
    onKeyDown,
    ...otherProps,
  };
}

export default useTranslateInputProps;
