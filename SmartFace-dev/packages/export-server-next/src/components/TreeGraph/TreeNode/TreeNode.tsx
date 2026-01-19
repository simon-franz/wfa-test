import { type Node, Position } from '@xyflow/react';
import { useContext } from 'react';

import type { TreeGraphEntryUiDataType } from '../TreeGraph.types';
import { TreeGraphContext } from '../TreeGraphContext';
import { S } from './TreeNode.styles';

// Can't import ReactFlows Position as type so creating our own:

type TreeNodeProps = Omit<Node<TreeGraphEntryUiDataType>, 'position'>;

export const TreeNode = ({ data, targetPosition, sourcePosition }: TreeNodeProps) => {
  const {
    title,
    subtitle,
    subsubtitle,
    imageSrc,
    hasChildEntries,
    isExpanded,
    variant = 'default',
    onLoadChildEntries,
  } = data;

  const { highlightColor } = useContext(TreeGraphContext);

  return (
    <S.Wrapper>
      <S.TreeNodeCard variant={variant} highlightColor={highlightColor}>
        <S.Handle type="target" position={targetPosition ?? Position.Top} />
        <S.ContentWrapper>
          {imageSrc && <S.Image src={imageSrc} alt={title} />}
          <S.TextWrapper>
            {title && <S.Title>{title}</S.Title>}
            {subtitle && <S.SubTitle>{subtitle}</S.SubTitle>}
            {subsubtitle && <S.SubSubTitle>{subsubtitle}</S.SubSubTitle>}
          </S.TextWrapper>
        </S.ContentWrapper>
        <S.Handle type="source" position={sourcePosition || Position.Bottom} />
        {(hasChildEntries || onLoadChildEntries) && !isExpanded && (
          <S.ChildIndicatorWrapper>
            <S.ChildIndicator>···</S.ChildIndicator>
          </S.ChildIndicatorWrapper>
        )}
      </S.TreeNodeCard>
    </S.Wrapper>
  );
};
