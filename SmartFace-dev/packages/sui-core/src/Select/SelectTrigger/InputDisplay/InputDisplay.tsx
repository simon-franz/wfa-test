import { observer } from 'mobx-react';

import { S as ListItemStyles } from '../../SelectList/SelectListItem/SelectListItem.styles';
import { S } from './InputDisplay.styles';
import type { InputDisplayProps } from './InputDisplay.types';

export const InputDisplay = observer(({ media, label }: InputDisplayProps) => (
  <>
    {media && <ListItemStyles.MediaWrapper>{media}</ListItemStyles.MediaWrapper>}
    {label && <S.Label>{label}</S.Label>}
  </>
));
