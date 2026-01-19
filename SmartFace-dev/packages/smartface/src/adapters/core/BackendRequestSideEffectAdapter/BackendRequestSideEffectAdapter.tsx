import { observer } from 'mobx-react';
import { useContext, useEffect } from 'react';

import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { BackendRequestSideEffectAdapterPropsType } from '../../../types/core/BackendRequestSideEffectType';
import type { Update } from '../../../types/shared/BackendResponseType/UpdateTypes';

export const BackendRequestSideEffectAdapter = observer(({ id, onLoad }: BackendRequestSideEffectAdapterPropsType) => {
  const { applyEvents, applyUpdates, queueBackendPatches } = useContext(SmartFaceContext);

  useEffect(() => {
    const deleted: Update = {
      operation: 'delete',
      targetSfId: id,
      path: null,
    };

    queueBackendPatches(id, [deleted]);
    onLoad && applyEvents(onLoad);
    applyUpdates([deleted]);
  }, [applyEvents, applyUpdates, id, onLoad, queueBackendPatches]);

  return null;
});
