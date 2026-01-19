import { CommentList } from '@hrworks/sui-extension/CommentList';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import type { CommentListAdapterProps } from './CommentListAdapter.types';
import { CommentListItemAdapter } from './Item/CommentListItemAdapter';

export const CommentListAdapter = observer(({ items, ...otherProps }: CommentListAdapterProps) => {
  const children = mapSmartFaceComponentPartsToAdapter(CommentListItemAdapter, items);

  return <CommentList children={children} {...otherProps} />;
});
