import type { SfEventType } from '../../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';
import type { ImageBackendDefinition } from '../../../core/ImageAdapter/ImageAdapter.types';

export type SqwProfileMenuBackendProps = {
  portrait: ImageBackendDefinition;
  componentChildren?: SmartFaceComponentsType[];
  onPortraitAction?: SfEventType;
  username?: string;
  email?: string;
};

export type SqwProfileMenuBackendDefinition = SmartFaceBackendComponent<'SqwProfileMenu', SqwProfileMenuBackendProps>;

export type SqwProfileMenuAdapterProps = SmartFaceAdapterPropsType<SqwProfileMenuBackendDefinition>;
