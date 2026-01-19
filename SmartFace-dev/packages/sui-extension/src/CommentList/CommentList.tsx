import { observer } from 'mobx-react';

import { S } from './CommentList.styles';
import type { CommentListProps } from './CommentList.types';
import { CommentListContext } from './CommentListContext';

export const CommentList = observer(({ textUrlMaxLength = 25, children, ...otherProps }: CommentListProps) => (
  <S.CommentList {...otherProps}>
    <CommentListContext.Provider
      value={{
        textUrlMaxLength,
      }}
    >
      {children}
    </CommentListContext.Provider>
  </S.CommentList>
));
