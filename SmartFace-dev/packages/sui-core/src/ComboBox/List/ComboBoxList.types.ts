import type { Size } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, MutableRefObject } from 'react';

import type { useCache } from '../';

export type ComboBoxListProps = {
  size: Size;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  currentCache: ReturnType<ReturnType<typeof useCache>['getCurrentCache']>;
  loadMore: ReturnType<typeof useCache>['getResult'];
} & HTMLAttributes<HTMLDivElement>;
