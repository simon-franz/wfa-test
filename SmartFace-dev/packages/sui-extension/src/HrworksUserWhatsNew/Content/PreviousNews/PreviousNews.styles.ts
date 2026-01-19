import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system/mediaQueries';
import _List from '@hrworks/sui-core/List';
import { Scroller as _Scroller } from '@hrworks/sui-core/Scroller';
import Title from '@hrworks/sui-core/Title';

const Container = styled.div({
  width: '40%',
  display: 'flex',
  flexDirection: 'column',

  [mq.isSmallDevice]: {
    width: '100%',
  },
});

const SectionTitle = styled(Title)({
  opacity: 0.5,
  fontSize: 18,
  marginBottom: 10,
});

const Scroller = styled(_Scroller)({
  position: 'relative',
});

const List = styled(_List)(({ theme }) => ({
  position: 'absolute',
  inset: 0,

  [mq.isSmallDevice]: {
    position: 'static',
  },

  'li:not(:last-of-type)': {
    marginBottom: theme.marko.variables.spacing.distance.small,
  },
}));

export const S = {
  Container,
  SectionTitle,
  Scroller,
  List,
} as const;
