import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { overflowHyphens } from '@hrworks/design-system';

const componentConfig = {
  mediaSize: 130,
};

const fontStyles = css([
  overflowHyphens,
  {
    textAlign: 'center',
    margin: 0,
  },
]);

const Wrapper = styled.div(({ theme }) => ({
  color: theme.sqwTier2Color.text.info.default,
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Inner = styled.div({
  maxWidth: '75%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const StatusCode = styled.span(({ theme }) => [
  fontStyles,
  {
    ...theme.sqwTier2Typography.display,
    opacity: 0.35,
    fontSize: '9em',
    fontWeight: 900,
  },
]);

const Title = styled.span(({ theme }) => [
  fontStyles,
  {
    ...theme.sqwTier2Typography.title,
  },
]);

const SubTitle = styled.span(({ theme }) => [
  fontStyles,
  {
    ...theme.sqwTier2Typography.headingLg,
  },
]);

const Media = styled.div({
  width: componentConfig.mediaSize,
  height: componentConfig.mediaSize,
  marginTop: 10,
  fontSize: '5em',
  textAlign: 'center',
  '> *': {
    height: '100%',
  },
});

export const S = {
  Wrapper,
  Inner,
  StatusCode,
  Title,
  SubTitle,
  Media,
} as const;
