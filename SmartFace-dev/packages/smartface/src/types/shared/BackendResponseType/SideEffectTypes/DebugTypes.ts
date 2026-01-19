import type { RequestEventType } from '../../SfEventTypes';

export type EnableComponentDebuggerType = {
  type: 'enableComponentDebugger';
  onClick: Array<RequestEventType> | RequestEventType;
};

type DisableComponentDebuggerType = {
  type: 'disableComponentDebugger';
};

export type DebugTypes = EnableComponentDebuggerType | DisableComponentDebuggerType;
