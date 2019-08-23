# 4. yarn-npm-pnpm-and-docker

Date: 2019-08-23

## Status

2019-08-23 done

## Context

I started off using `yarn` workspaces because it was convenient for running scripts inside packages using `--cwd`. But it has no `audit fix` and deployments started failing because of missing packages.

```shell
2019-08-09T07:25:06+01:00 code: 'MODULE_NOT_FOUND',
2019-08-09T07:25:06+01:00 at Module.require (internal/modules/cjs/loader.js:683:19) {
2019-08-09T07:25:06+01:00 at Module.load (internal/modules/cjs/loader.js:643:32)
```

I tried [changing node engines][node-issue] which failed. I switched to pnpm because it had a reputation for solving dependency issues but I ran into problems with the way Hapi and it's dependencies get [dynamically imported][hapi-issue].

In order to use `pnpm` I had to use Docker deployments because clever-cloud only support `npm` and `yarn` package managers. I could not get `pnpm` to work with Docker but `npm` worked fine. I decided to keep Docker for learning and portablity purposes.

## Decision

In the context of deployments failing because of missing packages. And facing the concern of wanting to have this project's dependencies reliable installed in production, I've gone back to using `npm` as the default package manager. I accept that I will have to write more scripts to maintain the monorepo structure. Docker is no longer necessary but is convenient for portability and learning.

## Consequences

- More npm scripts to manage packages.
- Docker maintenance even though Docker is not strictly needed but the burden seems light for now.
- `npm audit fix` works.

[node-issue]: https://github.com/nodejs/help/issues/1846
[hapi-issue]: https://github.com/pnpm/pnpm/issues/1963
