import { observer } from 'mobx-react';
import { useState } from 'react';

import type { CollapsibleMenuProps, ControlledCollapsibleMenuProps } from './CollapsibleMenu.types';
import { ControlledCollapsibleMenu } from './ControlledCollapsibleMenu';

export const CollapsibleMenu = observer((props: CollapsibleMenuProps) => {
  const [activeEntryId, setActiveEntryId] = useState<CollapsibleMenuProps['activeEntryId']>();
  const [expandedEntryIds, setExpandedEntryIds] = useState<ControlledCollapsibleMenuProps['expandedEntryIds']>([]);

  return (
    <ControlledCollapsibleMenu
      activeEntryId={activeEntryId}
      expandedEntryIds={expandedEntryIds}
      updateExpandedEntryIds={(expandedEntryIds) => setExpandedEntryIds(expandedEntryIds)}
      updateActiveEntryId={(activeEntryId) => setActiveEntryId(activeEntryId)}
      {...props}
    />
  );
});
