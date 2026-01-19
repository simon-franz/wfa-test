import { observer } from 'mobx-react';

import { S } from './Grid.styles';
import type { GridProps } from './Grid.types';
import { GridContext } from './GridContext';

export const Grid = observer(({ gap = 'medium', children, size = 'default', ...otherProps }: GridProps) => {
  return (
    <S.Grid gap={gap} {...otherProps}>
      <GridContext.Provider value={{ size }}>{children}</GridContext.Provider>
    </S.Grid>
  );
});
