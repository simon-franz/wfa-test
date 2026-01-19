import { ConditionalWrapper } from '@hrworks/sui-shared/components/ConditionalWrapper';
import { observer } from 'mobx-react';

import { S } from './Title.styles';
import type { TitleProps } from './Title.types';

export const Title = observer(
  ({
    children,
    titleChildren,
    uppercase,
    size = 'medium',
    titleContainerClassNames,
    id,
    icon,
    alignTitle,
    breakTitleChildrenWithChildren,
    overflowBehaviour = 'break',
    headerTag = 'h3',
    as,
    ...otherProps
  }: TitleProps) => {
    const titleChildrenJSX = <S.TitleChildren>{titleChildren}</S.TitleChildren>;

    return (
      (children || titleChildren) && (
        <S.TitleContainer overflowBehaviour={overflowBehaviour} size={size} alignTitle={alignTitle} {...otherProps}>
          {icon}
          {children && (
            <>
              <S.Title
                as={as || headerTag}
                overflowBehaviour={overflowBehaviour}
                uppercase={uppercase}
                alignTitle={alignTitle}
                id={id}
              >
                <ConditionalWrapper
                  condition={!!breakTitleChildrenWithChildren && !!titleChildren}
                  wrapper={(children) => <S.PaddedChildren>{children}</S.PaddedChildren>}
                >
                  {children}
                </ConditionalWrapper>
                {titleChildren && breakTitleChildrenWithChildren && titleChildrenJSX}
              </S.Title>
              {titleChildren && !breakTitleChildrenWithChildren && titleChildrenJSX}
            </>
          )}
        </S.TitleContainer>
      )
    );
  },
);
