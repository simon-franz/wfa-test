import { Title } from '@hrworks/sui-core/Title/Title';
import { observer } from 'mobx-react';

import { S } from './HeaderAreaTitle.styles';
import type { HeaderAreaTitleProps } from './HeaderAreaTitle.types';

export const HeaderAreaTitle = observer(
  ({
    title,
    subtitle,
    titleChildren,
    subtitleChildren,
    titleSize = 'extraLarge',
    subtitleSize = 'medium',
  }: HeaderAreaTitleProps) => {
    return (
      <S.Container>
        {(title || titleChildren) && (
          <Title size={titleSize} breakTitleChildrenWithChildren titleChildren={titleChildren}>
            {title}
          </Title>
        )}
        {(subtitle || subtitleChildren) && (
          <S.Subtitle
            headerTag="h2"
            size={subtitleSize}
            breakTitleChildrenWithChildren
            titleChildren={subtitleChildren}
          >
            {subtitle}
          </S.Subtitle>
        )}
      </S.Container>
    );
  },
);
