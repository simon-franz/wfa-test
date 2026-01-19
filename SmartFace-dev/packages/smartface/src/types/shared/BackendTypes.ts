import type { OnClickLinkProps } from '@hrworks/types/shared/UiTypes';

import type { FontAwesomeIconBackendDefinition } from '../../adapters/core/FontAwesomeIconAdapter/FontAwesomeIconAdapter.types';
import type { MaterialDesignIconBackendDefinition } from '../../adapters/core/MaterialDesignIconAdapter/MaterialDesignIconAdapter.types';
import type { StreamlineIconBackendType } from '../../types/core/StreamlineIconType';
import type { SfEventType } from './SfEventTypes';

export type LogoBackendProps = { alt?: string; src?: string; title?: string } & OnClickLinkBackendProps;

export type OnClickLinkBackendProps = {
  onClick?: SfEventType;
} & OnClickLinkProps;

export type IconBackendDefinition =
  | FontAwesomeIconBackendDefinition
  | StreamlineIconBackendType
  | MaterialDesignIconBackendDefinition;
