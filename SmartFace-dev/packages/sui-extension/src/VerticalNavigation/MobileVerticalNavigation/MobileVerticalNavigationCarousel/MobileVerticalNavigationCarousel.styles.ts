import styled from '@emotion/styled';
import { mq, shouldForwardProp } from '@hrworks/design-system';
import _Button from '@hrworks/sui-core/Button';
import { Scroller as _Scroller } from '@hrworks/sui-core/Scroller';
import { Swipeable as _Swipeable } from '@hrworks/sui-shared/components/Swipeable';

const Swipeable = styled(_Swipeable)({
  height: '100%',
  overflow: 'hidden',
});

const Carousel = styled.div<{
  activeItemIndex: number;
}>(({ theme, activeItemIndex }) => ({
  whiteSpace: 'nowrap',
  height: '100%',
  transform: `translateX(-${activeItemIndex * 100}%)`,
  [mq.conditionalTransition]: {
    transition: `transform ${theme.marko.variables.animationDuration.long} ease-out`,
  },
}));

const CarouselItem = styled.div({
  display: 'inline-block',
  overflow: 'hidden',
  height: '100%',
  width: '100%',
});

const ScrollWrapper = styled.div({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const Scroller = styled(_Scroller, {
  shouldForwardProp,
})<{
  $mobileHeaderHeight?: number;
}>(({ $mobileHeaderHeight }) => ({
  overflowY: 'auto',
  flexGrow: 1,
  padding: '30px 30px 100px 30px',
  whiteSpace: 'normal',
  ...($mobileHeaderHeight && {
    paddingTop: $mobileHeaderHeight + 10,
  }),
}));

const ItemDescription = styled.p(({ theme }) => ({
  color: theme.sqwTier2Color.text.default,
}));

const Button = styled(_Button)({
  margin: '20px auto 0 auto',
});

export const S = {
  Swipeable,
  Carousel,
  CarouselItem,
  ScrollWrapper,
  Scroller,
  ItemDescription,
  Button,
} as const;
