import { useContext } from 'react';

import { CarouselContext } from '../CarouselContext';
import { S } from './PaginationButton.styles';

export const PaginationButton = () => {
  const { currentIndex, scrollSnaps, scrollTo } = useContext(CarouselContext);

  return (
    <S.PaginationContainer>
      {scrollSnaps.map((_, index) => (
        <S.PaginationButton key={index} onClick={() => scrollTo(index)} isSelected={index === currentIndex} />
      ))}
    </S.PaginationContainer>
  );
};
