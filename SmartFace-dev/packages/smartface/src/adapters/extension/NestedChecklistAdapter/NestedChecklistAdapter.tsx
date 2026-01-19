import NestedChecklist from '@hrworks/sui-extension/NestedChecklist';
import { observer } from 'mobx-react';
import { useMemo } from 'react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import type { NestedChecklistAdapterProps } from './NestedChecklistAdapter.types';
import { NestedChecklistEntryAdapter } from './NestedChecklistEntry';
import { useFetchEntries } from './useFetchEntries';

export const NestedChecklistAdapter = observer(
  ({ entries = [], onFetchEntries, id, ...otherProps }: NestedChecklistAdapterProps) => {
    const atLeastOneFirstLevelHasEntries = useMemo(
      () => entries.some(({ props = {} }) => props.entries || props.onFetchEntries),
      [entries],
    );

    const firstLevelEntries = entries.map(({ props = {}, ...backendProps }) => {
      const { isFirstLevelWithNoEntries, ...otherProps } = props;

      return {
        props: { isFirstLevelWithNoEntries: !atLeastOneFirstLevelHasEntries, ...otherProps },
        ...backendProps,
      };
    });

    const children = mapSmartFaceComponentPartsToAdapter(NestedChecklistEntryAdapter, firstLevelEntries);

    const _onFetchEntries = onFetchEntries && useFetchEntries(onFetchEntries, id);

    return <NestedChecklist children={children} onFetchEntries={_onFetchEntries} {...otherProps} />;
  },
);
