import { observer } from 'mobx-react';

import { S } from './PortrayedListItem.styles';
import type { PortrayedListItemProps } from './PortrayedListItem.types';

export const PortrayedListItem = observer(
  ({ media, title, subtitle, children, ...otherProps }: PortrayedListItemProps) => (
    <S.ListItem {...otherProps}>
      {media && <S.Media>{media}</S.Media>}
      <S.TitleContainer>
        <S.Title>{title}</S.Title>
        {subtitle && <S.SubTitle>{subtitle}</S.SubTitle>}
      </S.TitleContainer>
      {children && <S.Wrapper>{children}</S.Wrapper>}
    </S.ListItem>
  ),
);
