import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../../types/SmartFaceComponentsType';

export type TabPanelBackendProps = {
  componentChildren: SmartFaceComponentsType[];
};

export type TabPanelBackendDefinition = SmartFaceBackendComponentPart<TabPanelBackendProps>;

export type TabPanelAdapterProps = SmartFaceAdapterPropsType<TabPanelBackendDefinition>;
