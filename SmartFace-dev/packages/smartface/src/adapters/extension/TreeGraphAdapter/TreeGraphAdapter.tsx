import LoadingOverlay from '@hrworks/sui-core/LoadingOverlay';
import { useDeepCompareMemoize } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { lazy, Suspense, useCallback, useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import { mapElementProps } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { Update } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type { TreeGraphAdapterProps, TreeGraphEntryBackendDefinition } from './TreeGraphAdapter.types';
import type { TreeGraphEntry } from '@hrworks/sui-extension/TreeGraph/TreeGraph.types';

const TreeGraph = lazy(() => import('@hrworks/sui-extension/TreeGraph'));

const TreeGraphInner = observer(({ entries = [], controlsChildren, ...otherProps }: TreeGraphAdapterProps) => {
  const { applyEvents, applyUpdates, queueBackendPatches } = useContext(SmartFaceContext);
  const { defaultFullHeight } = useContext(DefaultValueContext);

  const mapEntries = useCallback(
    (_entries: TreeGraphEntryBackendDefinition[]): TreeGraphEntry[] =>
      _entries.map((entry) => {
        const { onLoadChildEntries, onClick, isExpanded, entries, id, ...otherProps } = mapElementProps(entry);
        const _isExpanded =
          typeof isExpanded === 'boolean' ? isExpanded : isExpanded == null && !!onLoadChildEntries ? false : true;
        const setIsExpanded = (id: string, value: boolean) => {
          const update: Update = {
            operation: 'write',
            targetSfId: id,
            path: 'props.isExpanded',
            value,
          };
          applyUpdates([update]);
          queueBackendPatches(id, [update]);
        };
        const _onLoadChildEntries =
          onLoadChildEntries &&
          (async () => {
            const withFrontendEventData = onLoadChildEntries.map((event) => ({
              ...event,
              frontendEventData: { targetSfId: id },
            }));
            applyEvents(withFrontendEventData);
          });
        const _onClick = onClick && (() => applyEvents(onClick));
        const _entries = entries && mapEntries(entries);

        return {
          id,
          isExpanded: _isExpanded,
          setIsExpanded,
          onLoadChildEntries: _onLoadChildEntries,
          onClick: _onClick,
          entries: _entries,
          ...otherProps,
        };
      }),
    [applyEvents, applyUpdates, queueBackendPatches],
  );

  const _entries = useDeepCompareMemoize(mapEntries(entries));

  const _controlsChildren = mapSmartFaceComponentsToAdapters(controlsChildren);

  return (
    <TreeGraph entries={_entries} controlsChildren={_controlsChildren} fullHeight={defaultFullHeight} {...otherProps} />
  );
});

export const TreeGraphAdapter = (props: TreeGraphAdapterProps) => {
  return (
    <Suspense fallback={<LoadingOverlay style={{ height: '100%' }} loading />}>
      <TreeGraphInner {...props} />
    </Suspense>
  );
};
