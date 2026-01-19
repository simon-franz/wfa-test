import { css } from '@emotion/react';
import styled from '@emotion/styled';

const resetStyles = css({
  margin: 0,
  padding: 0,
  border: 0,
  fontSize: 16,
  fontFamily: 'Arial, sans-serif',
  boxSizing: 'border-box',
  lineHeight: 1.5,
  color: '#333',
  background: 'transparent',
});

const Badge = styled.span<{
  fullHeight?: boolean;
}>(({ fullHeight }) => [
  resetStyles,
  {
    backgroundColor: '#3b6da5',
    borderRadius: 'calc(1.5em + 2 * 2px)',
    padding: '2px 8px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'none',
    fontSize: 14,
    ...(fullHeight && {
      height: '100%',
      width: '100%',
    }),
  },
]);

const Button = styled.button([
  resetStyles,
  {
    padding: '8px 16px',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    cursor: 'pointer',
    border: '1px solid #ccc',
    fontWeight: 'normal',
    textAlign: 'center',
  },
]);

const Checkbox = styled.input([
  resetStyles,
  {
    margin: 4,
    width: 16,
    height: 16,
    accentColor: '#3b6da5',
  },
]);

const Input = styled.input([
  resetStyles,
  {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
    width: '100%',
    height: '36px',
  },
]);

const Icon = styled.span([
  resetStyles,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'currentColor',
    width: '24px',
    height: '24px',
  },
]);

const Image = styled.img([
  resetStyles,
  {
    maxWidth: '100%',
    display: 'block',
    height: '100px',
    width: '100px',
  },
]);

const Link = styled.a([
  resetStyles,
  {
    color: '#3b6da5',
    textDecoration: 'none',
    cursor: 'pointer',
  },
]);

const RadioGroup = styled.div(resetStyles);

const Select = styled.select([
  resetStyles,
  {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
    width: '100%',
    height: '36px',
  },
]);

const Textarea = styled.textarea([
  resetStyles,
  {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
    width: '100%',
    height: '36px',
    minHeight: '100px',
    resize: 'vertical',
  },
]);

export const S = {
  Badge,
  Button,
  Checkbox,
  Input,
  Icon,
  Image,
  Link,
  RadioGroup,
  Select,
  Textarea,
} as const;
