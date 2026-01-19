import type { OnClickLinkBackendProps } from '../../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';

export type ListItemBackendProps = OnClickLinkBackendProps & {
  componentChildren: SmartFaceComponentsType[];
};

export type ListItemBackendDefinition = SmartFaceBackendComponentPart<ListItemBackendProps, 'ListItem'>;

export type ListItemAdapterProps = SmartFaceAdapterPropsType<ListItemBackendDefinition>;
