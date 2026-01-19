import { createContext } from 'react';

import type { GridProps } from './Grid.types';

type GridContextProps = Pick<GridProps, 'size'>;

export const GridContext = createContext<GridContextProps>({} as GridContextProps);
