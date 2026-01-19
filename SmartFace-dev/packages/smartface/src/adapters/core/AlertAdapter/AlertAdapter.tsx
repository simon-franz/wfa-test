import Alert from '@hrworks/sui-core/Alert';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { ComponentMapper, mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { DeleteUpdateType } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type { AlertAdapterProps } from './AlertAdapter.types';

export const AlertAdapter = observer(({ id, componentChildren, icon, onClose, ...otherProps }: AlertAdapterProps) => {
  const { applyEvents, applyUpdates, queueBackendPatches } = useContext(SmartFaceContext);

  const _onClose =
    onClose &&
    (() => {
      const deleted: DeleteUpdateType = {
        targetSfId: id,
        operation: 'delete',
        path: null,
      };
      queueBackendPatches(id, [deleted]);
      applyUpdates([deleted]);
      applyEvents(onClose);
    });

  const _icon = icon && <ComponentMapper smartFaceComponent={icon} />;

  const children = mapSmartFaceComponentsToAdapters(componentChildren);

  return <Alert id={id} onClose={_onClose} icon={_icon} children={children} {...otherProps} />;
});
