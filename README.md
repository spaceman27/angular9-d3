# Secureworks Home Assignment

What have in this project:
- NX monorepo
- Angular Elements Lib Ready
- Angular material UI
- Differential Loading
- Enable Hot Reloading (HRM)
- Startup service: init db data, and load server configuration
- lib/share/core:  (reuseable lib) 
-  core service 
-    api service, 
-    in-memory-data service
-    cache-service
-  models
-    ui model
-lib/shared/utils
-  elements-utils: for web element

-page template with router, input form

-lib/ui/src/lib/data-visualization : d3 chart show mutual friend (angular element)

- we can add user and store in memory db
- it should show/update mutual friend chart when add new people
- it should be reuseable cross framework
```
"scripts": {
    "ng": "ng",
    "nx": "nx",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "nx workspace-lint && ng lint",
    "e2e": "ng e2e",
    "affected:apps": "nx affected:apps",
    "affected:libs": "nx affected:libs",
    "affected:build": "nx affected:build",
    "affected:e2e": "nx affected:e2e",
    "affected:test": "nx affected:test",
    "affected:lint": "nx affected:lint",
    "affected:dep-graph": "nx affected:dep-graph",
    "affected": "nx affected",
    "format": "nx format:write",    //format code with prettier
    "format:write": "nx format:write",  //format code with prettier and write down to all files
    "format:check": "nx format:check", // check all file if format is valid
    "update": "ng update @nrwl/workspace",
    "workspace-schematic": "nx workspace-schematic",
    "dep-graph": "nx dep-graph",   // check if there is any regression in dependency tree
    "help": "nx help",
    "postinstall": "ngcc --properties es2015 browser module main --first-only --create-ivy-entry-points",
    "clean": "lerna run clean",
    "prebuild:prod": "npm run clean",
    "debug:npmlogs": "./tools/utils/dump-npm-logs.js",
    "remove:all-node-modules": "node ./tools/utils/remove-all-node-modules.js",  // script to execute remove all node modules
    "reset": "lerna run reset && npm run remove:all-node-modules",
    "prereset": "npm run clean",
    "sonar": "lcov-result-merger reports/coverage/**/lcov.info reports/coverage/lcov.info && sonar-scanner", // script run sonar and report
    "make-artemis-reports": "ts-node --project=tools/tsconfig.tools.json ./tools/scripts/junit-report-converter.ts"
  },
  ```
<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@secureworks-homeassignment/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
