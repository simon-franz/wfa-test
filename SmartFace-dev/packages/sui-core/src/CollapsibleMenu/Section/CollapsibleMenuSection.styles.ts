import styled from '@emotion/styled';
import { resetListStyles } from '@hrworks/design-system/stylePresets';

import _Section from '../../Section';
import { S as SectionStyles } from '../../Section/Section.styles';
import { S as TitleStyles } from '../../Title/Title.styles';

const SectionContainer = styled.li(({ theme }) => ({
  marginTop: `calc(${theme.marko.variables.spacing.distance.large}px * 2)`,
  ':first-of-type': {
    marginTop: theme.marko.variables.spacing.distance.medium,
  },
}));

const Section = styled(_Section)(({ theme }) => ({
  [`${SectionStyles.ChildrenContainer}`]: {
    margin: 0,
    marginTop: theme.marko.variables.spacing.distance.small, // Distance between SectionTitle and SectionChildren
  },
  [`${TitleStyles.TitleContainer}`]: {
    ...theme.sqwTier2Typography.navHeader,
    color: theme.sqwTier2Color.text.brand.default,
    paddingLeft: theme.marko.variables.spacing.distance.medium,
  },
}));

const SectionChildren = styled.ul([resetListStyles]);

export const S = {
  SectionContainer,
  Section,
  SectionChildren,
} as const;
