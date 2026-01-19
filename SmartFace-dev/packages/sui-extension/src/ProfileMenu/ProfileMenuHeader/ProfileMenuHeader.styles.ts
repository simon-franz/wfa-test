import styled from '@emotion/styled';
import { overflowEllipsis } from '@hrworks/design-system';

const Wrapper = styled.div(({ theme }) => ({
  width: '100%',
  background: theme.sqwTier2Color.background.brand.bold.default,
  padding: '25px 20px',
  display: 'flex',
  alignItems: 'center',
  columnGap: theme.marko.variables.spacing.distance.extraLarge,
}));

const UserPic = styled.div({
  alignSelf: 'flex-start',
});

const UserPicImageWrapper = styled.div({
  width: 70,
});

const UserDetails = styled.div(({ theme }) => ({
  color: theme.sqwTier2Color.text.inverse,
  overflow: 'hidden',
}));

const Title = styled.div(({ theme }) => [
  overflowEllipsis,
  {
    ...theme.sqwTier2Typography.headingMd,
  },
]);

const SubTitle = styled.div(({ theme }) => [
  overflowEllipsis,
  {
    ...theme.sqwTier2Typography.link,
  },
]);

export const S = {
  Wrapper,
  UserPic,
  UserPicImageWrapper,
  UserDetails,
  Title,
  SubTitle,
} as const;
