import { LocalizationContext } from '@hrworks/localization';
import { FileManager } from '@hrworks/sui-core/FileManager';
import { MISSING_STRING } from '@hrworks/sui-shared';
import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';
import { observer } from 'mobx-react';
import { useContext, useMemo } from 'react';

import { ButtonAdapter } from '../../../adapters/core/ButtonAdapter';
import { ComponentMapper } from '../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { Update } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type { FileManagerAdapterProps } from './FileManagerAdapter.types';
import type { FileManagerProps } from '@hrworks/sui-core/FileManager/FileManager.types';

export const FileManagerAdapter = observer(
  ({
    id,
    name = MISSING_STRING,
    mode = 'single',
    disabled,
    value = [],
    trigger,
    windowDropzone,
    label,
    validationMessage,
    validationState,
    onRemoveFiles,
    onAddFiles,
    onValueChange,
    ...otherProps
  }: FileManagerAdapterProps) => {
    const { applyUpdates, queueBackendPatches, applyEvents } = useContext(SmartFaceContext);
    const { translate } = useContext(LocalizationContext);

    const _value = useMemo(() => {
      return value.map(({ sfId, displayName = MISSING_STRING, ...otherProps }) => ({
        id: sfId,
        displayName,
        ...otherProps,
      }));
    }, [value]);

    const onFilesChange = (eventHandler?: SfEventType) => () => {
      queueMicrotask(async () => {
        eventHandler && (await applyEvents(eventHandler));
        onValueChange && applyEvents(onValueChange);
      });
    };

    const _onValueChange = (value: FileManagerProps['value']) => {
      const updates: Update[] = [
        {
          operation: 'write',
          targetSfId: id,
          path: 'props.value',
          value: value.map(({ id, displayName, size, ignoreSize, displayUrl }) => ({
            sfId: id,
            displayName,
            size,
            ignoreSize,
            displayUrl,
          })),
        },
      ];

      if (validationMessage || validationState) {
        const backendUpdates: Update[] = [
          {
            operation: 'delete',
            targetSfId: id,
            path: 'props.validationMessage',
          },
          {
            operation: 'delete',
            targetSfId: id,
            path: 'props.validationState',
          },
        ];
        queueBackendPatches(id, backendUpdates);
        updates.push(...backendUpdates);
      }
      applyUpdates(updates);
    };

    const isTriggerDropzone = trigger?.sfComponent === 'Dropzone';

    const _windowDropzone = { show: windowDropzone?.show ?? !isTriggerDropzone, text: windowDropzone?.text };

    const _trigger = trigger ? (
      <ComponentMapper smartFaceComponent={trigger} />
    ) : (
      <ButtonAdapter
        disabled={disabled}
        id={id}
        text={
          label ||
          translate(
            mode === 'single' || mode == null
              ? 'file-manager-default-trigger-text-singular'
              : 'file-manager-default-trigger-text-plural',
          )
        }
      />
    );

    return (
      <FileManager
        id={id}
        name={name}
        value={_value}
        mode={mode}
        disabled={disabled}
        validationMessage={validationMessage}
        validationState={validationState}
        onValueChange={_onValueChange}
        onAddFiles={onFilesChange(onAddFiles)}
        onRemoveFiles={onFilesChange(onRemoveFiles)}
        windowDropzone={_windowDropzone}
        trigger={_trigger}
        {...otherProps}
      />
    );
  },
);
