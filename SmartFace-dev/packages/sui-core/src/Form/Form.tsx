import { observer } from 'mobx-react';

import { S } from './Form.styles';
import type { FormProps } from './Form.types';

export const Form = observer(({ children, id, ...otherProps }: FormProps) => (
  <S.Form data-smart-face-id={id} onSubmit={(event) => event.preventDefault()} {...otherProps}>
    {children}
  </S.Form>
));
