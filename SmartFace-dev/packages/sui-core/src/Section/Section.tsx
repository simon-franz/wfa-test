import { useTheme } from '@emotion/react';
import extractNumbersFromString from '@hrworks/sui-shared/functions/extractNumbersFromString';
import isNil from 'lodash/isNil';
import { observer } from 'mobx-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import Icon from '../Icon';
import Title from '../Title';
import { S } from './Section.styles';
import type { SectionProps } from './Section.types';

export const Section = observer(
  ({
    children,
    collapsible,
    expanded,
    defaultExpanded,
    divider,
    title,
    titleChildren,
    size = 'medium',
    uppercase = true,
    onExpandedChange,
    id,
    alignTitle = 'start',
    breakTitleChildrenWithTitle,
    ...otherProps
  }: SectionProps) => {
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const _expanded = expanded ?? internalExpanded;

    const contentId = `${id}-content`;
    const titleId = `${id}-title`;

    const sectionAnimations = {
      expanded: { height: 'auto' },
      closed: { height: 0 },
    };

    const childrenJSX = children && <S.ChildrenContainer>{children}</S.ChildrenContainer>;
    const dividerJSX = divider && <S.Divider />;

    const animationDuration = Number(extractNumbersFromString(useTheme().marko.variables.animationDuration.normal));

    return children && collapsible ? (
      <S.Section {...otherProps}>
        <S.SectionToggle
          $size={size}
          aria-expanded={_expanded}
          aria-controls={contentId}
          aria-label={title}
          onClick={() => {
            onExpandedChange?.(!_expanded);
            isNil(expanded) && setInternalExpanded(!internalExpanded);
          }}
          variant="subtle"
        >
          <S.IconWrapper expanded={_expanded}>
            <Icon name="section-toggle" />
          </S.IconWrapper>
        </S.SectionToggle>
        <S.Title
          id={titleId}
          titleChildren={titleChildren}
          size={size}
          uppercase={uppercase}
          alignTitle={alignTitle}
          breakTitleChildrenWithChildren={breakTitleChildrenWithTitle}
        >
          {title}
        </S.Title>
        {dividerJSX}
        <S.MotionDiv
          animate={_expanded ? 'expanded' : 'closed'}
          variants={sectionAnimations}
          transition={{ duration: animationDuration }}
          role="region"
          aria-labelledby={titleId}
          id={contentId}
        >
          <AnimatePresence>
            {_expanded && (
              <motion.div exit={{ opacity: 0 }} transition={{ duration: animationDuration }}>
                {childrenJSX}
              </motion.div>
            )}
          </AnimatePresence>
        </S.MotionDiv>
      </S.Section>
    ) : (
      <section {...otherProps}>
        <Title
          id={titleId}
          titleChildren={titleChildren}
          size={size}
          uppercase={uppercase}
          alignTitle={alignTitle}
          breakTitleChildrenWithChildren={breakTitleChildrenWithTitle}
        >
          {title}
        </Title>
        {dividerJSX}
        {childrenJSX}
      </section>
    );
  },
);
