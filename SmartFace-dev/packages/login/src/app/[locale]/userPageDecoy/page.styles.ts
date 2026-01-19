import styled from '@emotion/styled';
import Image from '@hrworks/sui-core/Image';

const Container = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
  zIndex: 9999,
});

const DecoyImage = styled(Image)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  display: 'block',
});

export const S = {
  Container,
  DecoyImage,
} as const;
