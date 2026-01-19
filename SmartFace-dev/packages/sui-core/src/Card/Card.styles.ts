import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

import type { CardProps } from './Card.types';

const componentConfig = {
  padding: 24,
};

const Container = styled.div<Pick<CardProps, 'fullHeight'>>(({ theme, onClick, fullHeight }) => {
  const border = `1px solid ${theme.sqwTier2Color.border.bold}`;

  return {
    backgroundColor: theme.sqwTier2Color.surface.raised,
    border,
    borderRadius: theme.marko.variables.borderRadius.small,
    '> :not(:last-child)': {
      borderBottom: border,
    },
    ...(onClick && {
      cursor: 'pointer',
      [mq.supportsHover]: {
        ':hover': {
          borderColor: theme.sqwTier2Color.border.selected,
        },
      },
    }),
    ...(fullHeight && {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }),
  };
});

export const S = {
  componentConfig,
  Container,
} as const;
