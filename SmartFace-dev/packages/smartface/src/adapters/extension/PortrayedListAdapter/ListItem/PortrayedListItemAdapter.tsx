import PortrayedListItem from '@hrworks/sui-extension/PortrayedList/ListItem';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { ComponentMapper, mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import type { PortrayedListItemAdapterProps } from './PortrayedListItemAdapter.types';

export const PortrayedListItemAdapter = observer(
  ({ media, extrasChildren, onClick, title = MISSING_STRING, ...otherProps }: PortrayedListItemAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);

    const _media = media && <ComponentMapper smartFaceComponent={media} />;

    const children = mapSmartFaceComponentsToAdapters(extrasChildren);

    const _onClick = onClick && (() => applyEvents(onClick));

    return <PortrayedListItem title={title} media={_media} children={children} onClick={_onClick} {...otherProps} />;
  },
);
