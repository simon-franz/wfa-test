import { LocalizationContext } from '@hrworks/localization';
import Icon from '@hrworks/sui-core/Icon';
import { observer } from 'mobx-react';
import { type MouseEvent, useCallback, useContext, useState } from 'react';

import { S as NestedChecklistStyles } from '../NestedChecklist.styles';
import { NestedChecklistContext } from '../NestedChecklistContext';
import { S } from './NestedChecklistEntry.styles';
import type { NestedChecklistEntryProps } from './NestedChecklistEntry.types';

export const NestedChecklistEntry = observer(
  ({
    id,
    label,
    size,
    expanded,
    checked,
    onFetchEntries,
    onExpandedChange,
    onCheckedChange,
    onCheckAllRecursively,
    children,
    ...otherProps
  }: NestedChecklistEntryProps) => {
    const { size: contextSize } = useContext(NestedChecklistContext);
    const _size = size || contextSize || 'medium';

    const { translate } = useContext(LocalizationContext);

    const [isLoading, setIsLoading] = useState(false);

    const onExpand = useCallback(
      async (expanded: boolean) => {
        onExpandedChange?.(expanded);
        if (onFetchEntries && expanded) {
          setIsLoading(true);
          await onFetchEntries();
          setIsLoading(false);
        }
      },
      [onExpandedChange, onFetchEntries],
    );

    const onSelectAllClick = (event: MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      onCheckAllRecursively?.(!checked);
      onExpand(true);
    };

    const onExpandClick = useCallback(
      (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        onExpand(!expanded);
      },
      [expanded, onExpand],
    );

    return (
      <S.GridContainer size={_size} id={id} aria-expanded={expanded} {...otherProps}>
        <S.SelectAllArea onClick={onSelectAllClick} aria-hidden />

        {/* ARROW */}
        {(children || onFetchEntries) && (
          <S.ArrowArea onClick={onExpandClick}>
            <S.IconWrapper expanded={expanded}>
              <Icon name="nested-checklist-expand-arrow" />
            </S.IconWrapper>
          </S.ArrowArea>
        )}

        {/* CHECKBOX */}
        <S.Checkbox
          key={id}
          name={id}
          data-get-form-data-ignore
          label={label}
          checked={checked}
          size={_size}
          onValueChange={() => onCheckedChange?.(!checked)}
        />

        {/* SELECT ALL  */}
        {(children || onFetchEntries) && (
          <S.SelectAllWrapper onClick={onSelectAllClick} aria-hidden>
            <S.SelectAllToggle>{translate(checked ? 'deselect-all' : 'select-all')}</S.SelectAllToggle>
          </S.SelectAllWrapper>
        )}

        {/* CHILDREN */}
        {expanded && (children || isLoading) && (
          <S.ChildrenArea>
            {children}
            {isLoading && <NestedChecklistStyles.LoadingAnimation type="shimmer" count={3} />}
          </S.ChildrenArea>
        )}
      </S.GridContainer>
    );
  },
);
