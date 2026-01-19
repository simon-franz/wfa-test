import { MaterialDesignIcon } from '@hrworks/sui-core/MaterialDesignIcon';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { CarouselContext } from '../CarouselContext';
import { S } from './NavigationButton.styles';
import type { NavigationButtonProps } from './NavigationButton.types';

export const NavigationButton = observer(
  ({ direction, onPrevButtonClick, onNextButtonClick, ...otherProps }: NavigationButtonProps) => {
    const { prevDisabled, nextDisabled, scrollPrev, scrollNext } = useContext(CarouselContext);

    const isDisabled = direction === 'prev' ? prevDisabled : nextDisabled;

    const onClick = () => {
      if (direction === 'prev') {
        if (onPrevButtonClick) {
          onPrevButtonClick();
        } else {
          scrollPrev();
        }
      } else {
        if (onNextButtonClick) {
          onNextButtonClick();
        } else {
          scrollNext();
        }
      }
    };

    return (
      <S.NavigationButton
        size="small"
        disabled={isDisabled}
        direction={direction}
        onClick={onClick}
        color="secondary"
        {...otherProps}
      >
        <MaterialDesignIcon name="arrow_downward" />
      </S.NavigationButton>
    );
  },
);
