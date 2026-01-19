import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system/mediaQueries';

import { S as SidebarToggleStyles } from '@hrworks/sui-core/ClassicLayout/Header/Branding/SidebarToggle/SidebarToggle.styles';

const SidebarToggle = styled(SidebarToggleStyles.SidebarToggle)({
  display: 'none',
  [mq.isSmallDevice]: {
    display: 'inline-flex',
  },
});

export const S = {
  SidebarToggle,
} as const;
