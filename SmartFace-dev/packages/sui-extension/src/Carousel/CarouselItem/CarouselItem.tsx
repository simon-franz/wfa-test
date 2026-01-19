import { observer } from 'mobx-react';
import { useContext } from 'react';

import { CarouselContext } from '../CarouselContext';
import { S } from './CarouselItem.styles';
import type { CarouselItemProps } from './CarouselItem.types';

export const CarouselItem = observer(({ children, onClick, ...otherProps }: CarouselItemProps) => {
  const { slidesToShow } = useContext(CarouselContext);

  return (
    <S.CarouselItem clickable={!!onClick} onClick={onClick} slidesToShow={slidesToShow} {...otherProps}>
      <S.ItemContent>{children}</S.ItemContent>
    </S.CarouselItem>
  );
});
