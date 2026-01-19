import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';
import type { FormComponentProps } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';
import type { FileManagerValidations } from '@hrworks/sui-core/FileManager/FileManager.types';

export type FileManagerValue = {
  sfId: string;
  displayName: string;
  size?: number;
  displayUrl?: string;
  ignoreSize?: boolean;
};

export type FileManagerBackendProps = Omit<FormComponentProps, 'mandatory' | 'size'> & {
  mode: 'single' | 'multi' | 'growing';
  value: FileManagerValue[];
  showList?: boolean;
  onAddFiles?: SfEventType;
  onRemoveFiles?: SfEventType;
  onValueChange?: SfEventType;
  trigger?: SmartFaceComponentsType;
  windowDropzone?: {
    show?: boolean;
    text?: string;
  };
  validations?: FileManagerValidations;
};

export type FileManagerBackendDefinition = SmartFaceBackendComponent<'FileManager', FileManagerBackendProps>;

export type FileManagerAdapterProps = SmartFaceAdapterPropsType<FileManagerBackendDefinition>;
