import { SqwProfileMenu } from '@hrworks/sui-extension/SqwProfileMenu';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { ComponentMapper, mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import type { SqwProfileMenuAdapterProps } from './SqwProfileMenuAdapter.types';

export const SqwProfileMenuAdapter = observer(
  ({ portrait, onPortraitAction, componentChildren, ...otherProps }: SqwProfileMenuAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);

    const _onPortraitAction = onPortraitAction && (() => applyEvents(onPortraitAction));
    const _portrait = portrait && <ComponentMapper smartFaceComponent={portrait} />;
    const children = mapSmartFaceComponentsToAdapters(componentChildren);

    return (
      <SqwProfileMenu portrait={_portrait} children={children} onPortraitAction={_onPortraitAction} {...otherProps} />
    );
  },
);
