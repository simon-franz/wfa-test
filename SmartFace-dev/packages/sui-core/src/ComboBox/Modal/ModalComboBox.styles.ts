import styled from '@emotion/styled';

import _Modal from '../../Modal';
import { S as ModalHeaderStyles } from '../../Modal/Header/ModalHeader.styles';
import { Scroller } from '../../Scroller';

const Modal = styled(_Modal)(({ theme }) => ({
  backgroundColor: theme.sqwTier2Color.surface.sunken,
  overflow: 'hidden',
  [`${ModalHeaderStyles.Header}`]: {
    backgroundColor: theme.sqwTier2Color.surface.raised,
  },
}));

const StyledScroller = styled(Scroller)(({ theme }) => ({
  marginTop: theme.marko.variables.spacing.distance.medium,
  height: '60vh',
}));

export const S = {
  Modal,
  StyledScroller,
} as const;
