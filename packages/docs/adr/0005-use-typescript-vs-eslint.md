# 5. use-typescript-vs-eslint

Date: 2019-08-23

## Status

2019-08-23 proposed

## Context

Today I was trying to configure eslint to allow me to use "use strict". This project uses CommonJS modules which are not strict by default. I have several `.eslintrc.json` files in package folders which [behave correctly][eslint-folders] but I'm struggling to override the airbnb config in `./packages/server` to allow strict mode. If I used Typescript I would not need "use strict" mode (because it would be added by the compiler) and I could easily compose my `tsconfig` and `tslint` setup in the monorepo. I have tried using `@hapi/eslint-config-hapi` eslint settings but I'm not comfortable with that coding style. Creating my own custom eslint settings is one alternative.

### Pros

- Type checking
- Compile to target
- Sane configuration using base config and overriding in packages
- Compiler takes care of linting
- Works really well with VS code
- Contemporary
- I have some types as js docs
- Works with [Cypress][cypress-ts]
- [ts-eslint][ts-eslint] combines best of both worlds

### Cons

- Yet another thing to maintain - versions, types, compatibilty
- Not sure I need types everywhere
- Cannot be gradually adopted - in reality mixing js/ts doesn't work out well
- Code must be compiled or run with [`ts-node`][ts-node]
- Seperate commands to copy files into build folder

## Decision

In the context of

## Consequences

Consequences here...

[eslint-folders]: https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
[ts-node]: https://www.npmjs.com/package/ts-node
[cypress-ts]: https://basarat.gitbooks.io/typescript/docs/testing/cypress.html
[ts-eslint]: https://github.com/typescript-eslint/typescript-eslint
