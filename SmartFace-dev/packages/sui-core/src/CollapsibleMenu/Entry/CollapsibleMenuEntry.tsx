import { useTheme } from '@emotion/react';
import extractNumbersFromString from '@hrworks/sui-shared/functions/extractNumbersFromString';
import { observer } from 'mobx-react';
import { type MouseEvent, useCallback, useContext, useId, useMemo } from 'react';

import Icon from '../../Icon';
import { ControlledCollapsibleMenuContext } from '../ControlledCollapsibleMenuContext';
import CollapsibleMenuBaseItem from './BaseItem';
import { S } from './CollapsibleMenuEntry.styles';
import type { CollapsibleMenuEntryProps } from './CollapsibleMenuEntry.types';

export const CollapsibleMenuEntry = observer(
  ({ children, id: _id, onClick: onClickFromProps, href, ...otherProps }: CollapsibleMenuEntryProps) => {
    const generatedId = useId();
    const id = _id || generatedId;

    const {
      updateActiveEntryId,
      expand: expandFromContext,
      isExpanded,
      collapse,
      isParentExpanded,
      isActive,
      multiple,
      nestingLevel = 1,
    } = useContext(ControlledCollapsibleMenuContext);

    const animationVariants = {
      expanded: { height: 'auto' },
      closed: { height: 0 },
    };

    const expand = useCallback(
      (expandedEntryIds: Array<string>) => {
        expandFromContext([...expandedEntryIds, id]);
      },
      [expandFromContext, id],
    );

    const changeExpanded = useCallback(() => {
      if (isExpanded(id)) {
        collapse(id);
      } else {
        expandFromContext([id]);
      }
    }, [collapse, expandFromContext, id, isExpanded]);

    const onClickItem = useCallback(
      (event: MouseEvent<HTMLLIElement>) => {
        if (typeof onClickFromProps === 'function') {
          updateActiveEntryId && updateActiveEntryId(id);
          onClickFromProps(event);
        } else if (typeof href !== 'string' && children) {
          event.preventDefault();
          changeExpanded();
        }
      },
      [changeExpanded, children, href, id, onClickFromProps, updateActiveEntryId],
    );

    const onClickIcon = useCallback(
      (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        changeExpanded();
      },
      [changeExpanded],
    );

    const expanded = useMemo(() => isParentExpanded && isExpanded(id), [id, isExpanded, isParentExpanded]);
    const animationDuration = Number(extractNumbersFromString(useTheme().marko.variables.animationDuration.normal));

    return children ? (
      <CollapsibleMenuBaseItem
        id={id}
        onClick={onClickItem}
        href={href}
        data-expanded={expanded}
        expandToggleChildren={
          <S.IconContainer onClick={onClickIcon}>
            <S.IconWrapper expanded={expanded}>
              <Icon name="collapsible-menu-submenu-arrow" />
            </S.IconWrapper>
          </S.IconContainer>
        }
        {...otherProps}
      >
        <S.Submenu
          initial={expanded ? 'expanded' : 'closed'}
          animate={expanded ? 'expanded' : 'closed'}
          variants={animationVariants}
          transition={{ duration: animationDuration }}
          css={{ '--nestingLevel': nestingLevel }}
        >
          <S.SubmenuList>
            <ControlledCollapsibleMenuContext.Provider
              value={{
                isActive,
                isExpanded,
                expand,
                collapse,
                updateActiveEntryId,
                isParentExpanded: expanded,
                multiple,
                nestingLevel: nestingLevel + 1,
              }}
            >
              {children}
            </ControlledCollapsibleMenuContext.Provider>
          </S.SubmenuList>
        </S.Submenu>
      </CollapsibleMenuBaseItem>
    ) : (
      <CollapsibleMenuBaseItem href={href} onClick={onClickFromProps && onClickItem} id={id} {...otherProps} />
    );
  },
);
