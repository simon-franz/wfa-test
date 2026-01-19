import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';
import _Tabs from '@hrworks/sui-core/Tabs';
import _Tab from '@hrworks/sui-core/Tabs/Tab';
import _TabList from '@hrworks/sui-core/Tabs/TabList';

const Tabs = styled(_Tabs)({
  gap: '1.5rem',
  padding: '0 2rem 2rem 2rem',
});

const TabList = styled(_TabList)({
  [mq.isSmallDevice]: {
    justifyContent: 'center',
    overflow: 'hidden',
    gap: 0,
  },
});

const Tab = styled(_Tab)({
  '& button': {
    padding: '0.5rem',
  },
});

export const S = { Tabs, TabList, Tab } as const;
