import IconButton from '@hrworks/sui-core/IconButton';
import { MaterialDesignIcon } from '@hrworks/sui-core/MaterialDesignIcon';
import { CarouselContext } from '@hrworks/sui-extension/Carousel/CarouselContext';
import { useContext } from 'react';

import type { NavigationButtonBProps } from './NavigationButton.types';
import { S } from './NavigatonButton.styles';

export const NavigationButton = ({ direction, ...otherProps }: NavigationButtonBProps) => {
  const { prevDisabled, nextDisabled, scrollPrev, scrollNext } = useContext(CarouselContext);

  const isDisabled = direction === 'prev' ? prevDisabled : nextDisabled;

  if (isDisabled) {
    return;
  }

  const onClick = () => {
    if (direction === 'prev') {
      scrollPrev();
    } else {
      scrollNext();
    }
  };

  return (
    <S.Gradient direction={direction} {...otherProps}>
      <IconButton onClick={onClick} variant="text">
        <MaterialDesignIcon name={direction === 'prev' ? 'arrow_back_ios' : 'arrow_forward_ios'} />
      </IconButton>
    </S.Gradient>
  );
};
