# reactplate

[![Netlify Status](https://api.netlify.com/api/v1/badges/26fb7e7c-f69d-40fa-b142-92a32d30b80f/deploy-status)](https://app.netlify.com/sites/reactplate-tenemo/deploys)

A React + modern Redux boilerplate for a fully configured quick start with automatic formatting and linting.

- Strict ESLint TypeScript linting and automatic formatting with zero additional configuration needed.

- VS Code settings bundled with the boilerplate, including recommended extensions for automatic formatting - via a one-click install.

- [Sentry.io](https://sentry.io) optional integration, including Redux integration - sends out the store on errors!

- Deployed to [Netlify](https://netlify.com) with an example catch-all redirect to always utilize react-router: [reactplate.com](https://reactplate.com)

## Features

### React

- React 19
- React Router 7
- Catch-all 404 page
- Light/dark themes with a toggle

### State management

- Modern Redux setup
- Redux Toolkit (RTK), including a RTK Query live example
  <img src="docs/RTK_Query_example.png" alt="RTK Query example" title="RTK Query example" width="600" />

- Store setup and usage is fully & properly typed
- Example integration test using the store

### Styling

- SCSS modules
- CSS variables utilized for theming with no dark/light duplication in components
- Full typing for SCSS - strict typechecking for classes! <br />
  <img src="docs/styles_typescript_suggestion.png" alt="TypeScript suggestions example" title="TypeScript suggestions example" width="500" />

- PostCSS processing (autoprefixer, flexbugs-fixes)
- Normalize.css

### Testing

- Vitest
- React Testing Library <br />
  <img src="docs/vitest_example.png" alt="Vitest example" title="Vitest example" width="300" />

Example usage with Redux and Redux Toolkit included.

### Build & development

- Vite, extremely fast cold starts & hot reload <br />
  <img src="docs/vite_cold_start.png" alt="Vite cold start" title="Vite cold start" width="300" />

- React hot reload 🔥 with Vite
- Automatic aliases for all src/ subdirectories, no need to manually add new ones <br />
  <img src="docs/aliases_example.png" alt="Aliases example" title="Aliases example" width="400" />
- Environment variables with validation <br />
  <img  src="docs/missing_environment_variable.png" alt="Missing environment variable error" title="Missing environment variable error" width="300" />
- Husky pre-commit hook with linting, typechecking and tests running automatically before each commit.

### Linting & formatting

- ESLint v.9 with flat config, ready-to-go, **strict** configuration. Notable plugins:
    - typescript-eslint for full TypeScript integration and strict typing rules
    - Prettier plugin to use prettier as formatter
    - Import & unused imports
    - React & react-hooks
    - Vitest
    - jsx-a11y (accessibility)
- VS Code settings, including ESLint set up as a formatter with Prettier integration - formatting & quick fixes in one pass!
- Stylelint SCSS linting
