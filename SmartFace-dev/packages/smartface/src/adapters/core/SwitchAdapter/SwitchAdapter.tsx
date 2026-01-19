import Switch from '@hrworks/sui-core/Switch';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { type ChangeEvent, useContext } from 'react';

import { evaluateLabel } from '../../../adapters/shared/evaluateLabel';
import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { SwitchAdapterProps } from './SwitchAdapter.types';

export const SwitchAdapter = observer(
  ({
    id,
    onValueChange,
    label,
    labelChildren,
    'aria-label': ariaLabel,
    name = MISSING_STRING,
    checked = false,
    ...otherProps
  }: SwitchAdapterProps) => {
    const { applyEvents, applyUpdates } = useContext(SmartFaceContext);
    const _labelChlldren = mapSmartFaceComponentsToAdapters(labelChildren);
    const _label = evaluateLabel({
      label,
      ariaLabel,
    });
    const { defaultSize } = useContext(DefaultValueContext);

    const _onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
      applyUpdates([{ targetSfId: id, operation: 'write', path: 'props.checked', value: event.target.checked }]);
      onValueChange && applyEvents(onValueChange);
    };

    return (
      <Switch
        id={id}
        aria-label={ariaLabel}
        label={_label}
        name={name}
        onChange={_onValueChange}
        labelChildren={_labelChlldren}
        size={defaultSize}
        checked={checked}
        {...otherProps}
      />
    );
  },
);
