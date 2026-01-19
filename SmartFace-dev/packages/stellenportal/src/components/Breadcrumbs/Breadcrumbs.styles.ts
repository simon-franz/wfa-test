import styled from '@emotion/styled';

import { Link as NextLink } from '../Link';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const Breadcrumb = styled.span({
  '&:not(:last-child)::after': {
    content: '"/"',
    marginLeft: '0.5em',
    marginRight: '0.5em',
  },
  ':last-child': {
    textDecoration: 'underline',
  },
});

const Link = styled(NextLink)(({ theme }) => ({
  color: theme.stellenportal.fontStyle?.color || theme.sqwTier2Color.text.brand.default,
}));

export const S = {
  Container,
  Breadcrumb,
  Link,
} as const;
