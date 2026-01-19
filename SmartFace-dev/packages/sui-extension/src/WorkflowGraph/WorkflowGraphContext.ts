import { createContext } from 'react';

import type { WorkflowGraphDefaultProps } from './WorkflowGraph.types';

export type WorkflowGraphContextProps = WorkflowGraphDefaultProps;

export const WorkflowGraphContext = createContext<WorkflowGraphContextProps>({} as WorkflowGraphContextProps);
