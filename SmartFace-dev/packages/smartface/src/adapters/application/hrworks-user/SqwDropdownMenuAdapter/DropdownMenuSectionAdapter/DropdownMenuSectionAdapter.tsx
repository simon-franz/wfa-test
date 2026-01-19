import { DropdownMenuSection } from '@hrworks/sui-extension/SqwDropdownMenu';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';

import { mapSqwDropdownMenuComponentPart } from '../mapSqwDropdownMenuComponentPart';
import type { DropdownMenuSectionAdapterProps } from './DropdownMenuSectionAdapter.types';

export const DropdownMenuSectionAdapter = observer(
  ({ title = MISSING_STRING, componentParts, ...otherProps }: DropdownMenuSectionAdapterProps) => {
    const children = componentParts?.map((componentPart) => mapSqwDropdownMenuComponentPart(componentPart));

    return <DropdownMenuSection title={title} children={children} {...otherProps} />;
  },
);
