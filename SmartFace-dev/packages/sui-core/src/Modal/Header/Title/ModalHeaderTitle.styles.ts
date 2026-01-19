import styled from '@emotion/styled';

import { Scroller } from '../../../Scroller';
import _Title from '../../../Title';

const TitleScroller = styled(Scroller)({
  height: 'auto',
});

const Title = styled(_Title)({
  // TODO: Currently the line-height is responsible that the Title is centered - smaller line-heights will cause it to be not vertically centered - this is an anti-pattern and should be fixed soon.
  lineHeight: 1.5,
});

export const S = {
  TitleScroller,
  Title,
} as const;
