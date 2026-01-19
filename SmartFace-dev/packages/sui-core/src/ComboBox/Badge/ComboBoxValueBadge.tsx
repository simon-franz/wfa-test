import { detectBrowser } from '@hrworks/sui-shared/functions/detectBrowser';
import { observer } from 'mobx-react';
import { type MouseEvent, useCallback, useMemo } from 'react';

import Icon from '../../Icon';
import { useMultiComboBoxBadge } from '../hooks';
import { S } from './ComboBoxValueBadge.styles';
import type { ComboBoxValueBadgeProps } from './ComboBoxValueBadge.types';

export const ComboBoxValueBadge = observer(({ focused, id, text, ...otherProps }: ComboBoxValueBadgeProps) => {
  const { readOnly, disabled, remove } = useMultiComboBoxBadge(id);
  const isNotFirefox = useMemo(() => detectBrowser() !== 'Firefox', []);

  const onIconMouseDown = useCallback(
    (e: MouseEvent<HTMLElement | SVGSVGElement>) => {
      if (isNotFirefox) e.preventDefault();
      e.stopPropagation();
    },
    [isNotFirefox],
  );

  const onIconMouseUp = useCallback((e: MouseEvent<HTMLElement | SVGSVGElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <S.Badge title={text} color="secondary" $focused={focused} {...otherProps}>
      <S.TextWrapper>{text}</S.TextWrapper>
      {!readOnly && (
        <S.IconWrapper
          variant="unstyled"
          disabled={disabled}
          onMouseDown={onIconMouseDown}
          onMouseUp={onIconMouseUp}
          onClick={remove}
        >
          <Icon name="combo-box-clear" />
        </S.IconWrapper>
      )}
    </S.Badge>
  );
});
