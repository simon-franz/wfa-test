import { createContext } from 'react';

type TreeGraphContextType = {
  highlightColor: string;
};

export const TreeGraphContext = createContext<TreeGraphContextType>({} as TreeGraphContextType);
