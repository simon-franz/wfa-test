import type { IconBackendDefinition } from '../../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';

export type DataWidgetBackendProps = {
  label?: string;
  value?: string;
  icon?: IconBackendDefinition;
  descriptionChildren?: SmartFaceComponentsType[];
};

export type DataWidgetBackendDefinition = SmartFaceBackendComponent<'DataWidget', DataWidgetBackendProps>;

export type DataWidgetAdapterProps = SmartFaceAdapterPropsType<DataWidgetBackendDefinition>;
