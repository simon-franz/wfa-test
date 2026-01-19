import styled from '@emotion/styled';
import { shouldForwardProp } from '@hrworks/design-system/emotionUtils';
import type { Size } from '@hrworks/types/shared/UiTypes';

import _ConfirmationModal from '../ConfirmationModal';
import { S as DateFieldStyles } from './DateField.styles';

type ConfirmationModalProps = {
  $size: Size;
  $numberOfMonths?: number;
};

const ConfirmationModal = styled(_ConfirmationModal, {
  shouldForwardProp,
})<ConfirmationModalProps>(({ theme, $size, $numberOfMonths }) => ({
  fontSize: theme.marko.typography.sqwFontSizes.large,
  width: $numberOfMonths
    ? DateFieldStyles.componentConfig.modalWidth[$size] * $numberOfMonths
    : DateFieldStyles.componentConfig.modalWidth[$size],
}));

export const S = {
  ConfirmationModal,
} as const;
