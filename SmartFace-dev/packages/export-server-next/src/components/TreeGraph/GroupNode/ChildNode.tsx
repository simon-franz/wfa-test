import { useContext } from 'react';

import { TreeGraphContext } from '../TreeGraphContext';
import { S } from './ChildNode.styles';
import type { ChildNodeProps } from './ChildNode.types';

export const ChildNode = ({ data, ...otherProps }: ChildNodeProps) => {
  const { imageSrc, title, subtitle, subsubtitle, onClick, variant = 'default' } = data;

  const { highlightColor } = useContext(TreeGraphContext);

  return (
    <S.Wrapper onClick={onClick} highlightColor={highlightColor} variant={variant} {...otherProps}>
      {imageSrc && <S.Image src={imageSrc} alt={title} />}
      <S.TextWrapper>
        {title && <S.Title>{title}</S.Title>}
        {subtitle && <S.SubTitle>{subtitle}</S.SubTitle>}
        {subsubtitle && <S.SubSubTitle>{subsubtitle}</S.SubSubTitle>}
      </S.TextWrapper>
    </S.Wrapper>
  );
};
