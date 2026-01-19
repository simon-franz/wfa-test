export default ({ componentName }) =>
  `export { ${componentName} as default } from './${componentName}';
`;
