import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system/mediaQueries';
import _Title from '@hrworks/sui-core/Title';

// TODO: Remove Styling when Title Tokens are implemented https://hrworks.atlassian.net/browse/FE-3258
const Title = styled(_Title)(({ theme }) => ({
  ...theme.sqwTier2Typography.title,
  color: theme.sqwTier2Color.text.subtle,
  [mq.isSmallDevice]: {
    ...theme.sqwTier2Typography.headingLg,
  },
}));

export const S = {
  Title,
} as const;
