import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import { observer } from 'mobx-react';

import { TagList } from '../../TagList';
import { S } from './NewsItem.styles';
import type { NewsItemProps } from './NewsItem.types';

export const NewsItem = observer(({ contentSrc, date, tags, title, ...otherProps }: NewsItemProps) => (
  <S.ListItem key={title} {...otherProps}>
    <S.ListItemContent>
      <S.TitleDateContainer>
        <S.NewsTitle headerTag="h4">{title}</S.NewsTitle>
        <S.NewsDate>{date}</S.NewsDate>
      </S.TitleDateContainer>
      {contentSrc && (
        <S.Button href={contentSrc} target="_blank" variant="unstyled">
          <FontAwesomeIcon name="up-right-from-square" />
        </S.Button>
      )}
    </S.ListItemContent>
    {tags && <TagList tags={tags} />}
  </S.ListItem>
));
