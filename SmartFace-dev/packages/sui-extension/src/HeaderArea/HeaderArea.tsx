import { observer } from 'mobx-react';

import { HeaderAreaTitle } from './Header/Title/HeaderAreaTitle';
import { HeaderAreaToolbarChildren } from './Header/ToolbarChildren/HeaderAreaToolbarChildren';
import { S } from './HeaderArea.styles';
import type { HeaderAreaProps } from './HeaderArea.types';

export const HeaderArea = observer(
  ({ header, toolbarChildren, flexToolbarChildren, children, ...otherProps }: HeaderAreaProps) => {
    const hasToolbarChildren = toolbarChildren && toolbarChildren.length > 0;
    const hasFlexToolbarChildren = flexToolbarChildren && flexToolbarChildren.length > 0;
    const { title, titleChildren, subtitle, subtitleChildren } = header;
    const hasHeader = title || titleChildren || subtitle || subtitleChildren;

    const applyHeaderContainerGap = Boolean(hasHeader && hasToolbarChildren);

    return (
      <S.HeaderArea {...otherProps}>
        {(hasHeader || hasToolbarChildren || hasFlexToolbarChildren) && (
          <S.HeaderContainer applyHeaderContainerGap={applyHeaderContainerGap}>
            {hasHeader && <HeaderAreaTitle {...header} />}
            {hasToolbarChildren && <HeaderAreaToolbarChildren toolbarChildren={toolbarChildren} />}
            {hasFlexToolbarChildren && (
              <>
                {flexToolbarChildren.map((flexToolbarChild, index) => (
                  <div key={index}>{flexToolbarChild}</div>
                ))}
              </>
            )}
          </S.HeaderContainer>
        )}
        {children}
      </S.HeaderArea>
    );
  },
);
