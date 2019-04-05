# Personal portfolio and blog

Made with

- [Hapi][3]
- [Gatsby][4]
- [React][5]

## Development

- `yarn dev`
  - runs Gatbsy server in developer mode
  - watches and builds css files (imported into Gatsby)
  - watches tests
  - watches [lighthouse-ci][6]

- `yarn e2e dev`
  - runs end-to-end tests in watch mode

- `yarn dry-run` (to check deployment)
  - builds blog, css
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
[4]: https://www.gatsbyjs.org/
[5]: https://reactjs.org
[6]: https://www.npmjs.com/package/lighthouse-ci
[7]: https://iampeterbanjo.com
[8]: https://twitter.com/dayosuperstar
