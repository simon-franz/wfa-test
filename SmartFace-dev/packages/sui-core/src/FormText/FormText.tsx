import { observer } from 'mobx-react';

import { S } from './FormText.styles';
import type { FormTextProps } from './FormText.types';

export const FormText = observer(
  ({ label, labelChildren, value, size = 'medium', alignItems = 'start', html, ...otherProps }: FormTextProps) => (
    <S.FormText alignItems={alignItems} size={size} {...otherProps}>
      <S.Label label={label}>{labelChildren}</S.Label>
      {html ? <S.HTML html={value} /> : <S.Value>{value}</S.Value>}
    </S.FormText>
  ),
);
