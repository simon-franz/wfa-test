import { CommentListItem } from '@hrworks/sui-extension/CommentList';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../../../main/components/ComponentMapper';
import type { CommentListItemAdapterProps } from './CommentListItemAdapter.types';

export const CommentListItemAdapter = observer(
  ({
    text = MISSING_STRING,
    signature = MISSING_STRING,
    toolbarChildren,
    ...otherProps
  }: CommentListItemAdapterProps) => {
    const _toolbarChildren = mapSmartFaceComponentsToAdapters(toolbarChildren);

    return <CommentListItem text={text} toolbarChildren={_toolbarChildren} signature={signature} {...otherProps} />;
  },
);
