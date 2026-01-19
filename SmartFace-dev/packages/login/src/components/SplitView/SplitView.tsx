'use client';

import { Footer } from '../Footer';
import { S } from './SplitView.styles';
import type { SplitViewProps } from './SplitView.types';

// TODO: Replace with Resources from ENV
const logoUrl = 'https://d3nnb1hxumbr0v.cloudfront.net/images/logos2024Relaunch/HRW_Logo_ohne_Claim_Farbe.png';
const imageUrl = 'https://hrneeds.de/wp-content/uploads/2023/02/mainheader_646x364.jpg';

export const SplitView = ({ children, ...otherProps }: SplitViewProps) => (
  <S.SplitView {...otherProps}>
    <S.LeftSide>
      <S.ContentContainer>
        <S.Logo src={logoUrl} alt="HRWorks Logo" />
        {children}
        <Footer />
      </S.ContentContainer>
    </S.LeftSide>

    <S.RightSide>
      <S.Image alt="" src={imageUrl} />
    </S.RightSide>
  </S.SplitView>
);
