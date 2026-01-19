import styled from '@emotion/styled';
import { overflowEllipsis, shouldForwardProp } from '@hrworks/design-system';
import _Button from '@hrworks/sui-core/Button';
import Text from '@hrworks/sui-core/Text';

const Button = styled(_Button)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 129,
});

const NameWrapper = styled(Text, {
  shouldForwardProp,
})<{
  $bold?: boolean;
}>(({ theme, $bold }) => [
  overflowEllipsis,
  {
    width: '100%',
    ...($bold && {
      fontWeight: theme.sqwTier2Typography.headingMdSemibold.fontWeight,
    }),
  },
]);

export const S = {
  Button,
  NameWrapper,
} as const;
