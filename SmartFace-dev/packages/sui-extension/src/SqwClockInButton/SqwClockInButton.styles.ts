import styled from '@emotion/styled';
import { mq, overflowEllipsis, shouldForwardProp } from '@hrworks/design-system';
import { StreamlineIcon as _StreamlineIcon } from '@hrworks/sui-core/StreamlineIcon';

import { S as DropdownMenuTriggerStyles } from '@hrworks/sui-core/DropdownMenu/DropdownMenuTrigger/DropdownMenuTrigger.styles';

const configValues = {
  height: 50,
  dropdownMenuTriggerWidth: 38,
  stateIconSize: 22,
};

const componentConfig = {
  ...configValues,
  gap: (configValues.height - configValues.stateIconSize) / 2,
};

const Container = styled.div<{
  isActive?: boolean;
}>(({ theme, isActive }) => ({
  display: 'flex',
  position: 'relative',
  ...(isActive && {
    color: theme.sqwTier2Color.text.inverse,
  }),
  overflow: 'hidden',
  maxWidth: 400,
}));

const Toggle = styled.div<{
  isActive?: boolean;
}>(({ theme, isActive }) => ({
  ...theme.sqwTier2Typography.labelMdSemibold,
  display: 'flex',
  borderRadius: componentConfig.height,
  cursor: 'pointer',
  alignItems: 'center',
  overflow: 'hidden',
  gap: componentConfig.gap,
  backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.selected,
  color: theme.sqwTier2Color.text.brand.default,

  ...(isActive && {
    ...theme.sqwTier2Typography.bodyMd,
    gap: 0,
    backgroundColor: theme.sqwTier2Color.background.brand.bold.default,
    color: theme.sqwTier2Color.text.inverse,
  }),

  [mq.conditionalTransition]: {
    transition: `background-color ${theme.marko.variables.animationDuration.long}`,
  },
}));

const IconWrapper = styled.div(({ theme }) => ({
  backgroundColor: theme.sqwTier2Color.background.brand.bold.default,
  color: theme.sqwTier2Color.icon.inverse,
  width: componentConfig.height,
  height: componentConfig.height,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '100%',
  flexShrink: 0,
}));

const StreamlineIcon = styled(_StreamlineIcon, {
  shouldForwardProp,
})<{
  $isActive?: boolean;
}>(({ $isActive }) => ({
  width: componentConfig.stateIconSize,
  height: componentConfig.stateIconSize,
  ...(!$isActive && {
    transform: 'translateX(2px)',
  }),
}));

const Content = styled.div<{
  hasDropdown?: boolean;
}>(({ hasDropdown }) => ({
  paddingRight: hasDropdown ? componentConfig.height / 2 + componentConfig.gap + 16 : componentConfig.height / 2,
  display: 'flex',
  alignItems: 'center',
  gap: componentConfig.gap,
  overflow: 'hidden',
}));

const LabelContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  lineHeight: 1.375,
  overflow: 'hidden',
});

const Label = styled.div(overflowEllipsis);

const BoldLabel = styled(Label)(({ theme }) => ({
  ...theme.sqwTier2Typography.labelMdSemibold,
}));

const ElapsedTimeLabel = styled(BoldLabel)({
  flexShrink: 0,
});

const DropdownWrapper = styled.div({
  position: 'absolute',
  right: componentConfig.height / 2,
  top: '50%',
  transform: 'translateY(-50%)',

  [`${DropdownMenuTriggerStyles.Wrapper}`]: {
    justifyContent: 'center',
    alignItems: 'center',
    width: componentConfig.dropdownMenuTriggerWidth,
    height: componentConfig.height,
    margin: `0 ${(16 - componentConfig.dropdownMenuTriggerWidth) / 2}px`,
  },
});

export const S = {
  Container,
  Toggle,
  IconWrapper,
  StreamlineIcon,
  Content,
  LabelContainer,
  Label,
  BoldLabel,
  ElapsedTimeLabel,
  DropdownWrapper,
};
