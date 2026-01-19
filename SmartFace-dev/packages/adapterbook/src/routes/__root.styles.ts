import styled from '@emotion/styled';
import _ClassicLayout from '@hrworks/sui-core/ClassicLayout';
import Switch from '@hrworks/sui-core/Switch';

import { S as ContentStyles } from '@hrworks/sui-core/ClassicLayout/Content/Content.styles';

const ClassicLayout = styled(_ClassicLayout)({
  [`${ContentStyles.ContentChildren}`]: {
    height: '100%',
  },
});

const HeaderContentContainer = styled.div({
  gap: 15,
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
});

const ComboBoxWrapper = styled.div({
  flex: 1,
  maxWidth: 250,
});

const DarkModeSwitch = styled(Switch)({
  justifySelf: 'flex-start',
});

export const S = {
  ClassicLayout,
  HeaderContentContainer,
  ComboBoxWrapper,
  DarkModeSwitch,
} as const;
