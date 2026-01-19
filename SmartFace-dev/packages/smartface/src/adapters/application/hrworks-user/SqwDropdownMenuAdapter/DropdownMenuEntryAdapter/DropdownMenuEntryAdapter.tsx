import { DropdownMenuEntry } from '@hrworks/sui-extension/SqwDropdownMenu';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { type MouseEvent, useContext } from 'react';

import { ComponentMapper } from '../../../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../../../main/components/SmartFaceContext';
import { mapSqwDropdownMenuComponentPart } from '../mapSqwDropdownMenuComponentPart';
import type { DropdownMenuEntryAdapterProps } from './DropdownMenuEntryAdapter.types';

export const DropdownMenuEntryAdapter = observer(
  ({ text = MISSING_STRING, badge, icon, componentParts, onClick, ...otherProps }: DropdownMenuEntryAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);

    const _badge = badge && <ComponentMapper smartFaceComponent={badge} />;
    const _icon = icon && <ComponentMapper smartFaceComponent={icon} />;
    const submenu = componentParts?.map((componentPart) => mapSqwDropdownMenuComponentPart(componentPart));
    const _onClick =
      onClick &&
      ((event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        applyEvents(onClick);
      });

    return (
      <DropdownMenuEntry
        children={text}
        badge={_badge}
        icon={_icon}
        submenu={submenu}
        onClick={_onClick}
        {...otherProps}
      />
    );
  },
);
