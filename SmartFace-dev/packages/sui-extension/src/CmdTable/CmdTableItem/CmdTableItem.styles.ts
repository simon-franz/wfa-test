import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { overflowEllipsis } from '@hrworks/design-system';
import Button from '@hrworks/sui-core/Button';
import Icon from '@hrworks/sui-core/Icon';

const rowStyles = css({
  height: '3rem',
});

const TitleCell = styled.div(({ theme }) => [
  rowStyles,
  {
    display: 'flex',
    alignItems: 'center',
    paddingRight: theme.marko.variables.spacing.distance.medium,
    overflow: 'hidden',
  },
]);

const Link = styled(Button)(({ theme }) => [
  {
    ...theme.sqwTier2Typography.link,
    outlineOffset: -2,
    maxWidth: '100%',
  },
]);

const LinkIcon = styled(Icon)({
  alignSelf: 'start',
});

const LinkTextWrapper = styled.div(overflowEllipsis);

const Title = styled.span(overflowEllipsis);

const ButtonAndCheckedIconCell = styled.div([
  rowStyles,
  {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
]);

const TransitionWrapper = styled.div({
  transition: 'width 0.5s ease',
  display: 'flex',
  justifyContent: 'center',
});

const CheckmarkIconWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  height: 11,
});

const CheckmarkIcon = styled(Icon)(({ theme }) => ({
  height: '100%',
  color: theme.sqwTier2Color.icon.success.default,
}));

export const S = {
  TitleCell,
  Link,
  LinkIcon,
  LinkTextWrapper,
  Title,
  ButtonAndCheckedIconCell,
  TransitionWrapper,
  CheckmarkIconWrapper,
  CheckmarkIcon,
} as const;
