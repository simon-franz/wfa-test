import { LocalizationContext } from '@hrworks/localization';
import { observer } from 'mobx-react';
import { useContext, useState } from 'react';

import Icon from '../Icon';
import IconButton from '../IconButton';
import Title from '../Title';
import { S } from './Alert.styles';
import type { AlertProps } from './Alert.types';

export const Alert = observer(
  ({
    children,
    closeable,
    corner = 'rounded',
    icon,
    onClose,
    text,
    title,
    color = 'primary',
    ...otherProps
  }: AlertProps) => {
    const { translate } = useContext(LocalizationContext);
    const [visible, setVisible] = useState(true);

    const onClick = () => {
      setVisible(false);
      onClose?.();
    };

    return !visible && closeable ? null : (
      <S.Container role="alert" corner={corner} $color={color} {...otherProps}>
        {icon && <S.LeftIcon>{icon}</S.LeftIcon>}
        <S.AlertContent>
          {title && <Title>{title}</Title>}
          {(text || children) && (
            <div>
              {text}
              {children}
            </div>
          )}
        </S.AlertContent>
        {closeable && (
          <S.ButtonWrapper corner={corner}>
            <IconButton
              corner="square"
              type="button"
              variant="unstyled"
              aria-label={translate('alert-close')}
              onClick={onClick}
            >
              <Icon name="alert-close" />
            </IconButton>
          </S.ButtonWrapper>
        )}
      </S.Container>
    );
  },
);
