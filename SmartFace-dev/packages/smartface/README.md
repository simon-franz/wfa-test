# @hrworks/smartface

This is a React Framework that can work with JSON coming from a SmallTalk backend and generate interactive Views in React. The views are not only generated but only kept in sync with the SmallTalk backend.

## Technology Stack

- **mobx:** Mobx watches the JSON and keeps track of changes to update the components
- **React:** 19
- **Styling:** We use our own component library called sui (sui-core) that uses emotion with styled components for styling
- **Design System:** The components are built on top of our HR WORKS design system and use design tokens

## Getting Started

There is a dev-server that you can start that has some examples. However this dev-server is not maintained:

```bash
// Start the vite dev-server
bun run smartface dev smartface-ui

// Start the mock-api
bun run mock-api
```

There is another app in our monorepo called Adapterbook (@hrworks/adapterbook) where you can test our components.
