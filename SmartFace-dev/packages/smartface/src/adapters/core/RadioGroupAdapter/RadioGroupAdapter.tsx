import { Radio, RadioGroup } from '@hrworks/sui-core/RadioGroup';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { evaluateLabel } from '../../../adapters/shared/evaluateLabel';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { RadioGroupAdapterProps } from './RadioGroupAdapter.types';

export const RadioGroupAdapter = observer(
  ({
    id,
    name = MISSING_STRING,
    label,
    onValueChange,
    options = [],
    'aria-label': ariaLabel,
    ...otherProps
  }: RadioGroupAdapterProps) => {
    const { applyEvents, applyUpdates } = useContext(SmartFaceContext);
    const { defaultSize } = useContext(DefaultValueContext);

    const _label = evaluateLabel({
      label,
      ariaLabel,
    });

    const _onValueChange = (value: string) => {
      applyUpdates([{ operation: 'write', targetSfId: id, path: 'props.value', value }]);
      onValueChange && applyEvents(onValueChange);
    };

    return (
      <RadioGroup
        id={id}
        name={name}
        label={_label}
        onValueChange={_onValueChange}
        aria-label={ariaLabel}
        size={defaultSize}
        {...otherProps}
      >
        {options.length &&
          options.map(({ label, sfId, ...otherProps }) => (
            <Radio key={sfId} id={sfId} value={sfId} {...otherProps}>
              {label || MISSING_STRING}
            </Radio>
          ))}
      </RadioGroup>
    );
  },
);
