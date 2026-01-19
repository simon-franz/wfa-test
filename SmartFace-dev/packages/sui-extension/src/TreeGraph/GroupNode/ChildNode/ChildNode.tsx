import type { HTMLAttributes } from 'react';

import type { TreeGraphEntryData } from '../../TreeGraph.types';
import { S as TreeNodeStyles } from '../../TreeNode/TreeNode.styles';
import { S } from './ChildNode.styles';

type ChildNodeProps = {
  data: TreeGraphEntryData;
} & HTMLAttributes<HTMLDivElement>;

export const ChildNode = ({ data, ...otherProps }: ChildNodeProps) => {
  const { imageSrc, title, subtitle, subsubtitle, onClick, variant = 'default' } = data;

  return (
    <S.Container onClick={onClick} clickable={Boolean(onClick)} variant={variant} {...otherProps}>
      {imageSrc && <S.Img src={imageSrc} alt={title} />}
      <S.TextContainer>
        {title && (
          <TreeNodeStyles.Text textAlign="center" title={title} $isTitle>
            {title}
          </TreeNodeStyles.Text>
        )}
        {subtitle && (
          <TreeNodeStyles.Text textAlign="center" title={subtitle}>
            {subtitle}
          </TreeNodeStyles.Text>
        )}
        {subsubtitle && (
          <TreeNodeStyles.Text textAlign="center" title={subsubtitle}>
            {subsubtitle}
          </TreeNodeStyles.Text>
        )}
      </S.TextContainer>
    </S.Container>
  );
};
