export default ({ componentName, applicationName }) =>
  `import { observer } from 'mobx-react';

import ${componentName} from '@hrworks/sui-${applicationName}/${componentName}';

import type { ${componentName}AdapterProps } from './${componentName}Adapter.types';

export const ${componentName}Adapter = observer(({ ...otherProps }: ${componentName}AdapterProps) => {

  return <${componentName} {...otherProps} />;
});
`;
