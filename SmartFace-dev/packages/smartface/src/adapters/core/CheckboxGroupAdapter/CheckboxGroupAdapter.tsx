import CheckboxGroup from '@hrworks/sui-core/CheckboxGroup';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { evaluateLabel } from '../../../adapters/shared/evaluateLabel';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { CheckboxGroupAdapterProps } from './CheckboxGroupAdapter.types';

export const CheckboxGroupAdapter = observer(
  ({
    id,
    name = MISSING_STRING,
    label,
    value = [],
    onValueChange,
    options = [],
    'aria-label': ariaLabel,
    ...otherProps
  }: CheckboxGroupAdapterProps) => {
    const { applyEvents, applyUpdates } = useContext(SmartFaceContext);
    const { defaultSize } = useContext(DefaultValueContext);

    const _label = evaluateLabel({
      label,
      ariaLabel,
    });

    const _options = options.map(({ sfId, label }) => ({
      id: sfId || MISSING_STRING,
      label: label || MISSING_STRING,
    }));

    const _onValueChange = (value: CheckboxGroupAdapterProps['value']): void => {
      applyUpdates([{ operation: 'write', targetSfId: id, path: 'props.value', value }]);
      onValueChange && applyEvents(onValueChange);
    };

    return (
      <CheckboxGroup
        id={id}
        name={name}
        value={value}
        aria-label={ariaLabel}
        label={_label}
        options={_options}
        onValueChange={_onValueChange}
        size={defaultSize}
        {...otherProps}
      />
    );
  },
);
