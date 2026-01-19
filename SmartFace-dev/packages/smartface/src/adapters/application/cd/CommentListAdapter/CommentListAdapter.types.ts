import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';
import type { CommentListItemBackendDefinition } from './Item/CommentListItemAdapter.types';

export type CommentListBackendProps = {
  items?: CommentListItemBackendDefinition[];
  textUrlMaxLength?: number;
};

export type CommentListBackendDefinition = SmartFaceBackendComponent<'CommentList', CommentListBackendProps>;

export type CommentListAdapterProps = SmartFaceAdapterPropsType<CommentListBackendDefinition>;
