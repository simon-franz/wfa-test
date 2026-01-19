import { createContext } from 'react';

import type { EventController, SfResponseType } from '../../../main/lib/EventController';
import type { History } from '../../../main/lib/History';
import type { NotificationsController } from '../../../main/lib/NotificationsController';
import type { SideEffectsController } from '../../../main/lib/SideEffectsController';
import type { Update } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type { SfEventType } from '../../../types/shared/SfEventTypes';
import type { AxiosNetworkErrorCodeType } from '../SmartFaceContainer';

export type SmartFaceContextType = {
  applyEvents: (event: SfEventType) => Promise<SfResponseType>;
  applySideEffects: SideEffectsController['applySideEffects'];
  applyUpdates: (updates: Update[]) => any;
  queueBackendPatches: (sfId: string, backendPatches: Update[]) => void;
  sendRequest: EventController['sendRequest'];
  history: History;
  notificationsController: NotificationsController;
  setBlockUI: (blockUI: boolean) => void;
  setAxiosErrorCode: (axiosErrorCode: AxiosNetworkErrorCodeType) => void;
};

export const SmartFaceContext = createContext<SmartFaceContextType>({} as SmartFaceContextType);
