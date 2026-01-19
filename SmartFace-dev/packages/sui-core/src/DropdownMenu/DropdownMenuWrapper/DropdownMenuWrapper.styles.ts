import styled from '@emotion/styled';
import { generateShadowStyles } from '@hrworks/design-system';

const Wrapper = styled.div(({ theme }) => [
  generateShadowStyles({
    theme,
    variant: 'default',
  }),
  {
    width: 'max-content',
    minWidth: 245,
    backgroundColor: theme.sqwTier2Color.background.input,
    borderRadius: theme.marko.variables.borderRadius.medium,
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
