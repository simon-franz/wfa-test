import styled from '@emotion/styled';
import _Title from '@hrworks/sui-core/Title';

const componentConfig = {
  padding: 10,
};

const Title = styled(_Title)(({ theme }) => ({
  ...theme.sqwTier2Typography.labelMd,
  backgroundColor: theme.sqwTier2Color.background.neutral.subtle.default,
  padding: componentConfig.padding,
  borderRadius: 6,
}));

const ChildrenWrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: 'auto max-content',
  width: '100%',
  alignContent: 'space-around',
  paddingLeft: componentConfig.padding,
  paddingRight: componentConfig.padding,
});

const ConfirmationStatusWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'right',
  paddingTop: 5,
  borderTop: `1px solid ${theme.sqwTier2Color.border.bold}`,
}));

const ConfirmationStatus = styled.div(({ theme }) => ({
  ...theme.sqwTier2Typography.bodySm,
  color: theme.sqwTier2Color.text.subtlest,
  whiteSpace: 'nowrap',
}));

export const S = {
  Title,
  ChildrenWrapper,
  ConfirmationStatusWrapper,
  ConfirmationStatus,
} as const;
