import CollapsibleMenuSection from '@hrworks/sui-core/CollapsibleMenu/Section';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';

import { mapCollapsibleMenuComponentPart } from '../CollapsibleMenuAdapter';
import type { CollapsibleMenuSectionAdapterProps } from './CollapsibleMenuSectionAdapter.types';

export const CollapsibleMenuSectionAdapter = observer(
  ({ componentParts, title = MISSING_STRING, ...otherProps }: CollapsibleMenuSectionAdapterProps) => {
    const children = componentParts?.map((componentPart) => mapCollapsibleMenuComponentPart(componentPart));

    return <CollapsibleMenuSection title={title} children={children} {...otherProps} />;
  },
);
