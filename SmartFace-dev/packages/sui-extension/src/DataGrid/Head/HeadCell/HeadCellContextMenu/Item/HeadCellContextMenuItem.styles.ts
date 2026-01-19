import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mq, overflowHyphens } from '@hrworks/design-system';
import _Icon from '@hrworks/sui-core/Icon';

const Item = styled.li(({ theme }) => [
  overflowHyphens,
  {
    ...theme.sqwTier2Typography.bodyMd,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5em',
    padding: theme.marko.variables.spacing.distance.extraSmall,
    borderRadius: 6,
    backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.default,
    [mq.supportsHover]: {
      ':hover': {
        backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.hovered,
      },
    },
    ':active': {
      backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.selected,
    },
  },
]);

const iconStyles = css({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '1.4em',
  flex: '0 0 1.25em',
});

const IconWrapper = styled.span(({ theme }) => [iconStyles, { color: theme.sqwTier2Color.icon.default }]);

const Icon = styled(_Icon)([iconStyles]);

export const S = {
  Item,
  IconWrapper,
  Icon,
} as const;
