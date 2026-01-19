import styled from '@emotion/styled';

const Container = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
});

const Tag = styled.span(({ theme }) => ({
  color: theme.stellenportal.buttonStyle?.color || theme.sqwTier2Color.text.brand.default,
  '&:not(:last-child)::after': {
    content: '"-"',
    marginLeft: '0.5em',
    marginRight: '0.5em',
  },
}));

export const S = {
  Tag,
  Container,
} as const;
