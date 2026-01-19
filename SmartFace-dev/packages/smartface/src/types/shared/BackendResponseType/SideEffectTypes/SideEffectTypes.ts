import type { NotificationProps } from '@hrworks/sui-shared/classes/Notification';

import type { InternalServerErrorBackendProps } from '../../../../adapters/core/InternalServerErrorAdapter/InternalServerErrorAdapter.types';
import type { DebugTypes } from './DebugTypes';
import type { HistorySideEffects } from './HistoryTypes';
import type { PatchType } from './PatchType';
import type { UpdateSmartFaceBackendConfigType } from './UpdateSmartFaceBackendConfigType';

type RedirectType = {
  type: 'redirect';
  url: string;

  delay?: number;
};

type BlockUI = {
  type: 'blockUI';
};

type ClearSideEffectsType = {
  type: 'clearSideEffects';
};

export type NavigateToElementType = {
  type: 'navigateToElement';
  id: string;
  focus?: boolean;
  scrollIntoView?: boolean;
};

export type InternalServerError = {
  type: 'showInternalError';
  id?: string;
} & InternalServerErrorBackendProps;

export type JavaScriptExecutorType = {
  type: 'javaScriptExecutor';
  javaScript: string;
};

export type ConsoleMessageType = {
  type: 'consoleMessage';
  message: string;
  level?: 'log' | 'warn' | 'error';
};

export type SessionExpiredType = {
  type: 'sessionExpired';
  targetUrl: string;
  autoRedirectAfterMilliseconds?: number;
};

export type SideEffectType =
  | NavigateToElementType
  | RedirectType
  | NotificationProps
  | BlockUI
  | DebugTypes
  | InternalServerError
  | JavaScriptExecutorType
  | HistorySideEffects
  | PatchType
  | ClearSideEffectsType
  | UpdateSmartFaceBackendConfigType
  | ConsoleMessageType
  | SessionExpiredType;
