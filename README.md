# Personal portfolio and blog

Made with

- [NodeJS][4]
- [Hapi][3]

## Development

- `npm run dev`

  - install dependencies
  - watches and builds css files
  - watches and runs server

- `npm run watch-server-test`

  - watches server tests

- `npm run dry-run` (to check deployment)
  - builds css
  - starts data
  - starts server

## Deployment

- `npm run deploy`
  - runs tests
  - runs e2e tests (needs development server to be running e.g. `yarn dev`)
  - pushes to [Clever cloud][1]
  - pushes to [Github][2]

## Docker

- `make build && make run` to start build and run docker image
- `make help` for more options

[Visit][7] or [follow][8]

[1]: https://www.clever-cloud.com/en/
[2]: https://github.com/iampeterbanjo/iampeterbanjo.com
[3]: https://hapijs.com
[4]: https://node.green/
[7]: https://iampeterbanjo.com
[8]: https://twitter.com/dayosuperstar
