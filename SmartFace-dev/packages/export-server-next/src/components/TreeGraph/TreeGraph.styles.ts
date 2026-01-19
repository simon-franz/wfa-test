import emotionStyled from '@emotion/styled';

type WrapperType = {
  width?: number;
  height?: number;
};

const Wrapper = emotionStyled.div<WrapperType>(({ width, height }) => ({
  position: 'relative',
  width: width || '100%',
  height: height || '100%',
  fontFamily: 'Open Sans',
  backgroundColor: 'transparent',
}));

export const S = {
  Wrapper,
} as const;
