import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';

export type CarouselItemBackendProps = {
  componentChildren?: SmartFaceComponentsType[];
};

export type CarouselItemBackendDefinition = SmartFaceBackendComponentPart<CarouselItemBackendProps>;

export type CarouselItemAdapterProps = SmartFaceAdapterPropsType<CarouselItemBackendDefinition>;
