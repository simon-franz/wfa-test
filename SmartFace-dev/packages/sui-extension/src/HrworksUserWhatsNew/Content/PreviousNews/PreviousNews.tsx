import { LocalizationContext } from '@hrworks/localization';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { S } from './PreviousNews.styles';
import type { PreviousNewsProps } from './PreviousNews.types';

export const PreviousNews = observer(({ children, ...otherProps }: PreviousNewsProps) => {
  const { translate } = useContext(LocalizationContext);

  return (
    <S.Container {...otherProps}>
      <S.SectionTitle>{translate('whats-new-previous')}</S.SectionTitle>
      <S.Scroller>
        <S.List hoverable={false} lineStyle="none">
          {children}
        </S.List>
      </S.Scroller>
    </S.Container>
  );
});
