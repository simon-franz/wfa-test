import { observer } from 'mobx-react';
import { useContext } from 'react';

import { GridContext } from '../Grid/GridContext';
import { S } from './GridItem.styles';
import type { GridItemProps } from './GridItem.types';

export const GridItem = observer(({ visible = true, size, offset, ...otherProps }: GridItemProps) => {
  const { size: sizeFromContext } = useContext(GridContext);
  const _size = size || sizeFromContext;

  return <S.Item visible={visible} $size={_size} $offset={offset} {...otherProps} />;
});
