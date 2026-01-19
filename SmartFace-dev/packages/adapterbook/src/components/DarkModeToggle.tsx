import { SuiThemeContext } from '@hrworks/design-system';
import { MaterialDesignIcon } from '@hrworks/sui-core/MaterialDesignIcon';
import { useContext } from 'react';

import { S } from '../routes/__root.styles';

export const DarkModeToggle = () => {
  const { setTheme, colorScheme } = useContext(SuiThemeContext);

  const onToggleDarkMode = () => {
    setTheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div style={{ justifySelf: 'flex-end' }}>
      <S.DarkModeSwitch
        name="darkMode"
        aria-label="darkMode"
        labelChildren={
          colorScheme === 'dark' ? (
            <MaterialDesignIcon variant="two-tone" name="nightlight" />
          ) : (
            <MaterialDesignIcon variant="two-tone" name="light_mode" />
          )
        }
        checked={colorScheme === 'dark'}
        onChange={onToggleDarkMode}
      />
    </div>
  );
};
