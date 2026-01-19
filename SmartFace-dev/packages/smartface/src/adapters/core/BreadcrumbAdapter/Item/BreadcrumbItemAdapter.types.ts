import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';
import type { HTMLAttributeAnchorTarget } from 'react';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';

export type BreadcrumbItemBackendProps = {
  text: string;
  href?: string;
  onClick?: SfEventType;
  target?: HTMLAttributeAnchorTarget;
  underline?: boolean;
};

export type BreadcrumbItemBackendDefinition = SmartFaceBackendComponentPart<BreadcrumbItemBackendProps>;

export type BreadcrumbItemAdapterProps = SmartFaceAdapterPropsType<BreadcrumbItemBackendDefinition>;
