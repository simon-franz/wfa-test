import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../../types/SmartFaceComponent';

export type PreviousNewsItemBackendProps = {
  title?: string;
  date?: string;
  tags?: string[];
  contentSrc?: string;
};

export type PreviousNewsItemBackendDefinition = SmartFaceBackendComponentPart<PreviousNewsItemBackendProps>;

export type PreviousNewsItemAdapterProps = SmartFaceAdapterPropsType<PreviousNewsItemBackendDefinition>;
