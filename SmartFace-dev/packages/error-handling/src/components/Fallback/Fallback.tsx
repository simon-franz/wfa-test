import { LocalizationContext } from '@hrworks/localization';
import { useContext } from 'react';

import ServerStatus from '../ServerStatus';
import type { FallbackProps } from './Fallback.types';

export const Fallback = (props: FallbackProps) => {
  const { translate } = useContext(LocalizationContext);

  return (
    <ServerStatus
      statusCode={translate('render-error-title')}
      title={translate('render-error-message')}
      subtitle={translate('render-error-information')}
      {...props}
    />
  );
};
