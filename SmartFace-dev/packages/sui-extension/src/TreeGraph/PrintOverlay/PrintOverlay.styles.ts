import styled from '@emotion/styled';

const PrintOverlay = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
});

const PrintImg = styled.img({
  maxHeight: '100%',
  maxWidth: '100%',
});

export const S = {
  PrintOverlay,
  PrintImg,
} as const;
