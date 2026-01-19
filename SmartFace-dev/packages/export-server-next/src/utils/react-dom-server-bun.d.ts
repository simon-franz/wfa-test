// Workaround: redirect react-dom/server types to react-dom/server.bun
// No idea why but this fixes react-dom/server while running the app with bun
declare module 'react-dom/server.bun' {
  export * from 'react-dom/server';
}
