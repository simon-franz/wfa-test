import { MaterialDesignIcon } from '@hrworks/sui-core/MaterialDesignIcon';
import { observer } from 'mobx-react';
import { type MouseEvent, useCallback, useContext } from 'react';

import { TreeGraphContext } from '../../TreeGraphContext';
import { S } from './TreeNodeButton.styles';
import type { TreeNodeButtonProps } from './TreeNodeButton.types';

export const TreeNodeButton = observer(
  ({
    hasChildEntries,
    onLoadChildEntries,
    isExpanded,
    id,
    setIsExpanded,
    onClick,
    ...otherProps
  }: TreeNodeButtonProps) => {
    const { setLastInteractedNodeId } = useContext(TreeGraphContext);

    const preventScrolling = useCallback((e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
    }, []);

    const _onClick = useCallback(() => {
      onClick();
      setLastInteractedNodeId(id);

      if (hasChildEntries && setIsExpanded) {
        setIsExpanded(id, !isExpanded);
      }

      onLoadChildEntries && onLoadChildEntries();
    }, [hasChildEntries, id, isExpanded, onClick, onLoadChildEntries, setIsExpanded, setLastInteractedNodeId]);

    if (!hasChildEntries && !onLoadChildEntries) {
      return null;
    }

    return (
      <S.Toolbar className="hide-on-screenshot" {...otherProps}>
        <S.ExpandButton
          size="extraSmall"
          variant="text"
          $shouldRotate={Boolean(isExpanded && hasChildEntries)}
          onClick={_onClick}
          onMouseDownCapture={preventScrolling}
        >
          <MaterialDesignIcon name="keyboard_arrow_down" />
        </S.ExpandButton>
      </S.Toolbar>
    );
  },
);
