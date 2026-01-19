import { observer } from 'mobx-react';

import { S } from './CollapsibleMenuSection.styles';
import type { CollapsibleMenuSectionProps } from './CollapsibleMenuSection.types';

export const CollapsibleMenuSection = observer(({ children, title, ...otherProps }: CollapsibleMenuSectionProps) => (
  <S.SectionContainer {...otherProps}>
    <S.Section title={title} size="extraSmall">
      <S.SectionChildren>{children}</S.SectionChildren>
    </S.Section>
  </S.SectionContainer>
));
