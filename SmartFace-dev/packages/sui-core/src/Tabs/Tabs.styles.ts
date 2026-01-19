import styled from '@emotion/styled';
import type { Gap } from '@hrworks/types/shared/UiTypes';

import { S as GridStyles } from '../Grid/Grid.styles';

type TabsProps = {
  fullHeight?: boolean;
  contentGap: Gap;
};

const Tabs = styled.div<TabsProps>(({ fullHeight, contentGap }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap:
    contentGap === 'none'
      ? 0
      : contentGap === 'default'
      ? GridStyles.componentConfig.spacing.medium
      : GridStyles.componentConfig.spacing[contentGap],
  ...(fullHeight && {
    height: '100%',
  }),
}));

export const S = {
  Tabs,
} as const;
