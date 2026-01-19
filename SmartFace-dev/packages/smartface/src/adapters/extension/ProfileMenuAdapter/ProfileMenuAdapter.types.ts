import type { FloatDirection } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';
import type { ImageBackendProps } from '../../core/ImageAdapter/ImageAdapter.types';

export type ProfileMenuBackendProps = {
  portrait?: Pick<ImageBackendProps, 'src' | 'alt' | 'corner'>;
  title?: string;
  trigger?: SmartFaceComponentsType;
  subtitle?: string;
  placement?: FloatDirection;
  headerChildren?: SmartFaceComponentsType[];
  bodyChildren?: SmartFaceComponentsType[];
};

export type ProfileMenuBackendDefinition = SmartFaceBackendComponent<'ProfileMenu', ProfileMenuBackendProps>;

export type ProfileMenuAdapterProps = SmartFaceAdapterPropsType<ProfileMenuBackendDefinition>;
