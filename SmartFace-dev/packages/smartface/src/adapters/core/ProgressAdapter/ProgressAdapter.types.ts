import type { Color, Size } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type ProgressBackendProps = {
  presentation?: 'linear' | 'circular';
  progress?: number;
  color?: Color;
  size?: Size;
  animated?: boolean;
};

export type ProgressBackendDefinition = SmartFaceBackendComponent<'Progress', ProgressBackendProps>;

export type ProgressAdapterProps = SmartFaceAdapterPropsType<ProgressBackendDefinition>;
