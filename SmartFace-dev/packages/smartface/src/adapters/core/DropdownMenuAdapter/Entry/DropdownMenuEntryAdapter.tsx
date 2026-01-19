import { DropdownMenuEntry } from '@hrworks/sui-core/DropdownMenu/DropdownMenuEntry';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { type MouseEvent, useContext } from 'react';

import { ComponentMapper } from '../../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import { mapDropdownMenuComponentPart } from '../DropdownMenuAdapter';
import type { DropdownMenuEntryAdapterProps } from './DropdownMenuEntryAdapter.types';

export const DropdownMenuEntryAdapter = observer(
  ({ componentParts, icon, text = MISSING_STRING, onClick, ...otherProps }: DropdownMenuEntryAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);
    const submenu = componentParts?.map((componentPart) => mapDropdownMenuComponentPart(componentPart));
    const _icon = icon && <ComponentMapper smartFaceComponent={icon} />;
    const _onClick =
      onClick &&
      ((event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        applyEvents(onClick);
      });

    return <DropdownMenuEntry submenu={submenu} icon={_icon} onClick={_onClick} children={text} {...otherProps} />;
  },
);
