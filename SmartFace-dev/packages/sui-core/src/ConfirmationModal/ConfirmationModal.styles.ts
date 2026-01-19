import styled from '@emotion/styled';

import Modal from '../Modal';
import { S as ModalStyles } from '../Modal/Footer/ModalFooter.styles';

const ConfirmationModal = styled(Modal)(({ theme }) => ({
  [`${ModalStyles.Footer}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.marko.variables.spacing.distance.large,
    gap: theme.marko.variables.spacing.formGap.small,
  },
}));

export const S = {
  ConfirmationModal,
} as const;
