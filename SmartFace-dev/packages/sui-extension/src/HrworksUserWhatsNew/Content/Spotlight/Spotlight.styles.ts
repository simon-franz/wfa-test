import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system/mediaQueries';
import { Title as _Title } from '@hrworks/sui-core/Title/Title';

import { HrworksUserWhatsNewStyles } from '../../';
import { TagList as _TagList } from '../TagList';
import { S as ButtonStyles } from '@hrworks/sui-core/Button/Button.styles';

const componentConfig = (theme: Theme) => ({
  borderRadius: theme.marko.variables.borderRadius.large,
});

const Container = styled.div({
  display: 'flex',
  flex: 1,
  [mq.isSmallDevice]: {
    flexDirection: 'column',
  },
});

const SpotlightImage = styled.div<{
  imgSrc?: string;
}>(({ theme, imgSrc }) => ({
  width: '40%',
  borderTopLeftRadius: componentConfig(theme).borderRadius,
  borderBottomLeftRadius: componentConfig(theme).borderRadius,
  backgroundImage: `url(${imgSrc})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',

  [mq.isSmallDevice]: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: componentConfig(theme).borderRadius,
  },
}));

const Content = styled.div<{
  imageExists?: boolean;
}>(({ theme, imageExists }) => ({
  backgroundColor: theme.marko.colors.palette.neutral[2],
  overflow: 'hidden',
  padding: theme.marko.variables.spacing.distance.extraLarge,
  borderBottomRightRadius: componentConfig(theme).borderRadius,
  borderTopRightRadius: componentConfig(theme).borderRadius,
  flexGrow: 1,

  ...(!imageExists && {
    borderTopLeftRadius: componentConfig(theme).borderRadius,
    borderBottomLeftRadius: componentConfig(theme).borderRadius,
  }),

  [mq.isSmallDevice]: {
    borderBottomLeftRadius: componentConfig(theme).borderRadius,

    ...(imageExists && {
      borderTopRightRadius: 0,
    }),

    [`${ButtonStyles.Button}`]: {
      width: '100%',
      justifyContent: 'center',

      [`${ButtonStyles.Icon}`]: {
        display: 'none',
      },
    },
  },
}));

const Title = styled(_Title)({
  fontSize: 24,
  marginBottom: 12,
});

const SubHeader = styled.div(({ theme }) => ({
  display: 'flex',
  gap: theme.marko.variables.spacing.distance.medium,
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: 12,

  [mq.isSmallDevice]: {
    justifyContent: 'space-between',
  },
}));

const Date = styled.span(({ theme }) => [
  HrworksUserWhatsNewStyles.sharedFontStyles,
  {
    fontWeight: 600,
    fontSize: 18,
    opacity: theme.marko.variables.opacity.medium,
  },
]);

const TagList = styled(_TagList)({
  marginBottom: 24,
});

const Wrapper = styled.div(({ theme }) => [
  HrworksUserWhatsNewStyles.sharedFontStyles,
  {
    fontWeight: theme.marko.typography.fontWeights.text,
    fontSize: 20,
    marginBottom: 32,
  },
]);

export const S = {
  Container,
  SpotlightImage,
  Content,
  Title,
  SubHeader,
  Date,
  TagList,
  Wrapper,
} as const;
