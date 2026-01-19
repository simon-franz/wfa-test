import { SuiThemeContext } from '@hrworks/design-system';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import FontAwesomeIcon from '../FontAwesomeIcon';
import { MaterialDesignIcon } from '../MaterialDesignIcon';
import { StreamlineIcon } from '../StreamlineIcon';
import { fontAwesomeIconMap, materialDesignIconMap, streamlineIconMap } from './';
import type { IconProps } from './Icon.types';

export const Icon = observer(({ iconSet: iconSetFromProps, name, ...otherProps }: IconProps) => {
  const { iconSet: iconSetFromContext } = useContext(SuiThemeContext);
  const iconSet = iconSetFromProps || iconSetFromContext;

  switch (iconSet) {
    case 'streamline': {
      return <StreamlineIcon {...streamlineIconMap[name]} {...otherProps} />;
    }
    case 'font-awesome':
    case 'font-awesome-svg': {
      return <FontAwesomeIcon {...fontAwesomeIconMap[name]} {...otherProps} />;
    }
    case 'material-design': {
      return <MaterialDesignIcon {...materialDesignIconMap[name]} {...otherProps} />;
    }
  }
});
