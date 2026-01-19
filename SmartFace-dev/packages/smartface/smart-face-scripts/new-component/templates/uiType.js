export default ({ componentName }) =>
  `import type { HTMLAttributes } from 'react';

export type ${componentName}Props = {
  // Insert Types of your Props here
} & HTMLAttributes<HTMLElement>;
`;
