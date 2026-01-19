import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Handle as FlowHandle } from '@xyflow/react';

import { overflowEllipsis } from '../../../utils/styleHelpers';
import type { TreeNodeVariantType } from '../TreeGraph.types';

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px 0',
});

const Card = styled.div({
  background: '#fff',
  outline: `3px solid #999999`,
  borderRadius: 6,
  padding: 5,
});

type TreeNodeCardProps = {
  variant?: TreeNodeVariantType;
  highlightColor?: string;
};

const TreeNodeCard = styled(Card)<TreeNodeCardProps>(({ variant, highlightColor }) => ({
  width: 230,
  ...(variant === 'highlighted' && {
    outline: `3px solid ${highlightColor}`,
  }),
  ...(variant === 'greyedOut' && {
    opacity: 0.5,
  }),
}));

const Handle = styled(FlowHandle)`
  visibility: hidden;
`;

const ContentWrapper = styled.div({
  height: 70,
  paddingBlock: 4,
  paddingInline: 8,
  columnGap: 9,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const Image = styled.img({
  width: 50,
  height: 50,
  borderRadius: '50%',
});

const TextWrapper = styled.div({
  padding: '0 10px',
  overflow: 'hidden',
  flex: 1,
});

const textBaseStyle = css({
  fontSize: '0.8rem',
  margin: 0,
  textAlign: 'right',
  fontFamily: 'Open Sans',
});

const Title = styled.h1([
  overflowEllipsis,
  textBaseStyle,
  {
    fontWeight: 700,
  },
]);
const SubTitle = styled.h2([
  overflowEllipsis,
  textBaseStyle,
  {
    fontWeight: 400,
  },
]);
const SubSubTitle = styled.h3([
  overflowEllipsis,
  textBaseStyle,
  {
    fontWeight: 300,
  },
]);

const ChildIndicatorWrapper = styled.div({
  width: '100%',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
});

const ChildIndicator = styled.div({
  width: 25,
  height: 16,
  borderRadius: 20,
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  color: '#fff',
  backgroundColor: '#585858',
});

export const S = {
  Wrapper,
  Card,
  TreeNodeCard,
  Handle,
  ContentWrapper,
  Image,
  Title,
  SubTitle,
  SubSubTitle,
  TextWrapper,
  ChildIndicator,
  ChildIndicatorWrapper,
} as const;
