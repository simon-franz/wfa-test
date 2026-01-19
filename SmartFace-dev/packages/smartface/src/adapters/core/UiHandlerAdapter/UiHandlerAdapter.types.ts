import type { UiHandlerProps } from '../../../main/components/UiHandler/UiHandler.types';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type UiHandlerBackendProps = Omit<UiHandlerProps, 'children'> & {
  componentChildren: SmartFaceComponentsType[];
};

export type UiHandlerBackendDefinition = SmartFaceBackendComponent<'UiHandler', UiHandlerBackendProps>;

export type UiHandlerAdapterProps = SmartFaceAdapterPropsType<UiHandlerBackendDefinition>;
