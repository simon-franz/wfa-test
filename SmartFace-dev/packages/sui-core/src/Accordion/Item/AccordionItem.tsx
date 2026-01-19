import { useTheme } from '@emotion/react';
import extractNumbersFromString from '@hrworks/sui-shared/functions/extractNumbersFromString';
import { AnimatePresence, motion } from 'motion/react';
import { type KeyboardEvent, useCallback, useContext, useEffect, useId, useMemo, useRef } from 'react';

import Icon from '../../Icon';
import Title from '../../Title';
import { AccordionContext } from '../AccordionContext';
import { S } from './AccordionItem.styles';
import type { AccordionItemProps } from './AccordionItem.types';

export const AccordionItem = ({
  children,
  icon,
  id: _id,
  title,
  color = 'primary',
  preventInitialExpand,
  preventExpand,
  onBeforeInitialExpand,
  onBeforeExpand,
  onAfterInitialExpand,
  onAfterExpand,
  onCollapse,
  ...otherProps
}: AccordionItemProps) => {
  const { changeExpanded, expandedItemIds, expandCollapseIcon, itemSpacing } = useContext(AccordionContext);
  const wasInitiallyExpanded = useRef(false);
  const dirtyExpanded = useRef(false);

  const generatedId = useId();
  const id = _id || generatedId;

  const expanded = useMemo(() => expandedItemIds.includes(id), [expandedItemIds, id]);

  const onClick = async () => {
    let prevent: boolean;
    if (expanded) {
      changeExpanded(id, false);
    } else {
      if (wasInitiallyExpanded.current) {
        await onBeforeExpand?.();
        prevent = Boolean(preventExpand);
      } else {
        onBeforeInitialExpand ? await onBeforeInitialExpand() : await onBeforeExpand?.();
        prevent = preventInitialExpand == null ? Boolean(preventExpand) : preventInitialExpand;
      }
      if (!prevent) {
        changeExpanded(id, true);
      }
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      onClick();
    }
  };

  const fireExpandCallback = useCallback(() => {
    dirtyExpanded.current = true;
    if (wasInitiallyExpanded.current) {
      onAfterExpand?.();
    } else {
      wasInitiallyExpanded.current = true;
      if (onAfterInitialExpand) {
        onAfterInitialExpand();
      } else {
        onAfterExpand?.();
      }
    }
  }, [onAfterExpand, onAfterInitialExpand]);

  const fireCollapseCallback = useCallback(() => {
    dirtyExpanded.current = false;
    onCollapse?.();
  }, [onCollapse]);

  useEffect(() => {
    if (dirtyExpanded.current) {
      !expanded && fireCollapseCallback();
    } else {
      expanded && fireExpandCallback();
    }
  }, [expanded, fireCollapseCallback, fireExpandCallback]);

  const contentId = `${id}-content`;
  const titleId = `${id}-title`;

  const sectionAnimations = {
    expanded: { height: 'auto' },
    closed: { height: 0 },
  };

  const animationDuration = Number(extractNumbersFromString(useTheme().marko.variables.animationDuration.normal));

  return (
    <S.Container $color={color} itemSpacing={itemSpacing} tabIndex={0} onKeyDown={onKeyDown} {...otherProps}>
      <S.TitleContainer onClick={onClick} $color={color} aria-expanded={expanded} aria-controls={contentId}>
        <Title id={titleId} icon={icon}>
          {title}
        </Title>
        <S.IconWrapper expandCollapseIcon={expandCollapseIcon} expanded={expanded}>
          <Icon
            name={
              expandCollapseIcon == 'arrow'
                ? 'accordion-item-arrow'
                : expanded
                  ? 'accordion-item-minus'
                  : 'accordion-item-plus'
            }
          />
        </S.IconWrapper>
      </S.TitleContainer>
      <motion.div
        animate={expanded ? 'expanded' : 'closed'}
        variants={sectionAnimations}
        transition={{ duration: animationDuration }}
        id={contentId}
        aria-labelledby={titleId}
      >
        <AnimatePresence>
          {expanded && (
            <S.Wrapper $color={color} exit={{ opacity: 0 }} transition={{ duration: animationDuration }}>
              {children}
            </S.Wrapper>
          )}
        </AnimatePresence>
      </motion.div>
    </S.Container>
  );
};
