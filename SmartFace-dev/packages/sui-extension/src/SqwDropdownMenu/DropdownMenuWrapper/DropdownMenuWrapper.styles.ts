import styled from '@emotion/styled';
import { generateShadowStyles } from '@hrworks/design-system';

const Wrapper = styled.div(({ theme }) => [
  generateShadowStyles({
    theme,
  }),
  {
    width: 245,
    backgroundColor: theme.sqwTier2Color.background.input,
    borderRadius: 6,
    padding: theme.marko.variables.spacing.distance.extraSmall,
  },
]);

const SublistWrapper = styled(Wrapper)<{
  isOpen?: boolean;
}>(({ isOpen }) => ({
  ...(!isOpen && {
    display: 'none',
  }),
}));

export const S = {
  Wrapper,
  SublistWrapper,
} as const;
