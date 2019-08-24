# 6. monorepo-dependencies

Date: 2019-08-24

## Status

2019-08-24 proposed

## Context

I'm trying to make changes to this monorepo but I keep encountering dependency problems. Ideally the root package.json contains the devDependencies allow the `packages/` folder's package.json to contain the dependecies. This works reasonably well with yarn, lerna or pnpm. Using just npm I see errors like:

```shell
> site@1.0.0 lint /home/iampeterbanjo/clever-cloud/iampeterbanjo.com
> npx eslint "**/*.{ts,js}" --fix

Cannot read config file: /home/iampeterbanjo/clever-cloud/iampeterbanjo.com/node_modules/@typescript-eslint/eslint-plugin/dist/index.js
Error: Cannot find module 'typescript'
Referenced from: /home/iampeterbanjo/clever-cloud/iampeterbanjo.com/packages/server/.eslintrc.json
```

Where should Typescript be installed? If it's at the root folder how will the sub-packages get to use those dependencies without linking or hoisting? If every package contains all it's dependencies then the root folder should only contain scripts.

In addition Typescript doesn't really support monorepo's. [See cyclejs monorepo][cycle-js]. You can only extend from a base config.

## Decision

All packages should contain all their dependencies. The root package.json contains only convenience scripts or base configs.

## Consequences

- Installation times could get longer
- More node_modules means more disk space used
- Simpler dependency structure

[cycle-js]: https://github.com/cyclejs/cyclejs
