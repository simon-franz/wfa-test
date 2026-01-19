import { observer } from 'mobx-react';

import { S } from './HeaderAreaToolbarChildren.styles';
import type { HeaderAreaToolbarChildrenProps } from './HeaderAreaToolbarChildren.types';

export const HeaderAreaToolbarChildren = observer(({ toolbarChildren }: HeaderAreaToolbarChildrenProps) => (
  <S.ToolbarChildren>
    {toolbarChildren.map((toolbarChild, index) => (
      <li key={index}>{toolbarChild}</li>
    ))}
  </S.ToolbarChildren>
));
