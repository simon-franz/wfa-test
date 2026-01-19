import { NestedChecklistEntry } from '@hrworks/sui-extension/NestedChecklist/NestedChecklistEntry/NestedChecklistEntry';
import { MISSING_STRING } from '@hrworks/sui-shared';
import debounce from 'lodash/debounce';
import { observer } from 'mobx-react';
import { useContext, useRef } from 'react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { DefaultValueContext } from '../../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import type { Update } from '../../../../types/shared/BackendResponseType/UpdateTypes';
import { useFetchEntries } from '../useFetchEntries';
import type { EntryProps, NestedChecklistEntryAdapterProps } from './NestedChecklistEntryAdapter.types';

export const NestedChecklistEntryAdapter = observer(
  ({
    id,
    label = MISSING_STRING,
    checked = false,
    expanded = false,
    checkDescendantsOnFetchEntries = false,
    onFetchEntries,
    entries = [],
    ...otherProps
  }: NestedChecklistEntryAdapterProps) => {
    const { applyUpdates, queueBackendPatches } = useContext(SmartFaceContext);
    const { defaultSize } = useContext(DefaultValueContext);

    const patchesRef = useRef<Update[]>([]);

    const applyQueuedUpdate = (update: Update) => {
      patchesRef.current.push(update);
      debouncedApplyUpdates();
    };

    // TODO vid: Maybe move this to SmartFaceContainer
    const debouncedApplyUpdates = debounce(
      () => {
        const newUpdates = [...patchesRef.current];
        patchesRef.current = [];
        applyUpdates(newUpdates);
      },
      10,
      { maxWait: 1000 },
    );

    const setEntriesProperty = (property: keyof EntryProps, id: string, value: boolean) => {
      const update: Update = {
        operation: 'write',
        targetSfId: id,
        path: `props.${property}`,
        value: value,
      };
      applyQueuedUpdate(update);
      queueBackendPatches(`${id}-${property}`, [update]);
    };

    const _onFetchEntries = onFetchEntries && useFetchEntries(onFetchEntries, id);

    const onExpandedChange = (value: boolean) => setEntriesProperty('expanded', id, value);

    const onCheckedChange = (value: boolean) => setEntriesProperty('checked', id, value);

    const onCheckDescendantsOnFetchEntriesChange = (value: boolean) =>
      setEntriesProperty('checkDescendantsOnFetchEntries', id, value);

    const children = mapSmartFaceComponentPartsToAdapter(NestedChecklistEntryAdapter, entries);

    const onCheckAllRecursively = (value: boolean, entriesToProcess = entries) => {
      if (entriesToProcess === entries) {
        onCheckDescendantsOnFetchEntriesChange?.(value);
        onCheckedChange?.(value);
      }

      entriesToProcess?.forEach((entry) => {
        const { sfId, props = {} } = entry;
        const { entries } = props;

        if (sfId) {
          setEntriesProperty('checked', sfId, value);
          setEntriesProperty('checkDescendantsOnFetchEntries', sfId, value);
        }

        if (entries?.length) {
          onCheckAllRecursively(value, entries);
        }
      });
    };

    return (
      <NestedChecklistEntry
        id={id}
        label={label}
        size={defaultSize}
        checked={checked}
        expanded={expanded}
        checkDescendantsOnFetchEntries={checkDescendantsOnFetchEntries}
        onFetchEntries={_onFetchEntries}
        onExpandedChange={onExpandedChange}
        onCheckedChange={onCheckedChange}
        onCheckAllRecursively={onCheckAllRecursively}
        children={children}
        {...otherProps}
      />
    );
  },
);
