import styled from '@emotion/styled';

const CarouselContainer = styled.div({
  position: 'relative',
  maxWidth: '100%',
});

const CarouselContent = styled.div({
  overflow: 'hidden',
  maxHeight: 500,
});

const ItemWrapper = styled.div({
  display: 'flex',
});

export const S = {
  CarouselContainer,
  CarouselContent,
  ItemWrapper,
} as const;
