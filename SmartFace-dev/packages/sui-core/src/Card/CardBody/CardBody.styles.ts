import styled from '@emotion/styled';

import { S as CardStyles } from '../Card.styles';
import type { CardBodyProps } from './CardBody.types';

const Body = styled.div<Pick<CardBodyProps, 'fullHeight'>>(({ fullHeight }) => ({
  padding: CardStyles.componentConfig.padding,
  ...(fullHeight && {
    flex: '1',
  }),
}));

export const S = {
  Body,
} as const;
