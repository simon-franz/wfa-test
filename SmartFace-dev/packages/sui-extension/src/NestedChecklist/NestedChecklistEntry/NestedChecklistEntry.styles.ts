import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';
import _Checkbox from '@hrworks/sui-core/Checkbox';

import type { NestedChecklistEntryProps } from './NestedChecklistEntry.types';
import { S as FormGroupStyles } from '@hrworks/sui-core/FormGroup/FormGroup.styles';

const componentConfig = {
  rowSize: {
    extraSmall: 16,
    small: 18,
    medium: 21,
    large: 23,
    extraLarge: 28,
  },
};

type GridContainerProps = Pick<Required<NestedChecklistEntryProps>, 'size'> & {
  isFirstLevelWithNoEntries?: boolean;
};

const GridContainer = styled.div<GridContainerProps>(({ theme, size, isFirstLevelWithNoEntries }) => ({
  display: 'grid',
  alignItems: 'center',
  gridTemplateAreas: `"arrowArea checkboxItemArea selectAllArea ." ". childrenArea childrenArea childrenArea"`,
  gridTemplateColumns: isFirstLevelWithNoEntries
    ? '0 max-content max-content auto'
    : `calc(1.125em + ${theme.marko.variables.spacing.formGap[size]}) max-content max-content auto`,
  gridTemplateRows: componentConfig.rowSize[size],
  rowGap: theme.marko.variables.spacing.distance.extraSmall,
  fontSize: theme.marko.typography.sqwFontSizes[size],
}));

const selectAllAreaStyles = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  userSelect: 'none',
  gridArea: 'selectAllArea',
});

const SelectAllWrapper = styled.div([
  selectAllAreaStyles,
  {
    gridArea: 'selectAllArea',
  },
]);

const SelectAllToggle = styled.span(({ theme }) => ({
  fontSize: '0.75em',
  padding: '0.1rem 0.6rem',
  opacity: 0,
  whiteSpace: 'nowrap',
  color: theme.sqwTier2Color.text.subtlest,
}));

const SelectAllArea = styled.div([
  selectAllAreaStyles,
  {
    zIndex: 2,
    [mq.supportsHover]: {
      ':hover': {
        [`~ ${SelectAllWrapper} > ${SelectAllToggle}`]: {
          opacity: 1,
          textDecoration: 'underline',
        },
      },
    },
  },
]);

const ArrowArea = styled.span(({ theme }) => ({
  gridArea: 'arrowArea',
  display: 'inline-flex',
  height: '1em',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  [mq.supportsHover]: {
    ':hover': {
      'svg path': {
        stroke: 'currentcolor',
      },
    },
  },
  [mq.conditionalTransition]: {
    transition: `transform ${theme.marko.variables.animationDuration.normal}`,
  },
}));

const IconWrapper = styled.span<{
  expanded: boolean;
}>(({ theme, expanded }) => ({
  width: '1em',
  height: '1em',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'rotate(-90deg)',
  fontSize: '0.7em',
  [mq.conditionalTransition]: {
    transition: `transform ${theme.marko.variables.animationDuration.normal}`,
  },
  ...(expanded && {
    transform: 'rotate(0deg)',
  }),
}));

const Checkbox = styled(_Checkbox)({
  gridArea: 'checkboxItemArea',
  [mq.supportsHover]: {
    ':hover': {
      [`~${SelectAllWrapper} > ${SelectAllToggle}`]: {
        opacity: 1,
      },
    },
  },
  [`${FormGroupStyles.ClickArea}`]: {
    paddingRight: 20,
  },
});

const ChildrenArea = styled.div({
  gridArea: 'childrenArea',
});

export const S = {
  GridContainer,
  SelectAllArea,
  ArrowArea,
  IconWrapper,
  Checkbox,
  SelectAllWrapper,
  SelectAllToggle,
  ChildrenArea,
};
