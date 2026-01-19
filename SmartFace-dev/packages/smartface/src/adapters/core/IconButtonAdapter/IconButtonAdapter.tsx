import IconButton from '@hrworks/sui-core/IconButton';
import { observer } from 'mobx-react';
import { type MouseEvent, useContext } from 'react';

import { ComponentMapper } from '../../../main/components/ComponentMapper';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { IconButtonAdapterProps } from './IconButtonAdapter.types';

export const IconButtonAdapter = observer(({ onClick, icon, ...otherProps }: IconButtonAdapterProps) => {
  const { applyEvents } = useContext(SmartFaceContext);
  const { defaultSize } = useContext(DefaultValueContext);

  const _onClick =
    onClick &&
    ((event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      applyEvents(onClick);
    });

  const children = icon && <ComponentMapper smartFaceComponent={icon} />;

  return <IconButton children={children} onClick={_onClick} size={defaultSize} {...otherProps} />;
});
