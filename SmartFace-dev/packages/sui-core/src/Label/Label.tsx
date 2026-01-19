import { observer } from 'mobx-react';
import type { MouseEvent } from 'react';

import { S } from './Label.styles';
import type { LabelProps } from './Label.types';

export const Label = observer(({ label, children, mandatory, validationState, ...otherProps }: LabelProps) => {
  const onClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  if (!label && !children) {
    return null;
  }

  return (
    <S.LabelContainer {...otherProps}>
      {label && (
        <S.Wrapper validationState={validationState}>
          {label}
          {mandatory && <span>*</span>}
        </S.Wrapper>
      )}
      {children && <S.LabelChildren onClick={onClick}>{children}</S.LabelChildren>}
    </S.LabelContainer>
  );
});
