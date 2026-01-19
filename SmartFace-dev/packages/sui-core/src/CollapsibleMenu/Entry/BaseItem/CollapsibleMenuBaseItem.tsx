import { observer } from 'mobx-react';
import { useContext, useMemo } from 'react';

import { ControlledCollapsibleMenuContext } from '../../ControlledCollapsibleMenuContext';
import { S } from './CollapsibleMenuBaseItem.styles';
import type { BaseItemProps } from './CollapsibleMenuBaseItem.types';

export const CollapsibleMenuBaseItem = observer(
  ({
    badge,
    children,
    href,
    icon,
    id,
    onClick,
    expandToggleChildren,
    target,
    text,
    isNotClickable,
    ...otherProps
  }: BaseItemProps) => {
    const { isActive, isParentExpanded } = useContext(ControlledCollapsibleMenuContext);

    const active = useMemo(() => Boolean(id && isActive(id)), [id, isActive]);

    return (
      <S.ItemContainer id={id} data-hasicon={Boolean(icon)} {...otherProps}>
        <S.Item
          tabIndex={isParentExpanded ? 0 : -1}
          variant="subtle"
          color="primary"
          href={href}
          target={target}
          onClick={onClick}
          $active={active}
          $showDefaultCursor={!onClick && href == undefined}
          data-active={active}
        >
          <S.LinkContent>
            {icon && <S.IconContainer>{icon}</S.IconContainer>}
            {text}
          </S.LinkContent>
          {badge}
          {expandToggleChildren}
        </S.Item>
        {children}
      </S.ItemContainer>
    );
  },
);
