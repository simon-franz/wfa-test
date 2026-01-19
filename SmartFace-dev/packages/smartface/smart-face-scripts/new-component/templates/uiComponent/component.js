export default ({ componentName }) =>
  `import { observer } from 'mobx-react';

import type { ${componentName}Props } from './${componentName}.types';

export const ${componentName} = observer(({ ...otherProps }: ${componentName}Props) => {
  return <div {...otherProps}>${componentName}</div>;
});
`;
