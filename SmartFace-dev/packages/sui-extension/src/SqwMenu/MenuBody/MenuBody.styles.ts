import styled from '@emotion/styled';

import { S as ProfileMenuHeaderStyles } from '../MenuHeader/MenuHeader.styles';

const Wrapper = styled.div({
  padding: ProfileMenuHeaderStyles.componentConfig.headerPadding,

  '> :not(:last-child)': {
    marginBottom: ProfileMenuHeaderStyles.componentConfig.headerPadding,
  },
});

export const S = {
  Wrapper,
} as const;
