import Button from '@hrworks/sui-core/Button';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { type MouseEvent, useContext } from 'react';

import { ComponentMapper } from '../../../main/components/ComponentMapper';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { ButtonAdapterProps } from './ButtonAdapter.types.ts';

export const ButtonAdapter = observer(
  ({ onClick, leftIcon, text = MISSING_STRING, rightIcon, ...otherProps }: ButtonAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);
    const { defaultSize } = useContext(DefaultValueContext);

    const _onClick =
      onClick &&
      ((event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        applyEvents(onClick);
      });

    const _leftIcon = leftIcon && <ComponentMapper smartFaceComponent={leftIcon} />;
    const _rightIcon = rightIcon && <ComponentMapper smartFaceComponent={rightIcon} />;

    return (
      <Button
        children={text}
        leftIcon={_leftIcon}
        rightIcon={_rightIcon}
        onClick={_onClick}
        size={defaultSize}
        {...otherProps}
      />
    );
  },
);
