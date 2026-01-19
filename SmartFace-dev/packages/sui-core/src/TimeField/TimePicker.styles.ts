import styled from '@emotion/styled';
import { generateShadowStyles } from '@hrworks/design-system';

type ContainerProps = {
  mobile?: boolean;
  showSeconds?: boolean;
};

const Container = styled.div<ContainerProps>(({ theme, mobile, showSeconds }) => [
  !mobile && generateShadowStyles({ theme }),
  {
    display: 'grid',
    gridTemplateColumns: `repeat(${showSeconds ? 3 : 2}, 1fr)`,
    gridTemplateRows: 'repeat(3, 1fr)',
    justifyItems: 'center',
    alignItems: 'center',

    [`${Number}:not(:last-of-type)`]: {
      '::after': {
        position: 'absolute',
        content: '":"',
        right: -2,
      },
    },

    ...(!mobile && {
      backgroundColor: theme.sqwTier2Color.background.input,
      padding: theme.marko.variables.spacing.distance.extraSmall,
      borderRadius: theme.marko.variables.borderRadius.medium,
    }),
  },
]);

const Number = styled.div(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  color: theme.sqwTier2Color.text.default,
  position: 'relative',
}));

export const S = {
  Container,
  Number,
} as const;
