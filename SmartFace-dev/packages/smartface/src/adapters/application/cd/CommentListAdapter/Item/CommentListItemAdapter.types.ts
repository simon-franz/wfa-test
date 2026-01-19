import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../../types/SmartFaceComponentsType';

export type CommentListItemBackendProps = {
  signature: string;
  text: string;
  timestamp?: string;
  toolbarChildren?: SmartFaceComponentsType[];
};

export type CommentListItemBackendDefinition = SmartFaceBackendComponentPart<CommentListItemBackendProps>;

export type CommentListItemAdapterProps = SmartFaceAdapterPropsType<CommentListItemBackendDefinition>;
