import styled from '@emotion/styled';
import { generateShadowStyles } from '@hrworks/design-system';
import { DropdownTrigger as _DropdownTrigger } from '@hrworks/sui-shared/components/Dropdown';

const componentConfig = {
  profileMenuSize: 46,
};

const DropdownTrigger = styled(_DropdownTrigger)({
  display: 'flex',
  verticalAlign: 'top',
  width: componentConfig.profileMenuSize,
  height: componentConfig.profileMenuSize,
});

const Arrow = styled.div(({ theme }) => ({
  display: 'block',
  overflow: 'hidden',
  width: 20,
  height: 10,
  '&::before': {
    content: '""',
    display: 'block',
    border: '10px solid transparent',
    borderTopColor: theme.sqwTier2Color.background.brand.bold.default,
  },
}));

const Container = styled.div(({ theme }) => [
  generateShadowStyles({ theme, variant: 'light' }),
  {
    width: 325,
    borderRadius: 6,
    overflow: 'hidden',
  },
]);

export const S = {
  DropdownTrigger,
  Arrow,
  Container,
} as const;
