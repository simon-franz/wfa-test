import styled from '@emotion/styled';

const CarouselItem = styled.div<{
  clickable?: boolean;
  slidesToShow: number;
}>(({ clickable, slidesToShow }) => ({
  cursor: clickable ? 'pointer' : 'default',
  flex: `0 0 ${100 / slidesToShow}%`,
  minWidth: 0,
  padding: '0 8px',
  '&:first-of-type': {
    padding: '0 8px 0 0',
  },
  '&:last-of-type': {
    padding: '0 0 0 8px',
  },
  boxSizing: 'border-box',
}));

const ItemContent = styled.div({
  width: '100%',
  height: '100%',
  maxHeight: 500,
  objectFit: 'contain',
  position: 'relative',
  overflow: 'hidden',
});

export const S = {
  CarouselItem,
  ItemContent,
} as const;
