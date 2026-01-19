import Select from '@hrworks/sui-core/Select';
import { MISSING_STRING } from '@hrworks/sui-shared';
import compact from 'lodash/compact';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { evaluateLabel } from '../../../adapters/shared/evaluateLabel';
import { ComponentMapper } from '../../../main/components/ComponentMapper';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { SelectAdapterProps, SelectOptionBackendProps } from './SelectAdapter.types';
import type { SelectOptionProps } from '@hrworks/sui-core/Select/Select.types';

export const SelectAdapter = observer(
  ({
    id,
    label,
    name = MISSING_STRING,
    'aria-label': ariaLabel,
    multiple,
    options = [],
    noneOption,
    value = multiple ? [] : '',
    onValueChange,
    ...otherProps
  }: SelectAdapterProps) => {
    const { applyEvents, applyUpdates } = useContext(SmartFaceContext);
    const { defaultSize } = useContext(DefaultValueContext);

    const _label = evaluateLabel({
      label,
      ariaLabel,
    });

    const _onValueChange = (value?: string | string[]) => {
      applyUpdates([{ operation: 'write', targetSfId: id, path: 'props.value', value }]);
      !multiple && onValueChange && queueMicrotask(() => applyEvents(onValueChange));
    };

    const onValueChangeFinished = () => {
      multiple && onValueChange && queueMicrotask(() => applyEvents(onValueChange));
    };

    const mapOptions = (options: SelectOptionBackendProps[]): SelectOptionProps[] => {
      return options.map((option: SelectOptionBackendProps) => {
        const { sfId, options: nestedOptions, media, ...otherProps } = option;

        const _media = media && <ComponentMapper smartFaceComponent={media} />;

        return {
          ...otherProps,
          value: sfId,
          media: _media,
          ...(nestedOptions ? { options: mapOptions(nestedOptions) } : {}),
        };
      });
    };

    const _noneOption = noneOption && {
      value: noneOption.sfId,
      label: noneOption.label,
      media: noneOption.media && <ComponentMapper smartFaceComponent={noneOption.media} />,
    };

    const _options = mapOptions(compact([noneOption, ...options]));

    const commonProps = {
      id,
      name,
      label: _label,
      'aria-label': ariaLabel,
      options: _options,
      noneOption: _noneOption,
      size: defaultSize,
      onValueChange: _onValueChange,
      onValueChangeFinished,
      ...otherProps,
    };

    if (multiple) {
      const multiValue = Array.isArray(value) ? value : [];

      return <Select {...commonProps} value={multiValue} multiple={true} />;
    } else {
      const singleValue = Array.isArray(value) ? value[0] || '' : value;

      return <Select {...commonProps} value={singleValue} multiple={false} />;
    }
  },
);
