import styled from '@emotion/styled';

import _Button from '../Button';

const Button = styled(_Button)(({ variant }) => ({
  justifyContent: 'center',
  width: '2.5em',
  height: '2.5em',
  padding: 0,
  '> *': {
    fontSize: variant === 'filled' || variant === 'ghost' ? '1.2em' : '1.429em',
  },
}));

export const S = {
  Button,
} as const;
