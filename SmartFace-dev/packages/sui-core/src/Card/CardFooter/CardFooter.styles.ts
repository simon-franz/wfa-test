import styled from '@emotion/styled';

import { S as CardStyles } from '../Card.styles';

const Footer = styled.div({
  padding: CardStyles.componentConfig.padding,
});

export const S = {
  Footer,
} as const;
