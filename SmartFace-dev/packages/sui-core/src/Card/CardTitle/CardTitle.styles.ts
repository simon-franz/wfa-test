import styled from '@emotion/styled';

import Text from '../../Text';
import _Title from '../../Title';

const Title = styled(_Title)(({ theme }) => ({
  ...theme.sqwTier2Typography.headingMdSemibold, // TODO: Remove this when Title offers a native api for the typo-styles
  marginRight: 'auto',
  paddingRight: 40,
  overflow: 'hidden',
  alignSelf: 'center',
}));

const Subtitle = styled(Text)(({ theme }) => ({
  ...theme.sqwTier2Typography.bodySm,
}));

export const S = {
  Title,
  Subtitle,
} as const;
