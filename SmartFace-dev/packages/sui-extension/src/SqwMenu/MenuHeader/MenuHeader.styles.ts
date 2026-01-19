import styled from '@emotion/styled';
import IconButton from '@hrworks/sui-core/IconButton';

const componentConfig = {
  headerPadding: 20,
};

const HeaderContainer = styled.div<{
  portrait: boolean;
}>(({ theme, portrait }) => ({
  width: '100%',
  backgroundColor: theme.sqwTier2Color.background.brand.bold.default,
  padding: componentConfig.headerPadding,
  display: 'flex',
  alignItems: 'center',
  columnGap: 15,

  ...(!portrait && {
    justifyContent: 'center',
    '& *': {
      textAlign: 'center',
    },
    [`${Title}`]: {
      ...theme.sqwTier2Typography.headingMd,
    },
  }),
}));

const PortraitContainer = styled.div({
  width: 70,
  position: 'relative',
});

const CropButton = styled(IconButton)(({ theme }) => {
  const size = 26;

  return {
    outlineOffset: 0,
    position: 'absolute',
    right: 0,
    bottom: 0,
    transform: 'translateX(10%) translateY(10%)',
    width: size,
    height: size,
    backgroundColor: theme.sqwTier2Color.surface.sunken,

    '&&': {
      outline: `1px solid ${theme.sqwTier2Color.background.brand.bold.default}`,
    },
  };
});

const Details = styled.div(({ theme }) => ({
  color: theme.sqwTier2Color.text.inverse,
  overflow: 'hidden',
}));

const Title = styled.div(({ theme }) => ({
  ...theme.sqwTier2Typography.headingMd,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const SubTitle = styled.div(({ theme }) => ({
  ...theme.sqwTier2Typography.link,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: theme.sqwTier2Color.text.inverse,
}));

export const S = {
  componentConfig,
  HeaderContainer,
  PortraitContainer,
  CropButton,
  Details,
  Title,
  SubTitle,
} as const;
