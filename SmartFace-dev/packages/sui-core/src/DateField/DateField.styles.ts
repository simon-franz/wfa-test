import styled from '@emotion/styled';

const componentConfig = {
  modalWidth: {
    extraSmall: 238,
    small: 246,
    medium: 262,
    large: 328,
    extraLarge: 338,
  },
  yearContainerHeight: {
    extraSmall: 182,
    small: 213,
    medium: 243,
    large: 273,
    extraLarge: 303,
  },
};

const InputContainer = styled.div({
  width: '100%',
});

export const S = {
  componentConfig,
  InputContainer,
} as const;
