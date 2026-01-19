import styled from '@emotion/styled';
import { generateShadowStyles } from '@hrworks/design-system';
import { DropdownTrigger as _DropdownTrigger } from '@hrworks/sui-shared/components/Dropdown';

const componentConfig = {
  profileMenuSize: 41,
};

const DropdownTrigger = styled(_DropdownTrigger)(() => {
  const size = 26;

  return {
    display: 'flex',
    cursor: 'pointer',
    width: componentConfig.profileMenuSize,
    height: componentConfig.profileMenuSize,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,

    svg: {
      width: size,
      height: size,
    },
  };
});

const Arrow = styled.div<{
  header: boolean;
}>(({ theme, header }) => ({
  display: 'block',
  overflow: 'hidden',
  width: 20,
  height: 10,
  '&::before': {
    content: '""',
    display: 'block',
    border: '10px solid transparent',
    ...(header && {
      borderTopColor: theme.sqwTier2Color.background.brand.bold.default,
    }),
  },
}));

const Container = styled.div<{
  portrait?: boolean;
}>(({ theme, portrait }) => [
  generateShadowStyles({
    theme,
  }),
  {
    width: portrait ? 325 : 225,
    borderRadius: theme.marko.variables.borderRadius.extraSmall,
    overflow: 'hidden',
    backgroundColor: theme.sqwTier2Color.surface.sunken,
  },
]);

export const S = {
  DropdownTrigger,
  Arrow,
  Container,
} as const;
