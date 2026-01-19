import { createContext } from 'react';

export type TreeGraphContext = {
  lastInteractedNodeId?: string | null;
  setLastInteractedNodeId: (id: string) => void;
};

export const TreeGraphContext = createContext<TreeGraphContext>({} as TreeGraphContext);
