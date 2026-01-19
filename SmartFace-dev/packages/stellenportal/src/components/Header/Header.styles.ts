import styled from '@emotion/styled';

import { getContrastFontColor } from '../../util/getContrastFontColor';

const componentConfig = {
  headerHeight: 65,
};

const Container = styled.header(({ theme }) => ({
  position: 'fixed',
  zIndex: 3,
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.stellenportal?.headerStyle?.color || theme.sqwTier2Color.surface.raised,
  color: theme.stellenportal?.headerStyle?.color
    ? getContrastFontColor(theme.stellenportal?.headerStyle?.color)
    : theme.sqwTier2Color.surface.raised,
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.marko.variables.spacing.distance.medium,
  overflow: 'hidden',
  height: componentConfig.headerHeight,
}));

const Row = styled.div(({ theme }) => ({
  backgroundColor: theme.stellenportal?.headerStyle?.color || theme.sqwTier2Color.surface.raised,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${theme.marko.variables.spacing.distance.large}px 40px`,
  zIndex: 3,
  height: '100%',
}));

const Logo = styled.img({
  maxHeight: 40,
  maxWidth: 220,
});

const SecondRow = styled(Row)(({ theme }) => ({
  position: 'fixed',
  left: 0,
  right: 0,
  padding: `${theme.marko.variables.spacing.distance.medium}px 32px`,
  transition: 'all 0.3s ease-in',
  zIndex: 2,
  height: 'unset',
}));

const JobDetails = styled.div(({ theme }) => ({
  display: 'flex',
  '& > *:not(:last-child)': {
    '::after': {
      content: '"·"',
      margin: `0 ${theme.marko.variables.spacing.distance.small}px`,
    },
  },
}));

const ActionButtons = styled.div(({ theme }) => ({
  display: 'flex',
  columnGap: theme.marko.variables.spacing.distance.small,
}));

export const S = {
  componentConfig,
  Container,
  Row,
  Logo,
  SecondRow,
  JobDetails,
  ActionButtons,
} as const;
