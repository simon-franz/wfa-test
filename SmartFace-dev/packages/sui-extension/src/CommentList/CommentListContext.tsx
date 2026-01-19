import { createContext } from 'react';

import type { CommentListProps } from './CommentList.types';

type CommentListContextProps = Required<Pick<CommentListProps, 'textUrlMaxLength'>>;

export const CommentListContext = createContext<CommentListContextProps>({} as CommentListContextProps);
