import type { ArrayElement } from 'type-fest/source/internal';

import { mapSmartFaceComponentPartsToAdapter } from '../../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { DropdownMenuDividerAdapter } from './DropdownMenuDividerAdapter';
import { DropdownMenuEntryAdapter } from './DropdownMenuEntryAdapter';
import { DropdownMenuSectionAdapter } from './DropdownMenuSectionAdapter';
import type { SqwDropdownMenuBackendProps } from './SqwDropdownMenuAdapter.types';

export const mapSqwDropdownMenuComponentPart = ({
  sfComponentPart,
  ...adapterProps
}: ArrayElement<SqwDropdownMenuBackendProps['componentParts']>) => {
  switch (sfComponentPart) {
    case 'Section':
      return mapSmartFaceComponentPartsToAdapter(DropdownMenuSectionAdapter, [adapterProps]);
    case 'Entry':
      return mapSmartFaceComponentPartsToAdapter(DropdownMenuEntryAdapter, [adapterProps]);
    case 'Divider':
      return mapSmartFaceComponentPartsToAdapter(DropdownMenuDividerAdapter, [adapterProps]);
  }
};
