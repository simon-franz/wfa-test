export default ({ componentName }) =>
  `import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '@hrworks/smartface/types/SmartFaceComponent';
  
  export type ${componentName}BackendProps = {
    // Insert Types of Backend Props here
  };
  
  export type ${componentName}BackendDefinition = SmartFaceBackendComponent<'${componentName}', ${componentName}BackendProps>;
  
  export type ${componentName}AdapterProps = SmartFaceAdapterPropsType<${componentName}BackendDefinition>;
  `;
