# Personal portfolio and blog

Made with

- [NodeJS][4]
- [Hapi][3]

## Development

- `yarn dev`

  - watches and runs server
  - watches and builds css files
  - watches and runs data
  - watches tests

- `yarn e2e dev`

  - runs end-to-end tests in watch mode

- `yarn dry-run` (to check deployment)
  - builds css
  - starts data
  - starts server

## Deployment

- `yarn deploy`
  - runs tests
  - runs e2e tests (needs development server to be running e.g. `yarn dev`)
  - pushes to [Clever cloud][1]
  - pushes to [Github][2]

[Visit][7] or [follow][8]

[1]: https://www.clever-cloud.com/en/
[2]: https://github.com/iampeterbanjo/iampeterbanjo.com
[3]: https://hapijs.com
[4]: https://node.green/
[7]: https://iampeterbanjo.com
[8]: https://twitter.com/dayosuperstar
