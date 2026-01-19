import { StreamlineIcon } from '@hrworks/sui-core/StreamlineIcon';
import { observer } from 'mobx-react';

import { S } from './SqwMenuButton.styles';
import type { SqwMenuButtonProps } from './SqwMenuButton.types';

export const SqwMenuButton = observer(({ badge, icon, text, ...otherProps }: SqwMenuButtonProps) => (
  <S.MenuButton {...otherProps}>
    <S.IconWrapper>{icon}</S.IconWrapper>
    {text}
    {badge}
    <StreamlineIcon name="arrow-down" />
  </S.MenuButton>
));
