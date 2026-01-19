import { createContext } from 'react';

import type { FloatRenderFunctionProps } from './Float';

export const FloatContext = createContext<FloatRenderFunctionProps>({} as FloatRenderFunctionProps);
FloatContext.displayName = 'FloatContext';
