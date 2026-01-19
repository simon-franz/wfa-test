import type { Size } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type SectionBackendProps = {
  componentChildren: SmartFaceComponentsType[];
  titleChildren?: SmartFaceComponentsType[];
  collapsible?: boolean;
  expanded?: boolean;
  divider?: boolean;
  breakTitleChildrenWithTitle?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  title?: string;
  size?: Size;
  uppercase?: boolean;
  alignTitle?: 'start' | 'center' | 'end';
};

export type SectionBackendDefinition = SmartFaceBackendComponent<'Section', SectionBackendProps>;

export type SectionAdapterProps = SmartFaceAdapterPropsType<SectionBackendDefinition>;
