import { ConditionalWrapper } from '@hrworks/sui-shared/components/ConditionalWrapper';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { ListContext } from '../ListContext';
import { S } from './ListItem.styles';
import type { ListItemProps } from './ListItem.types';

export const ListItem = observer(({ id, children, onClick, href, target, ...otherProps }: ListItemProps) => {
  const { isSelected, hoverable } = useContext(ListContext);
  const selected = id && isSelected(id);
  const clickable = Boolean(onClick || href);

  return (
    <S.ListItem selected={selected} hoverable={hoverable} clickable={clickable} {...otherProps}>
      <ConditionalWrapper
        condition={clickable}
        wrapper={(children) => (
          <S.ButtonWrapper variant="unstyled" $hoverable={hoverable} onClick={onClick} href={href} target={target}>
            {children}
          </S.ButtonWrapper>
        )}
      >
        {children}
      </ConditionalWrapper>
    </S.ListItem>
  );
});
