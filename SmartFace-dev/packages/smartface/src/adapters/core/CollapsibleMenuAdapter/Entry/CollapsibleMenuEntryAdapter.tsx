import CollapsibleMenuEntry from '@hrworks/sui-core/CollapsibleMenu/Entry';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { type MouseEvent, useContext } from 'react';

import { ComponentMapper } from '../../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import { mapCollapsibleMenuComponentPart } from '../CollapsibleMenuAdapter';
import type { CollapsibleMenuEntryAdapterProps } from './CollapsibleMenuEntryAdapter.types';

export const CollapsibleMenuEntryAdapter = observer(
  ({
    badge,
    componentParts,
    icon,
    onClick,
    text = MISSING_STRING,
    ...otherProps
  }: CollapsibleMenuEntryAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);

    const _badge = badge && <ComponentMapper smartFaceComponent={badge} />;
    const _icon = icon && <ComponentMapper smartFaceComponent={icon} />;
    const children = componentParts?.map((componentPart) => mapCollapsibleMenuComponentPart(componentPart));

    const _onClick =
      onClick &&
      ((event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        applyEvents(onClick);
      });

    return (
      <CollapsibleMenuEntry
        badge={_badge}
        icon={_icon}
        onClick={_onClick}
        text={text}
        children={children}
        {...otherProps}
      />
    );
  },
);
