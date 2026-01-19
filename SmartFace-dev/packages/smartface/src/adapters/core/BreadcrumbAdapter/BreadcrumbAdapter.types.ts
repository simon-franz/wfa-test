import type { Separator, Size } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { BreadcrumbItemBackendDefinition } from './Item/BreadcrumbItemAdapter.types';

export type BreadcrumbBackendProps = {
  items: BreadcrumbItemBackendDefinition[];
  size?: Size;
  separator?: Separator;
  uppercase?: boolean;
};

export type BreadcrumbBackendDefinition = SmartFaceBackendComponent<'Breadcrumb', BreadcrumbBackendProps>;

export type BreadcrumbAdapterProps = SmartFaceAdapterPropsType<BreadcrumbBackendDefinition>;
