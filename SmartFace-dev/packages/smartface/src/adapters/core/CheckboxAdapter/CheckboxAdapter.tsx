import Checkbox from '@hrworks/sui-core/Checkbox';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { evaluateLabel } from '../../../adapters/shared/evaluateLabel';
import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { CheckboxAdapterProps } from './CheckboxAdapter.types';

export const CheckboxAdapter = observer(
  ({
    id,
    onValueChange,
    label,
    name = MISSING_STRING,
    labelChildren,
    'aria-label': ariaLabel,
    ...otherProps
  }: CheckboxAdapterProps) => {
    const { applyEvents, applyUpdates } = useContext(SmartFaceContext);
    const { defaultSize } = useContext(DefaultValueContext);

    const evaluatedLabel = evaluateLabel({
      label,
      ariaLabel,
    });

    const _labelChildren = mapSmartFaceComponentsToAdapters(labelChildren);

    const _onValueChange = (checked: boolean) => {
      applyUpdates([{ targetSfId: id, operation: 'write', path: 'props.checked', value: checked }]);
      onValueChange && applyEvents(onValueChange);
    };

    return (
      <Checkbox
        name={name}
        aria-label={ariaLabel}
        label={evaluatedLabel}
        labelChildren={_labelChildren}
        onValueChange={_onValueChange}
        size={defaultSize}
        {...otherProps}
      />
    );
  },
);
