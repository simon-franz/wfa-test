import { DropdownMenuSection } from '@hrworks/sui-core/DropdownMenu/DropdownMenuSection';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';

import { mapDropdownMenuComponentPart } from '../DropdownMenuAdapter';
import type { DropdownMenuSectionAdapterProps } from './DropdownMenuSectionAdapter.types';

export const DropdownMenuSectionAdapter = observer(
  ({ title = MISSING_STRING, componentParts, ...otherProps }: DropdownMenuSectionAdapterProps) => {
    const children = componentParts?.map((componentPart) => mapDropdownMenuComponentPart(componentPart));

    return (
      <DropdownMenuSection title={title} {...otherProps}>
        {children}
      </DropdownMenuSection>
    );
  },
);
