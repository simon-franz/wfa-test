import styled from '@emotion/styled';
import { mq, withOpacity } from '@hrworks/design-system';
import Title from '@hrworks/sui-core/Title';

const componentConfig = {
  mobileHeaderXSpacing: 15,
  imprintSpacing: 30,
};

const MobileHeader = styled.div<{
  expandSidebar?: boolean;
}>(({ theme, expandSidebar }) => ({
  display: 'none',
  [mq.isTouchOrSmallDevice]: {
    display: 'block',
    marginLeft: componentConfig.mobileHeaderXSpacing,
    marginRight: componentConfig.mobileHeaderXSpacing,
    padding: '30px 15px 10px 15px',
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    backdropFilter: 'blur(8px);',
    '::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      background: `linear-gradient(90deg, ${theme.sqwTier2Color.surface.sunken} 0%, color-mix(in srgb, ${theme.sqwTier2Color.surface.sunken} 30%, transparent) 10%, transparent 20%, transparent 80%,  color-mix(in srgb, ${theme.sqwTier2Color.surface.sunken} 30%, transparent) 90%, ${theme.sqwTier2Color.surface.sunken} 100%)`,
    },
    backgroundColor: withOpacity(theme.sqwTier2Color.surface.sunken, '50%'),
    zIndex: 1,
    ...(expandSidebar && {
      position: 'static',
    }),
  },
}));

const MobileLogoWrapper = styled.a<{
  titleExists?: boolean;
}>(({ theme, titleExists }) => ({
  display: 'block',
  width: 180,
  ':focus-visible': {
    position: 'absolute',
    outlineOffset: -3,
  },

  ...(titleExists && {
    marginBottom: theme.marko.variables.spacing.distance.medium,
  }),
}));

const MobileLogo = styled.img({
  maxHeight: 55,
  maxWidth: 180,
});

const SectionTitle = styled(Title)(({ theme }) => ({
  ...theme.sqwTier2Typography.title,
  color: theme.sqwTier2Color.text.subtle,
  fontSize: 26,
}));

const LoginPageWrapper = styled.div({
  height: '100%',
  width: '100%',
});

const Imprint = styled.a<{
  isScrolled?: boolean;
}>(({ theme, isScrolled }) => ({
  ...theme.sqwTier2Typography.link,
  color: theme.sqwTier2Color.text.brand.default,
  position: 'fixed',
  bottom: componentConfig.imprintSpacing,
  right: componentConfig.imprintSpacing,
  zIndex: 4,
  [mq.isTouchOrSmallDevice]: {
    bottom: 'auto',
    top: componentConfig.imprintSpacing,
  },
  [mq.conditionalTransition]: {
    transition: `opacity ${theme.marko.variables.animationDuration.long}`,
  },
  [mq.supportsHover]: {
    ':hover, :focus-visible': {
      textDecoration: 'underline',
    },
  },

  ...(isScrolled && {
    ':not(:hover)': {
      opacity: 0.5,
    },
  }),
}));

export const S = {
  MobileHeader,
  MobileLogoWrapper,
  MobileLogo,
  SectionTitle,
  LoginPageWrapper,
  Imprint,
} as const;
