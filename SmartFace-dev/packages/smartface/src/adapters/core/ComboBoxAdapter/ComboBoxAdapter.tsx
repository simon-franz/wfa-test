import { ControlledComboBox } from '@hrworks/sui-core/ComboBox';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import useTranslateInputProps from '../../../adapters/shared/useTranslateInputProps';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import { getSmartFaceBackendConfigProperty } from '../../../main/lib/getSmartFaceBackendConfigProperty';
import { sfAxios } from '../../../main/lib/sfAxios';
import type { Update } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type { ComboBoxAdapterProps, ComboBoxResponseType } from './ComboBoxAdapter.types';

export const ComboBoxAdapter = observer(
  ({
    label,
    name,
    value = null,
    query = '',
    id,
    onValueChange,
    url,
    'aria-label': ariaLabel,
    onEnterKeyDown,
    ...otherProps
  }: ComboBoxAdapterProps) => {
    const { applyUpdates, applySideEffects, queueBackendPatches, applyEvents } = useContext(SmartFaceContext);
    const { defaultSize } = useContext(DefaultValueContext);

    const _getOptions = async (query: string, page: number) => {
      try {
        const response = await sfAxios.post<ComboBoxResponseType>(
          url || getSmartFaceBackendConfigProperty('sfComboBoxHandlerUrl') || import.meta.env.VITE_COMBOBOX_HANDLER!,
          {
            data: { sfId: id, query, page },
          },
        );
        if (response.type !== 'success') {
          return { results: [] };
        }
        const { data, sideEffects } = response.data;
        sideEffects && applySideEffects(sideEffects);
        const { results = [], pagination, clientSideFiltering } = data || {};

        return { results, pagination, clientSideFiltering };
      } catch {
        return { results: [] };
      }
    };

    const onValueChangeLazy = () => onValueChange && queueMicrotask(() => applyEvents(onValueChange));

    const onQueryChange = (query: string) => {
      const updates: Update[] = [{ operation: 'write', targetSfId: id, path: 'props.query', value: query }];
      queueBackendPatches(`id-${query}`, updates);
      applyUpdates(updates);
    };

    if (!url && !getSmartFaceBackendConfigProperty('sfComboBoxHandlerUrl') && !import.meta.env.VITE_COMBOBOX_HANDLER) {
      throw new Error(`Missing url for ComboBox ${id}`);
    }

    const {
      onValueChangeFinished, // We dont need these 2 props
      value: translatedValue,
      ...translatedInputProps
    } = useTranslateInputProps({
      id,
      label,
      name,
      'aria-label': ariaLabel,
      onEnterKeyDown,
    });

    return (
      <ControlledComboBox
        value={value}
        query={query}
        getOptions={_getOptions}
        onValueChangeLazy={onValueChangeLazy}
        onQueryChange={onQueryChange}
        size={defaultSize}
        {...translatedInputProps}
        {...otherProps}
      />
    );
  },
);
