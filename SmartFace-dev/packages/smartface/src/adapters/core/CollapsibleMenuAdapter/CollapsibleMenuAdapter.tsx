import { ControlledCollapsibleMenu } from '@hrworks/sui-core/CollapsibleMenu/ControlledCollapsibleMenu';
import { useDeepCompareMemoize } from '@hrworks/sui-shared/hooks/useDeepCompareMemoize';
import { observer } from 'mobx-react';
import { useContext, useMemo } from 'react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { Update } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type {
  CollapsibleMenuAdapterProps,
  CollapsibleMenuBackendProps,
  CollapsibleMenuComponentPartBackendDefinition,
} from './CollapsibleMenuAdapter.types';
import { CollapsibleMenuEntryAdapter } from './Entry/CollapsibleMenuEntryAdapter';
import { CollapsibleMenuSectionAdapter } from './Section/CollapsibleMenuSectionAdapter';

export const mapCollapsibleMenuComponentPart = ({
  sfComponentPart,
  ...adapterProps
}: CollapsibleMenuComponentPartBackendDefinition) => {
  switch (sfComponentPart) {
    case 'Section':
      return mapSmartFaceComponentPartsToAdapter(CollapsibleMenuSectionAdapter, [adapterProps]);
    case 'Entry':
      return mapSmartFaceComponentPartsToAdapter(CollapsibleMenuEntryAdapter, [adapterProps]);
  }
};

export const CollapsibleMenuAdapter = observer(
  ({ id, expandedEntrySfIds = [], activeEntrySfId, componentParts, ...otherProps }: CollapsibleMenuAdapterProps) => {
    const { queueBackendPatches, applyUpdates } = useContext(SmartFaceContext);

    const updateExpandedEntrySfIds = (expandedEntrySfIds: CollapsibleMenuBackendProps['expandedEntrySfIds']) => {
      const update: Update = {
        operation: 'write',
        targetSfId: id,
        path: 'props.expandedEntrySfIds',
        value: expandedEntrySfIds,
      };
      queueBackendPatches(id, [update]);
      applyUpdates([update]);
    };

    const updateActiveEntrySfId = (activeEntrySfId: CollapsibleMenuBackendProps['activeEntrySfId']) => {
      const update: Update = {
        operation: 'write',
        targetSfId: id,
        path: 'props.activeEntrySfId',
        value: activeEntrySfId,
      };
      queueBackendPatches(id, [update]);
      applyUpdates([update]);
    };

    const memoizedComponentParts = useDeepCompareMemoize(componentParts);

    const children = useMemo(
      () => memoizedComponentParts?.map((componentPart) => mapCollapsibleMenuComponentPart(componentPart)),
      [memoizedComponentParts],
    );

    return (
      <ControlledCollapsibleMenu
        children={children}
        updateActiveEntryId={updateActiveEntrySfId}
        updateExpandedEntryIds={updateExpandedEntrySfIds}
        expandedEntryIds={expandedEntrySfIds}
        activeEntryId={activeEntrySfId}
        {...otherProps}
      />
    );
  },
);
