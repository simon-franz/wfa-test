import { observer } from 'mobx-react';

import { S } from './HelpText.styles';
import type { HelpTextProps } from './HelpText.types';

export const HelpText = observer(
  ({ helpText, validationMessage, validationState, size = 'medium', ...otherProps }: HelpTextProps) => {
    if (!helpText && !(validationMessage && validationState)) {
      return null;
    }

    return (
      <S.HelpTextContainer
        size={size}
        validationState={validationState}
        validationMessage={validationMessage}
        title={validationMessage}
        {...otherProps}
      >
        {validationState && validationMessage ? validationMessage : helpText}
      </S.HelpTextContainer>
    );
  },
);
