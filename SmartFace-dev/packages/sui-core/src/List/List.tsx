import { observer } from 'mobx-react';

import { S } from './List.styles';
import type { ListProps } from './List.types';
import { ListContext } from './ListContext';

export const List = observer(
  ({ children, lineStyle = 'solid', hoverable = true, selectedItemId, ...otherProps }: ListProps) => {
    const isSelected = (itemId: string) => selectedItemId === itemId;

    return (
      <S.List lineStyle={lineStyle} {...otherProps}>
        <ListContext.Provider value={{ isSelected, hoverable }}>{children}</ListContext.Provider>
      </S.List>
    );
  },
);
