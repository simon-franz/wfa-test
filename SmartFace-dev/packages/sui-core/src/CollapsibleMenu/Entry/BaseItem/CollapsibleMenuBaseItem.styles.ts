import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { overflowBreakWord, shouldForwardProp } from '@hrworks/design-system';
import type { ButtonProps } from 'react-day-picker';

import Button from '../../../Button';
import { getButtonColorMap } from '../../../Button/Button.colors';
import { S as TitleStyles } from '../../../Title/Title.styles';
import { S as CollapsibleMenuEntryStyles } from '../CollapsibleMenuEntry.styles';

type PaddingGenerationConfig = {
  theme: Theme;
  iconFontSize?: string;
  iconGap?: number;
  horizontalItemPadding?: number;
  nestedInset?: number;
};

export const generatePaddings = ({
  theme,
  iconFontSize,
  iconGap,
  horizontalItemPadding,
  nestedInset,
}: PaddingGenerationConfig) => {
  const _iconFontSize = iconFontSize || theme.sqwTier2Typography.bodyMd.fontSize;
  const _iconGap = iconGap || theme.marko.variables.spacing.distance.medium;
  const iconPadding = `${_iconFontSize} + ${_iconGap}px`;
  const _horizontalItemPadding = horizontalItemPadding || theme.marko.variables.spacing.distance.medium;
  const _nestedInset = nestedInset || theme.marko.variables.spacing.distance.medium;
  const paddingWithIcon = `calc(${iconPadding} + ${_horizontalItemPadding}px)`;
  const defaultNestingIndentation = `calc(${_nestedInset}px * var(--nestingLevel) + ${_horizontalItemPadding}px)`;
  const nestedIndentationWithIcon = `calc(${_nestedInset}px  * (var(--nestingLevel) - 1) + ${paddingWithIcon})`;

  return css({
    [`${IconContainer}`]: {
      fontSize: _iconFontSize,
      marginRight: _iconGap,
    },

    [`${Item}, ${TitleStyles.TitleContainer}`]: {
      transition: 'none',
      paddingLeft: _horizontalItemPadding,
      '& > :last-child': {
        marginRight: _horizontalItemPadding,
        [`&${CollapsibleMenuEntryStyles.IconContainer}`]: {
          paddingRight: _horizontalItemPadding,
          marginRight: 0,
        },
      },
    },

    // Inset Layers when Layer0 has no icon
    [`${ItemContainer}:not(${ItemContainer} ${ItemContainer})`]: {
      // Set base line position for Layer0
      '--line-position-depth-indicator': `${_horizontalItemPadding}px`,

      [` ${ItemContainer} ${Item}, ${TitleStyles.TitleContainer}`]: {
        paddingLeft: defaultNestingIndentation,
      },
      // Set line position for children
      [`${ItemContainer}`]: {
        '--line-position-depth-indicator': defaultNestingIndentation,
      },
    },

    // Inset Layer1 when Layer0 has an icon
    [`${ItemContainer}[data-hasicon=true]:not(${ItemContainer} ${ItemContainer})`]: {
      // Set line position in the center of icon for Layer0
      '--line-position-depth-indicator': `calc(${_horizontalItemPadding}px + (${_iconFontSize} / 2) - ${
        CollapsibleMenuEntryStyles.componentConfig.indicatorWidth / 2
      }px)`,

      [`${ItemContainer} ${Item}, ${TitleStyles.TitleContainer}`]: {
        paddingLeft: paddingWithIcon,
      },
      // Set the line position for Layer 1
      [`${ItemContainer}`]: {
        '--line-position-depth-indicator': paddingWithIcon,
        //Inset Layer 2 even more
        [`${ItemContainer} ${Item},${TitleStyles.TitleContainer}`]: {
          paddingLeft: nestedIndentationWithIcon,
        },
        // Update line position for deeper nesting
        [`${ItemContainer}`]: {
          '--line-position-depth-indicator': nestedIndentationWithIcon,
        },
      },
    },
  });
};

const ItemContainer = styled.li();

type ItemProps = {
  $active: boolean;
  $showDefaultCursor: boolean;
} & Pick<Required<ButtonProps>, 'variant' | 'color'>;

const Item = styled(Button, {
  shouldForwardProp,
})<ItemProps>(({ theme, $active, $showDefaultCursor, color, variant }) => ({
  ...theme.sqwTier2Typography.bodyMd,
  color: theme.sqwTier2Color.text.default,
  padding: 0,
  width: '100%',
  outlineOffset: -2,
  minHeight: 40,
  ...($showDefaultCursor && {
    cursor: 'default',
  }),
  ...($active && { backgroundColor: getButtonColorMap(theme)[variant][color].pressed }),
}));

const LinkContent = styled.div([
  overflowBreakWord,
  {
    display: 'flex',
    alignItems: 'center',
    flex: '1',
    textAlign: 'left',
  },
]);

const IconContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'currentcolor',
  width: '1em',
});

export const S = {
  generatePaddings,
  ItemContainer,
  Item,
  LinkContent,
  IconContainer,
} as const;
