import { css } from '@emotion/react';
import styled from '@emotion/styled';

const sharedFontStyles = css({
  fontFamily: 'Roboto',
  lineHeight: 'normal',
  margin: 0,
  textWrap: 'balance',
});

const Container = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const S = {
  sharedFontStyles,
  Container,
} as const;
