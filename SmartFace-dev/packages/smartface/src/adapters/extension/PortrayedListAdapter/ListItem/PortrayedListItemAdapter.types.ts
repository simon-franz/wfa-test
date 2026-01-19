import type { IconBackendDefinition, OnClickLinkBackendProps } from '../../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';
import type { ImageBackendDefinition } from '../../../core/ImageAdapter/ImageAdapter.types';
import type { AfterEffectsMediaBackendDefinition } from '../../../extension/AfterEffectsMediaAdapter/AfterEffectsMediaAdapter.types';

export type PortrayedListItemBackendProps = OnClickLinkBackendProps & {
  title: string;
  subtitle?: string;
  media?: ImageBackendDefinition | IconBackendDefinition | AfterEffectsMediaBackendDefinition;
  extrasChildren?: SmartFaceComponentsType[];
};

export type PortrayedListItemBackendDefinition = SmartFaceBackendComponentPart<PortrayedListItemBackendProps>;

export type PortrayedListItemAdapterProps = SmartFaceAdapterPropsType<PortrayedListItemBackendDefinition>;
