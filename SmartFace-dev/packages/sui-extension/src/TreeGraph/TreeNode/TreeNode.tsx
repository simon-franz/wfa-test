import { Position } from '@xyflow/react';
import { Observer, observer } from 'mobx-react';
import { useCallback, useRef } from 'react';

import { S } from './TreeNode.styles';
import type { TreeNodeProps } from './TreeNode.types';
import { TreeNodeButton } from './TreeNodeButton';

export const TreeNode = observer(({ data, targetPosition, sourcePosition }: TreeNodeProps) => {
  const {
    title,
    onLoadChildEntries,
    subtitle,
    subsubtitle,
    imageSrc,
    hasChildEntries,
    setIsExpanded,
    onClick,
    id,
    isExpanded,
    variant = 'default',
    dataGuideId,
  } = data;

  const lastInteracted = useRef(false);

  const lastInteractedAnimationDuration = 3000;

  const onClickTreeNodeButton = useCallback(() => {
    lastInteracted.current = true;
    setTimeout(() => (lastInteracted.current = false), lastInteractedAnimationDuration);
  }, []);

  return (
    <Observer>
      {() => (
        <S.Container data-guide-id={dataGuideId}>
          <S.TreeNodeCard
            variant={variant}
            lastInteracted={lastInteracted.current}
            lastInteractedAnimationDuration={lastInteractedAnimationDuration}
          >
            <S.Handle type="target" position={targetPosition ?? Position.Top} />
            <S.Content onClick={onClick}>
              {imageSrc && <S.Image src={imageSrc} alt={title} />}
              <S.TextContainer>
                {title && (
                  <S.Text textAlign="end" title={title} $isTitle>
                    {title}
                  </S.Text>
                )}
                {subtitle && (
                  <S.Text textAlign="end" title={subtitle}>
                    {subtitle}
                  </S.Text>
                )}
                {subsubtitle && (
                  <S.Text textAlign="end" title={subsubtitle}>
                    {subsubtitle}
                  </S.Text>
                )}
              </S.TextContainer>
            </S.Content>
            <S.Handle type="source" position={sourcePosition || Position.Bottom} />
          </S.TreeNodeCard>
          <TreeNodeButton
            hasChildEntries={hasChildEntries}
            onLoadChildEntries={onLoadChildEntries}
            isExpanded={isExpanded}
            id={id}
            setIsExpanded={setIsExpanded}
            onClick={onClickTreeNodeButton}
          />
        </S.Container>
      )}
    </Observer>
  );
});
