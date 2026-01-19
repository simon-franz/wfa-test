import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { overflowEllipsis } from '../../../utils/styleHelpers';
import type { TreeNodeVariantType } from '../TreeGraph.types';

type WrapperType = {
  variant: TreeNodeVariantType;
  highlightColor: string;
  allGreyedOut?: boolean;
};

const Wrapper = styled.div<WrapperType>(({ variant, highlightColor, allGreyedOut }) => ({
  padding: 10,
  margin: '0 10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: 10,
  overflow: 'hidden',
  ...(variant === 'highlighted' && {
    outline: `2px solid ${highlightColor}`,
    borderRadius: 5,
  }),
  ...(variant === 'greyedOut' &&
    !allGreyedOut && {
      opacity: 0.5,
    }),
}));

const Image = styled.img({
  width: 50,
  height: 50,
  borderRadius: '50%',
});

const TextWrapper = styled.div({ textAlign: 'center', width: '100%' });

const textBaseStyles = css({
  fontSize: '0.8rem',
  margin: 0,
});

const Title = styled.h1([overflowEllipsis, textBaseStyles, { fontWeight: 700 }]);
const SubTitle = styled.h2([overflowEllipsis, textBaseStyles, { fontWeight: 400 }]);
const SubSubTitle = styled.h3([overflowEllipsis, textBaseStyles, { fontWeight: 300 }]);

export const S = {
  Wrapper,
  Image,
  TextWrapper,
  Title,
  SubTitle,
  SubSubTitle,
} as const;
