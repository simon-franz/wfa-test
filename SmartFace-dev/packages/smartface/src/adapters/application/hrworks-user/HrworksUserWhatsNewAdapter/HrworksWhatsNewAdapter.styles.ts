import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

const ChildrenWrapper = styled.div({
  display: 'flex',

  [mq.isLargeDevice]: {
    justifyContent: 'end',
  },
});

export const S = {
  ChildrenWrapper,
};
