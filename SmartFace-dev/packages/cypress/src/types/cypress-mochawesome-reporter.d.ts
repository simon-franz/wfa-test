declare module 'cypress-mochawesome-reporter' {
  const content: any;
  export = content;
}

declare module 'cypress-mochawesome-reporter/lib' {
  export function beforeRunHook(details: any): void;
  export function afterRunHook(): void;

  export function addContext(test: any, context: any): void;

  const content: any;
  export default content;
}

declare module 'cypress-mochawesome-reporter/plugin' {
  const content: any;
  export = content;
}
