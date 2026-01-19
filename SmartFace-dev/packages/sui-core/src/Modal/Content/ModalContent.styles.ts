import styled from '@emotion/styled';

import { Scroller } from '../../Scroller';
import { S as ModalRendererStyles } from '../ModalRenderer/ModalRenderer.styles';

const Content = styled(Scroller)({
  position: 'relative',
  flex: '1 1 auto',
  flexGrow: 1,
  minHeight: 0,
  overflowY: 'auto',
  padding: ModalRendererStyles.componentConfig.contentPadding,
});

export const S = {
  Content,
} as const;
