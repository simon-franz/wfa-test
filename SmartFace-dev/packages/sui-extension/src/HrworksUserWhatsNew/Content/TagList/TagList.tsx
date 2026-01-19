import Tooltip from '@hrworks/sui-core/Tooltip';
import { useElementDimensions } from '@hrworks/sui-shared/hooks/useElementDimensions';
import { observer } from 'mobx-react';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import { S } from './TagList.styles';
import type { TagListProps } from './TagList.types';

export const TagList = observer(({ tags, ...otherProps }: TagListProps) => {
  const tagListRef = useRef<HTMLUListElement>(null);
  const { width } = useElementDimensions(tagListRef);
  const [tagWidths, setTagWidths] = useState<{ [key: string]: number }>({});
  const [visibleTags, setVisibleTags] = useState<string[]>(tags);
  const hasHiddenTags = useRef(false);
  const isCalculationComplete = useRef(false);
  const tagIds = useRef(tags.map(() => useId()));

  useLayoutEffect(() => {
    if (tagListRef.current) {
      const newTagWidths: { [key: string]: number } = {};
      tagListRef.current.querySelectorAll('li').forEach((li, index) => {
        newTagWidths[tagIds.current[index]] = li.getBoundingClientRect().width;
      });
      setTagWidths(newTagWidths);
    }
  }, [tags]);

  useEffect(() => {
    if (width === 0) {
      return;
    }

    const INDICATOR_WIDTH = 30;
    let tagWidthSum = 0;
    const _visibleTags: string[] = [];
    hasHiddenTags.current = false;

    for (const [i, tag] of tags.entries()) {
      tagWidthSum += tagWidths[tagIds.current[i]];
      if (tagWidthSum <= width - INDICATOR_WIDTH) {
        _visibleTags.push(tag);
      } else {
        hasHiddenTags.current = true;
        break;
      }
    }

    isCalculationComplete.current = true;
    setVisibleTags(_visibleTags);
  }, [tagWidths, tags, width]);

  const hiddenTags = tags.slice(visibleTags.length);

  return (
    <S.TagList ref={tagListRef} {...otherProps}>
      {visibleTags.map((tag, index) => (
        <S.ListItem key={tagIds.current[index]} hide={!isCalculationComplete.current}>
          {tag}
        </S.ListItem>
      ))}
      {hasHiddenTags.current && (
        <Tooltip trigger="hoverOrTouch" text={hiddenTags.join(` - `)} unstyledTrigger={true} htmlTag="li">
          {`+${hiddenTags.length}`}
        </Tooltip>
      )}
    </S.TagList>
  );
});
