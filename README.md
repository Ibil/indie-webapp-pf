# Indie Web APP

## Development Process

This application is being build first on storybook. Each Component is created and a test case is added to storybook.
Whenever deemed appropriate, the component will be added to the main application

For this reason, the storybook will always have more components than the actual application.

## Current Status
Currently the main page has mock data for produt items as an example only. The integration with the BE is not yet done so all data in the app or storybook is mocked.

## Quick-start

Install [Node.JS](https://nodejs.org/en/)


Install all dependencies by running
```bash
npm install
```

Run the project locally
```bash
npm run start:dev
```

Run the storybook
```bash
npm run start:dev
```

## Other Development scripts
```sh
# Install development/build dependencies
npm install

# Start the development server
npm run start:dev

# Run a production build (outputs to "dist" dir)
npm run build

# Run the test suite
npm run test

# Run the test suite with coverage
npm run test:coverage

# Run the linter
npm run lint

# Run the code formatter
npm run format

# Launch a tool to inspect the bundle size
npm run bundle-profile:analyze

# Start the express server (run a production build first)
npm run start

# Start storybook component explorer
npm run storybook

# Build storybook component explorer as standalone app (outputs to "storybook-static" dir)
npm run build:storybook
```



[More details](./info.md)
