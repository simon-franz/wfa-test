import styled from '@emotion/styled';
import _LoadingAnimation from '@hrworks/sui-core/LoadingAnimation';

const componentConfig = {
  size: 200,
};

const ImageCropperContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: componentConfig.size,
});

const CropperContainer = styled.div({
  display: 'flex',
  position: 'relative',
  width: componentConfig.size,
  height: componentConfig.size,
  justifyContent: 'center',
  alignItems: 'center',
});

const LoadingAnimation = styled(_LoadingAnimation)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const SliderContainer = styled.div<{
  loaded: boolean;
}>(({ theme, loaded }) => ({
  width: componentConfig.size,
  marginTop: theme.marko.variables.spacing.distance.large,
  ...(!loaded && {
    visibility: 'hidden',
  }),
}));

export const S = {
  componentConfig,
  ImageCropperContainer,
  CropperContainer,
  LoadingAnimation,
  SliderContainer,
} as const;
