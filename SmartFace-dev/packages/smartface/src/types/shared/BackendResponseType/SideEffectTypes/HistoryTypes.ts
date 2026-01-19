type PushHistoryState = {
  type: 'pushHistoryState';
  url: string;
  title: string;
};

type ReplaceHistoryState = {
  type: 'replaceHistoryState';
  url: string;
  title: string;
};

export type HistorySideEffects = PushHistoryState | ReplaceHistoryState;
