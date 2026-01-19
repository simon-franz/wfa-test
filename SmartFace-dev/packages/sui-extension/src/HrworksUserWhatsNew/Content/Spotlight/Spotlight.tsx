import { LocalizationContext } from '@hrworks/localization';
import Button from '@hrworks/sui-core/Button';
import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { S } from './Spotlight.styles';
import type { SpotlightProps } from './Spotlight.types';

export const Spotlight = observer(
  ({ date, statusBadge, tags, imgSrc, contentSrc, children, ...otherProps }: SpotlightProps) => {
    const { translate } = useContext(LocalizationContext);

    return (
      <S.Container {...otherProps}>
        <S.SpotlightImage imgSrc={imgSrc} />
        <S.Content imageExists={!!imgSrc}>
          <S.Title>{translate('whats-new-spotlight-title')}</S.Title>
          {(date || statusBadge) && (
            <S.SubHeader>
              {date && <S.Date>{date}</S.Date>}
              {statusBadge}
            </S.SubHeader>
          )}
          {tags && <S.TagList tags={tags} />}
          {children && <S.Wrapper>{children}</S.Wrapper>}
          {contentSrc && (
            <Button href={contentSrc} target="_blank" leftIcon={<FontAwesomeIcon name="up-right-from-square" />}>
              {translate('whats-new-spotlight-continue')}
            </Button>
          )}
        </S.Content>
      </S.Container>
    );
  },
);
