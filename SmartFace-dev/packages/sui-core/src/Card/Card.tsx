import { S } from './Card.styles';
import type { CardProps } from './Card.types';
import { CardContext } from './CardContext';

export const Card = ({ fullHeight, ...otherProps }: CardProps) => (
  <CardContext.Provider value={{ fullHeight }}>
    <S.Container fullHeight={fullHeight} {...otherProps} />
  </CardContext.Provider>
);
