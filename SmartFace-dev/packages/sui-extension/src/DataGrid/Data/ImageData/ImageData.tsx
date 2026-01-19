import { observer } from 'mobx-react';
import { useContext } from 'react';

import { DataGridContext } from '../../DataGridContext';
import { S } from './ImageData.styles';
import type { ImageDataProps } from './ImageData.types';

export const ImageData = observer(({ value, ...otherProps }: ImageDataProps) => {
  const { density } = useContext(DataGridContext);

  return typeof value === 'string' ? <S.Image src={value} density={density} {...otherProps} /> : null;
});
