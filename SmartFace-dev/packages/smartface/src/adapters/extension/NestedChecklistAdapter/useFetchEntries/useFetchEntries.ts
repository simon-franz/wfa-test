import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';
import { useContext } from 'react';

import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';

export const useFetchEntries = (onFetchEntries: SfEventType, id: string) => {
  const { applyEvents } = useContext(SmartFaceContext);

  if (!onFetchEntries) return;

  return async () => {
    const eventsWithFrontendData = onFetchEntries.map((event) => ({
      ...event,
      frontendEventData: { targetSfId: id },
    }));

    await applyEvents(eventsWithFrontendData);
  };
};
