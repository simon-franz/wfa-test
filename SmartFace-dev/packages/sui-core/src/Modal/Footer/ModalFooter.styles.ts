import styled from '@emotion/styled';

import { S as ModalRendererStyles } from '../ModalRenderer/ModalRenderer.styles';

const Footer = styled.div(({ theme }) => ({
  padding: ModalRendererStyles.componentConfig.contentPadding,
  borderTop: `1px solid ${theme.sqwTier2Color.border.bold}`,
}));

export const S = {
  Footer,
} as const;
