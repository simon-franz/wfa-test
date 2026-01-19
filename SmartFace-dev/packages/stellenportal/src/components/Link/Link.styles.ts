import styled from '@emotion/styled';

import { Link as _Link } from '../../i18n/navigation';

const Link = styled(_Link)({
  textDecoration: 'none',
  color: 'inherit',
});

export const S = {
  Link,
} as const;
