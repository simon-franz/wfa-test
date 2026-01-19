import styled from '@emotion/styled';
import { overflowBreakWord } from '@hrworks/design-system/stylePresets';

import { HTML as _HTML } from '../Html';
import _Label from '../Label';
import type { FormTextProps as _FormTextProps } from './FormText.types';

type FormTextProps = Pick<Required<_FormTextProps>, 'alignItems' | 'size'>;
const FormText = styled.div<FormTextProps>(({ theme, alignItems, size }) => ({
  ...theme.sqwTier2Typography.bodySm,
  display: 'flex',
  color: theme.sqwTier2Color.text.info.default,
  flexDirection: 'column',
  fontSize: theme.marko.typography.sqwFontSizes[size],
  alignItems,
}));

const Label = styled(_Label)(({ theme }) => [
  overflowBreakWord,
  {
    cursor: 'default',
    color: theme.sqwTier2Color.text.subtle,
  },
]);

const HTML = styled(_HTML)(overflowBreakWord);

const Value = styled.span(overflowBreakWord);

export const S = {
  FormText,
  Label,
  HTML,
  Value,
} as const;
