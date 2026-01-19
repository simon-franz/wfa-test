import styled from '@emotion/styled';
import { shouldForwardProp } from '@hrworks/design-system/emotionUtils';
import type { Size } from '@hrworks/types/shared/UiTypes';

import Button from '../../Button';
import IconButton from '../../IconButton';

const componentConfig = {
  labelMinWidth: {
    extraSmall: 170,
    small: 170,
    medium: 170,
    large: 250,
    extraLarge: 250,
  },
};
type ContainerType = {
  isSingleMonth: boolean;
  isFirstMonth: boolean;
};

const Container = styled.div<ContainerType>(({ isSingleMonth, isFirstMonth }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: isSingleMonth ? 'space-between' : 'center',
  paddingBottom: '1.042em',
  flexDirection: isSingleMonth || isFirstMonth ? 'row' : 'row-reverse',
}));

const ArrowContainer = styled.div({
  display: 'flex',
  gap: '0.5em',
});
type ArrowType = {
  $rotate?: boolean;
  $hidden?: boolean;
};

const Arrow = styled(IconButton, {
  shouldForwardProp,
})<ArrowType>(({ $rotate, $hidden }) => [
  {
    ...($rotate && {
      transform: 'rotate(180deg)',
    }),
    ...($hidden && {
      visibility: 'hidden',
    }),
  },
]);

const CaptionContainer = styled.div<{
  size: Size;
  isSingleMonth: boolean;
}>(({ size, isSingleMonth }) => ({
  display: 'flex',
  whiteSpace: 'nowrap',
  fontSize: '1.389em',
  alignItems: 'center',
  justifyContent: isSingleMonth ? 'flex-start' : 'center',
  minWidth: componentConfig.labelMinWidth[size],
}));

const Caption = styled(Button, {
  shouldForwardProp,
})<{
  $notClickable: boolean;
}>(({ $notClickable, size }) => [
  {
    flex: 0,
    justifyContent: 'center',
    fontSize: size === 'large' || size === 'extraLarge' ? '1.5rem' : '1rem',
    ...($notClickable && {
      pointerEvents: 'none',
      cursor: 'default',
    }),
  },
]);

export const S = {
  Container,
  ArrowContainer,
  Arrow,
  CaptionContainer,
  Caption,
} as const;
