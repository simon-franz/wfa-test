import styled from '@emotion/styled';

import IconButton from '../../../IconButton';

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.marko.variables.spacing.distance.extraLarge,
  right: theme.marko.variables.spacing.distance.extraLarge,
  ':focus-visible': {
    position: 'absolute',
    zIndex: 1,
  },
}));

export const S = {
  CloseButton,
} as const;
