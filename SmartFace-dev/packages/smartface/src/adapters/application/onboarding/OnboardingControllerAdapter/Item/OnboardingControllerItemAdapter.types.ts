import type { IconBackendDefinition } from '../../../../../types/shared/BackendTypes';
import type { SmartFaceBackendComponentPart } from '../../../../../types/SmartFaceComponent';
import type { ImageBackendDefinition } from '../../../../core/ImageAdapter/ImageAdapter.types';
import type { AfterEffectsMediaBackendDefinition } from '../../../../extension/AfterEffectsMediaAdapter/AfterEffectsMediaAdapter.types';
import type { VerticalNavigationItemBackendProps } from '../../VerticalNavigationAdapter/Item/VerticalNavigationItemAdapter.types';
import type { SplitLayoutProps } from '@hrworks/sui-extension/SplitLayout/SplitLayout.types';

export type OnboardingControllerItemBackendProps = {
  title?: string;
  description?: string;
  media?: ImageBackendDefinition | AfterEffectsMediaBackendDefinition | IconBackendDefinition;
  navigationIcon?: IconBackendDefinition;
} & VerticalNavigationItemBackendProps &
  Pick<SplitLayoutProps, 'expandSidebar'>;

export type OnboardingControllerItemBackendDefinition =
  SmartFaceBackendComponentPart<OnboardingControllerItemBackendProps>;
