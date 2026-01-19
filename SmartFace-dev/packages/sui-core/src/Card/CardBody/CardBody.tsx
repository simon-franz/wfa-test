import { useContext } from 'react';

import { CardContext } from '../CardContext';
import { S } from './CardBody.styles';
import type { CardBodyProps } from './CardBody.types';

export const CardBody = (props: CardBodyProps) => {
  const { fullHeight } = useContext(CardContext);

  return <S.Body fullHeight={fullHeight} {...props} />;
};
