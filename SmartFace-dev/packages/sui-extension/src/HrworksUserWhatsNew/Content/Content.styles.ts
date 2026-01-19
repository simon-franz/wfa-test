import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system/mediaQueries';

import { SqwLayoutStyles } from '../../SqwLayout';

const Wrapper = styled.div({
  padding: SqwLayoutStyles.componentConfig.content.desktopPadding,
  [mq.isSmallDevice]: {
    padding: SqwLayoutStyles.componentConfig.content.mobilePadding,
  },
  flexGrow: 1,
});

const Container = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  gap: SqwLayoutStyles.componentConfig.content.desktopPadding,
  [mq.isSmallDevice]: {
    gap: SqwLayoutStyles.componentConfig.content.mobilePadding,
    flexDirection: 'column',
  },
});

export const S = {
  Wrapper,
  Container,
} as const;
