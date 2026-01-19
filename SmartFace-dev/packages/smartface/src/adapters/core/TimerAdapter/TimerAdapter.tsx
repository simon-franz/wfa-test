import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';

import type { TimerAdapterProps } from '../../../adapters/core/TimerAdapter/TimerAdapter.types';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { DeleteUpdateType } from '../../../types/shared/BackendResponseType/UpdateTypes';

export const TimerAdapter = observer(({ id, tick, intervalTick, interval, onTimerIsUp }: TimerAdapterProps) => {
  const { applyEvents, applyUpdates, queueBackendPatches } = useContext(SmartFaceContext);

  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const _applyEvents = async () => {
      if (onTimerIsUp) {
        await applyEvents(onTimerIsUp);
      }
    };

    const startInterval = () => {
      if (!timeoutIdRef.current) {
        return;
      }
      timeoutIdRef.current = setTimeout(
        async () => {
          await _applyEvents();
          startInterval();
        },
        Math.max(intervalTick || tick || 0, 1000),
      );
    };

    const startInitialTimeout = () => {
      timeoutIdRef.current = setTimeout(async () => {
        await _applyEvents();
        if (interval) {
          startInterval();
        } else {
          remove();
        }
      }, tick || 0);
    };

    const remove = () => {
      const deleted: DeleteUpdateType = {
        targetSfId: id,
        operation: 'delete',
        path: null,
      };
      queueBackendPatches(id, [deleted]);
      applyUpdates([deleted]);
    };

    startInitialTimeout();

    return () => {
      const current = timeoutIdRef.current;
      if (current) {
        clearTimeout(current);
        timeoutIdRef.current = undefined;
      }
    };
  }, [applyEvents, applyUpdates, id, interval, intervalTick, onTimerIsUp, queueBackendPatches, tick]);

  return null;
});
