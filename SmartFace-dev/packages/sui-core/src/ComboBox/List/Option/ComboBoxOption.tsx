import { escapeRegex } from '@hrworks/sui-shared/functions/escapeRegex';
import { observer } from 'mobx-react';
import { forwardRef, useMemo } from 'react';

import Icon from '../../../Icon';
import { useComboBoxOption } from '../../';
import { S } from './ComboBoxOption.styles';
import type { ComboBoxOptionProps } from './ComboBoxOption.types';

export const ComboBoxOption = observer(
  forwardRef<HTMLDivElement, ComboBoxOptionProps>(({ index, option, ...otherProps }, ref) => {
    const { active, multiple, query, selected, onClick, onMouseMove } = useComboBoxOption(option, index);

    // For bolding the query letters
    const description = useMemo(() => {
      const { text } = option;
      const queryLength = query?.length;
      if (!queryLength) {
        return text;
      }
      const index = text.search(new RegExp(escapeRegex(query), 'i'));
      if (index === -1) {
        return text;
      }

      return (
        <span>
          {text.slice(0, index)}
          <strong>{text.slice(index, index + queryLength)}</strong>
          {text.slice(index + queryLength)}
        </span>
      );
    }, [option, query]);

    return (
      <S.Item ref={ref} onClick={onClick} onMouseMove={onMouseMove} tabIndex={-1} {...otherProps}>
        <S.ItemContent active={active} selected={selected}>
          <S.Description>
            {multiple && <S.Checkbox name="" checked={selected} tabIndex={-1} aria-label={option.text} />}
            {description}
          </S.Description>
          {selected && !multiple && <Icon name="combo-box-item-selected" />}
        </S.ItemContent>
      </S.Item>
    );
  }),
);
