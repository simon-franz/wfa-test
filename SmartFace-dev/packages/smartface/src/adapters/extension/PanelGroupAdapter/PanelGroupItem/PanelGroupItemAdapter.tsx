import { PanelGroupItem } from '@hrworks/sui-extension/PanelGroup/PanelGroupItem/PanelGroupItem';
import { PanelResizeHandle } from '@hrworks/sui-extension/PanelGroup/PanelResizeHandle/PanelResizeHandle';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import type { WriteUpdate } from '../../../../types/shared/BackendResponseType/UpdateTypes';
import { PanelGroupAdapterContext } from '../PanelGroupAdapterContext';
import type { PanelGroupItemAdapterProps } from './PanelGroupItemAdapter.types';

export const PanelGroupItemAdapter = observer(
  ({ componentChildren, id, ...otherProps }: PanelGroupItemAdapterProps) => {
    const { lastItemSfId } = useContext(PanelGroupAdapterContext);
    const { queueBackendPatches, applyUpdates } = useContext(SmartFaceContext);

    const children = mapSmartFaceComponentsToAdapters(componentChildren);

    const onResize = (size: number) => {
      const update: WriteUpdate = {
        targetSfId: id,
        operation: 'write',
        path: 'props.size',
        value: size,
      };
      queueBackendPatches(id, [update]);
      applyUpdates([update]);
    };

    return (
      <>
        <PanelGroupItem onResize={onResize} id={id} children={children} {...otherProps} />
        {id !== lastItemSfId && <PanelResizeHandle />}
      </>
    );
  },
);
