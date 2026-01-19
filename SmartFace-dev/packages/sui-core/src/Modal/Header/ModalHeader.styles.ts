import styled from '@emotion/styled';
import { overflowBreakWord } from '@hrworks/design-system';

import { S as ModalRendererStyles } from '../ModalRenderer/ModalRenderer.styles';

const Header = styled.div(({ theme }) => [
  overflowBreakWord,
  {
    display: 'flex',
    height: 'min-content',
    maxHeight: 120,
    minHeight: 80,
    padding: ModalRendererStyles.componentConfig.contentPadding,
    paddingRight: 59,
    borderRadius: 0,
    borderBottom: `1px solid ${theme.sqwTier2Color.border.bold}`,
  },
]);

export const S = {
  Header,
} as const;
