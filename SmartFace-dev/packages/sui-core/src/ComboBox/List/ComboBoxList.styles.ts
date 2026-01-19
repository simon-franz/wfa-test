import styled from '@emotion/styled';
import { overflowHyphens, shouldForwardProp } from '@hrworks/design-system';
import { detectBrowser } from '@hrworks/sui-shared/functions/detectBrowser';
import { useMemo } from 'react';

import type { UseComboBoxListReturn } from '../';
import type { ComboBoxListProps } from './ComboBoxList.types';
import { ComboBoxOption as _ComboBoxOption } from './Option';

const componentConfig = {
  padding: `calc(0.313em + 0.5em) calc(16px - 5px + 0.313em)`,
  itemFontSize: '0.875em',
};

type List = Pick<Required<ComboBoxListProps>, 'size'> &
  Pick<Required<UseComboBoxListReturn>, 'virtualItems' | 'height'>;

const List = styled.div<List>(({ theme, size, virtualItems, height }) => {
  const isSafari = useMemo(() => detectBrowser() === 'Safari', []);

  return [
    overflowHyphens,
    {
      position: 'relative',
      fontSize: theme.marko.typography.sqwFontSizes[size],
      ...(isSafari && {
        marginRight: 14,
      }), // Fix because on Safari scrollbar-gutters (NativeScrollbar) not supported
      ...(virtualItems == null || virtualItems.length === 0
        ? {
            height: 'auto',
          }
        : {
            height,
          }),
    },
  ];
});

const Loading = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1em',
  padding: componentConfig.padding,
  fontSize: componentConfig.itemFontSize,
});

const NotFound = styled.div({
  cursor: 'default',
  padding: componentConfig.padding,
  fontSize: componentConfig.itemFontSize,
});

const ComboBoxOption = styled(_ComboBoxOption, {
  shouldForwardProp,
})<{
  $itemStart: number;
}>(({ $itemStart }) => ({
  position: 'absolute',
  fontSize: componentConfig.itemFontSize,
  width: '100%',
  transform: `translateY(${$itemStart}px)`,
}));

const LoadingAbsolute = styled(Loading)<{
  itemStart: number;
}>(({ itemStart }) => ({
  position: 'absolute',
  transform: `translateY(${itemStart}px)`,
}));

export const S = {
  List,
  Loading,
  NotFound,
  ComboBoxOption,
  LoadingAbsolute,
} as const;
